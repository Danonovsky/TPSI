const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String
});

const Person = mongoose.model('Person', personSchema);
module.exports=Person;