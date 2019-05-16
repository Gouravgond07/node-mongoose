const router = require('express').Router();
const User = require('../Models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


router.post('/signup', (req,res,next) => {
    const {name,password,contact_number,address} = req.body;
    if(!name || !password || !contact_number || !address){
        res.status(500).json({msg: 'All Parameter Is Not In Data '})
        return;
    }
        
    const {street_address,city,state} = address;

    if(!street_address || !city || !state){
        res.status(500).json({msg: 'Address Is Not Correct'});
        return;
    }
    console.log('here');

    

    bcrypt.hash(password,10).then(hassedPassword => {
        console.log(hassedPassword)
        const user = new User({_id : mongoose.Types.ObjectId(), name : name, password : hassedPassword, contact_number : contact_number, address : address });
        return user.save()
    }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
        console.log(err);
    })

    
    // const user = new User({_id : mongoose.Types.ObjectId(), name : name, password : password, contact_number : contact_number, address : address });
    // user.save().then(result => {
    //     res.status(200).json(result);
    // }).catch(err => {
    //     res.status(400).json(err);
    // })
});

router.post('/login', (req,res,next) => {
    const { name, password} =  req.body;
    if(!name || !password){
        return res.status(500).json({msg:'name or password not found'});
    }
    User.findOne({name: name}).then(user => {
        if(!user) {
            return res.status(402).send({msg: 'User not exist'});
           
        }
        const userHashedPassword = user.password;
        return bcrypt.compare(password,userHashedPassword)
    }).then(hashResult => {
        if(!hashResult)
            return res.status(500).json({msg:'name or password not found'});
        res.status(200).json({msg:'User Validate Successfully'})
    }).catch(err => {
        console.log('err')
        res.status(400).json(err);
    })
})


module.exports = router