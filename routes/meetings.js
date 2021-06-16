var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Meeting = require('../models/meeting');

var url = "mongodb://localhost:27017/mydb";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

//theoretically done
router.get('/getAll/:date/:id', async function (req, res) {
    try {
        let { date, id } = req.params;
        let str = date[6]+date[7]+date[8]+date[9]+'-'+date[3]+date[4]+'-'+date[0]+date[1];
        let gte = new Date(str);
        let lte = new Date(str);
        lte.setDate(lte.getDate() + 1);
        console.log(gte,lte);
        var query = {userId: id, date: { $gte: gte, $lte: lte}};

        Meeting.find(query).populate('personId').exec((err, result) => {
            if(err) throw err;
            else {
                newArr = [];
                result.forEach((e) => {
                    newArr.push(
                        {id: e._id, userId: e.userId, name: e.name}
                        );
                });
                res.status(200).send({data: result});
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
//works
router.post('/add', async function (req, res) {
    try {
        const meeting = new Meeting ({
            userId: req.body.userId,
            personId: req.body.person.id,
            title: req.body.title,
            description: req.body.description,
            isDone: req.body.isDone,
            date: req.body.date
        });
        meeting.save(err => {
            if(err)  res.send({status: 0, error: err});
            res.send({status:1, data: meeting});
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