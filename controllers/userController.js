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

    findUserById(req, res){
        let _id = req.body._id;

        User.findOne({_id: _id}, (err, user) => {
            if(err){
                 res.status(404).send(err);
            }
            else res.status(201).send(user.username);
        });
    },

    async addToUserPortfolio(req, res){
        let symbols = req.body.symbols;
        let query = {_id: req._id};
        let update = {$push: {'portfolio': {$each: symbols}}};
        User.findOneAndUpdate(query, update, { new: true }, async (err, user) => {
            if(err){
                let error = new Error('User not found.')
                res.status(400).send(error);
            }else{
                const portfolio = user.portfolio;
                res.status(201).send(portfolio);
            }
        })
    }

}