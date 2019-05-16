const mongoose = require('mongoose');
const Schema = mongoose.SchemaTypes;
// const ObjectId = Schema.ObjectId;

const User = new mongoose.Schema({
    _id : Schema.ObjectId,
    name : {type:String, required:true, unique : true},
    password : {type:String, required:true},
    contact_number : {
        type : Number,
        required: true,
        min: 1000000000,
        max:9999999999
    },
    address : {
        street_address : {type : String, require:true},
        city : {type : String, require:true},
        state : { type : String, require: true}
    }
})

module.exports = mongoose.model('user',User)