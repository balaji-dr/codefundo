const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ResourceSchema = new Schema({
//     resCategory:{
//         type: String,
//         required: [true,'Category is required']
//     },
//     resType: {
//         type: String,
//         required: [true,'Resource Type is required']
//     },
//     qty: {
//         type: Number,
//         required: [true,'Quantity is required']
//     }
// });

const HelperSchema = new Schema({
    helperName:{
        type: String,
        required: [true,'Name is required']
    },
    location: {
        type: String,
        required: [true,'Location is required']
    },
    contact: {
        type: String,
        required: [true,'Contact is required']
    },
    //resource: [ResourceSchema],
    email: {
        type: String
    },
});

const Helper = mongoose.model('helper',HelperSchema);

module.exports = Helper;