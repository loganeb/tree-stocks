const User = require('../models/User');

module.exports = {

    createUser(req, res){
        User.create(req.body, (err, user) => {
            if(err){
                console.log(err);
                res.status(400).send('Error creating user.')
            }
            else{
                res.status(201).send(user.username);
            }
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