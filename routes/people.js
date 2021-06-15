var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Person = require('../models/person');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/getAll/:id', async function (req, res) {
    try {
        let { id } = req.params;
        var query = {userId: id};

        Person.find(query,(err, result) => {
            if(err) throw err;
            else {
                newArr = [];
                result.forEach((e) => {
                    newArr.push({id: e._id, userId: e.userId, name: e.name});
                });
                res.status(200).send({data: newArr});
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ status: 0, error: error });
    }
});
router.get('/getOne/:id', async function (req, res) {
    try {
        let { id } = req.params;
        Person.findOne({_id: id}, (err, result) => {
            if(err) throw err;
            res.status(200).send({data: result});
        });
    } catch (error) {
        res.send({status: 0, error: error });
    }
});
router.post('/add', async function (req, res) {
    try {
        let { userId, name } = req.body;
        const person = new Person ({
            userId: userId,
            name: name
        });
        person.save(err => {
            if(err)  res.send({status: 0, error: err});
            res.send({status:1, data: person});
        });
        
    } catch (error) {
        res.send({ status: 0, error: error });
    }
});
router.post('/edit', async function (req, res) {
    try {
        console.log('Edit: ',req.body);
        Person.findOneAndUpdate({_id:req.body.id},{$set:{name:req.body.name}}, (err) => {
            if(err) throw err;
        })
    } catch (error) {
        res.status(500).send({status: 0, error: error});
    }
});
router.post('/delete', async function (req, res) {
    try {
        console.log(req.body);
        Person.findOneAndDelete({_id:req.body.id}, (err) => {
            if(err) throw err;
        });
    } catch (error) {
        res.status(500).send({status: 0, error: error});
    }
});
module.exports = router;