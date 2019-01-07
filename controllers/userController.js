const User = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {

    createUser(req, res){
        User.create(req.body, (err, user) => {
            if(err){
                console.log(err);
                res.status(400).send('Error creating user.')
            }
            res.status(201).send(user._id);
        })
    },

    findUserById(id, res){

        User.findOne({_id: id}, (err, user) => {
            if(err){
                 res.status(404).send(err);
            }
            res.status(201).send(user.username);
        });
    }

}