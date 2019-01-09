const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/signup', (req, res) => UserController.createUser(req, res));

router.post('/login', (req, res, next) => {
    console.log('Login request received.');
    passport.authenticate('login', {session: false}, (err, user, info) => {
        if(err || !user){
            return res.status(400).json({
                message: info ? info.message: 'Login failed',
                user: user
            });
        }

        req.login(user, {session: false}, (err) => {
            if(err){
                return res.json({ sucess: false, message: 'Authentication failed.'});
            }

            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            res.cookie(config.jwtName, token, {
                httpOnly: true
            });
            res.send({success: true, token});
        });
    })(req, res);
});

router.get('/logout', (req, res, next) => {
    res.cookie(config.jwtName, '', {maxAge: new Date(0)}).send('Logout successful.');
    if(next){
        next();
    }
});

module.exports = router;