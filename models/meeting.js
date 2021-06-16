//require('person');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    title: String,
    description: String,
    isDone: Boolean,
    date: Date
});

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports=Meeting;