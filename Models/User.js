const mongoose = require('mongoose');
const Schema = mongoose.SchemaTypes;
// const ObjectId = Schema.ObjectId;

const User = new mongoose.Schema({
    name : String
})

module.exports = mongoose.model('user',User)