const mongoose = require('mongoose');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')

const UserRoute = require('./Routes/user');
const mongooseConnection = mongoose.connect('mongodb://localhost/users', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true)
// parse application/json
app.use(bodyParser.json())
app.use('/user', UserRoute);

// app.get('/',(req,res,next) => {
//     User.find().then(result => {
//         res.status(200).json({
//             result : result
//         })
//     }).catch(err => console.log(err));
// })

// app.get('/:user',(req,res,next) => {
//     const  user = new User({name:req.params.user});
//     user.save().then(result => {
//         res.status(200).json({
//             result : result
//         })
//     }).catch(err => console.log(err));
// })
mongooseConnection.then(conn => {
    app.listen(3000)
    console.log('Server Started on 3000');
   
}).catch(err => {
    console.log(err)
})

