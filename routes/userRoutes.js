const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/signup', (req, res) => UserController.createUser(req, res));

router.post('/login', (req, res, next) => {
    passport.authenticate('login', {session: false}, (err, user, info) => {
        if(err || !user){
            return res.status(400).json({
                success: false
            });
        }

        req.login(user, {session: false}, (err) => {
            if(err){
                return res.json({ success: false, message: 'Authentication failed.'});
            }

            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            res.cookie(config.jwtName, token, {
                httpOnly: true
            });
            res.send({success: true});
        });
    })(req, res);
});

router.get('/logout', (req, res, next) => {
    res.cookie(config.jwtName, '', {maxAge: new Date(0)}).send('Logout successful.');
    if(next){
        next();
    }
});

router.get('/watchlist', (req, res) => {
    let token = jwt.verify(req.cookies[config.jwtName], process.env.TOKEN_SECRET);
    req._id = token._id;
    UserController.getWatchlist(req, res);
})

router.post('/watchlist/add', (req, res) => {
    let token = jwt.verify(req.cookies[config.jwtName], process.env.TOKEN_SECRET);
    req._id = token._id;
    UserController.addToWatchlist(req, res);
});

router.post('/watchlist/update', (req, res) => {
    let token = jwt.verify(req.cookies[config.jwtName], process.env.TOKEN_SECRET);
    req._id = token._id;
    UserController.updateWatchlist(req, res);
});

module.exports = router;