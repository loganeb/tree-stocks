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
            else res.status(201).send({
                username: user.username, 
                _id: _id, 
                watchlist: user.watchlist
            });
        });

    },

    addToWatchlist(req, res){
        let symbols = req.body.symbols;
        let query = {_id: req._id};
        let update = {$push: {'watchlist': {$each: symbols}}};
        User.findOneAndUpdate(query, update, { new: true }, (err, user) => {
            if(err){
                let error = new Error('Symbols could not be added.')
                res.status(400).send(error);
            }else{
                res.status(201).send({watchlist: user.watchlist});
            }
        })
    },

    updateWatchlist(req, res){
        let symbols = req.body.symbols;
        let query = {_id: req._id};
        let update = {watchlist: symbols};

        User.findOneAndUpdate(query, update, {new: true}, (err, user) => {
            if(err){
                let error = new Error('Watchlist could not be updated.')
                res.status(400).send(error);
            }else{
                res.status(201).send({watchlist: user.watchlist});
            }
        })
    }
    



}