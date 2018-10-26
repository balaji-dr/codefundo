const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VictimSchema = new Schema({
    probTitle: {
        type: String,
        required: [true,'Title is required']
    },
    probType: {
        type: String,
        //required: [true,'Type is required']
    },
    probDesc:{
        type: String
    },
    victimName:{
        type: String,
        //required: [true,'Name is required']
    },
    status: String,
    emotion: String,
    location: {
        type: String,
        required: [true,'Location is required']
    },
    contact: {
        type: String,
        //required: [true,'Contact is required']
    },
    email: {
        type: String
    }
});

const Victim = mongoose.model('help', VictimSchema);

module.exports = Victim;