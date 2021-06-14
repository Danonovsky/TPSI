var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

router.post('/register', async function (req, res, next) {
    try {
        let { email, password } = req.body;
        const hashed_password = md5(password.toString());
        isUnique = false;
        MongoClient.connect(url, function(err, db) {
            if(err) throw err;
            var dbo = db.db("mydb");
            var query = {email: email};
            dbo.collection("users").find(query).toArray(function(err, result) {
                if(err) throw err;
                if(result.length==0) {
                    console.log("empty");
                    isUnique = true;
                }
                else {
                    console.log(result);
                    console.log("not empty");
                }
            });
            db.close();
        });

        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("mydb");
            var myobj = {email: email, password: hashed_password };
            if(isUnique) {
                dbo.collection("users").insertOne(myobj, function(err, iRes) {
                    if(err) throw err;
                    else {
                        console.log("1 document inserted");
                        let token = jwt.sign({data: iRes}, 'secret');
                        res.send({status: 1, data: iRes, token: token});
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ status: 0, error: error });
    }
});
router.post('/login', async function (req, res, next) {
    try {
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("mydb");
            let { email, password } = req.body;
            const hashed_password = md5(password.toString());
            var query = {email: email, password: hashed_password};
            dbo.collection("users").find(query).toArray(function(err, result) {
                if(err) throw err;
                console.log(result);
                if(result) {
                    let token = jwt.sign({ data: result }, 'secret')
                        res.send({ status: 1, data: result, token: token });
                }
            });
            db.close();
        });
        
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});
module.exports = router;