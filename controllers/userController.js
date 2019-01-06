const User = require('../models/User');

module.exports = {

    createUser(req, res){
        User.create(req.body, function(err, newUser){
            if (err) res.status(404).send(err);
            else{
                res.status(201).send(newUser);
            }
        })
    }

}