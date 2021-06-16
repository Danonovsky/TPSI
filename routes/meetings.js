var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Meeting = require('../models/meeting');

var url = "mongodb://localhost:27017/mydb";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

//done
router.get('/getAll/:date/:id', async function (req, res) {
    try {
        let { date, id } = req.params;
        let str = date[6]+date[7]+date[8]+date[9]+'-'+date[3]+date[4]+'-'+date[0]+date[1];
        let gte = new Date(str);
        let lte = new Date(str);
        lte.setDate(lte.getDate() + 1);
        var query = {userId: id, date: { $gte: gte, $lt: lte}};
        

        Meeting.find(query).populate('personId').exec((err, result) => {
            if(err) throw err;
            else {
                let newArr = [];
                result.forEach((e) => {
                    newArr.push({
                        id: e._id, 
                        userId: e.userId, 
                        person: {
                            id: e.personId._id,
                            userId: e.personId.userId,
                            name: e.personId.name
                        },
                        title: e.title,
                        description: e.description,
                        isDone: e.isDone,
                        date: e.date
                    });
                });
                res.status(200).send({data: newArr});
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ status: 0, error: error });
    }
});
//done
router.get('/getOne/:id', async function (req, res) {
    try {
        let { id } = req.params;
        Meeting.findOne({_id: id}).populate('personId').exec((err, result) => {
            if(err) throw err;
            let meeting = {
                id: result._id, 
                userId: result.userId, 
                person: {
                    id: result.personId._id,
                    userId: result.personId.userId,
                    name: result.personId.name
                },
                title: result.title,
                description: result.description,
                isDone: result.isDone,
                date: result.date
            };
            res.status(200).send({status: 1, data: meeting});
        });
    } catch (error) {
        res.send({status: 0, error: error });
    }
});
//done
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
//done
router.post('/edit', async function (req, res) {
    try {
        let set = {
            personId: req.body.person.id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        };
        Meeting.findOneAndUpdate({_id:req.body.id},{$set:set}, (err) => {
            if(err) throw err;
        });
    } catch (error) {
        res.status(500).send({status: 0, error: error});
    }
});
router.post('/switch', async function (req, res) {
    try {
        let set = {
            isDone: !req.body.isDone
        };
        Meeting.findOneAndUpdate({_id:req.body.id},{$set:set}, (err) => {
            if(err) throw err;
        });
    } catch (error) {
        res.status(500).send({status: 0, error: error});
    }
});
//done
router.post('/delete', async function (req, res) {
    try {
        Meeting.findOneAndDelete({_id:req.body.id}, (err) => {
            if(err) throw err;
        });
    } catch (error) {
        res.status(500).send({status: 0, error: error});
    }
});
module.exports = router;