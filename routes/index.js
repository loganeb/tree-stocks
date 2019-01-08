const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const stockRoutes = require('./stockRoutes');
const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).send('API Running!');
});

router.use('/stock', stockRoutes );

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
                return res.send(err);
            }

            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            return res.json({ username: user.username, token});
        });
    })(req, res);
});

module.exports = router;

