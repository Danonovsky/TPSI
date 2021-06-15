var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

router.get('/getAll/:id', async function (req, res) {
    try {
        let { id } = req.params;
        MongoClient.connect(url, function(err, db) {
            if(err) throw err;
            var dbo = db.db("mydb");
            var query = {userId: id};
            dbo.collection("people").find(query).toArray(function(err, result) {
                if(err) throw err;
                else {
                    //result.map(o => { return {id: o._id, userId: o.userId, name: o.name}; });
                    newArr = [];
                    result.forEach((e) => {
                        newArr.push({id: e._id, userId: e.userId, name: e.name});
                    });
                    console.log(newArr);
                    res.send({data: newArr});
                    //res.send({data: result.map(o => {id: o._id; userId: o.userId; name: o.name })});
                }
            });
            db.close();
        });
    } catch (error) {
        console.log(error);
        res.send({ status: 0, error: error });
    }
});
router.post('/add', async function (req, res) {
    try {
        let { userId, name } = req.body;
        MongoClient.connect(url, function(err, db) {
            var dbo = db.db("mydb");
            var obj={userId: userId,name: name};
            dbo.collection("people").insertOne(obj, function(err,result) {
                if(err) throw err;
                else {
                    console.log("1 person inserted");
                    res.send({status: 1, data: result});
                }
            });
            db.close();
        });
        
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});
module.exports = router;