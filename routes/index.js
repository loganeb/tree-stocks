const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const SYMBOLS = require('../symbols');
const UserController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).send('API Running!');
});

router.get('/stock/price/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/price`)
        .then((iexRes) => {
            res.status(200).send(`${req.params.symbol} Price: ${iexRes.data}`);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Price could not be retrieved');
        })
});

router.get('/stock/chart/1d/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/1d`)
        .then((iexRes) => {
            console.log(iexRes.data.length);
            res.status(200).send(iexRes.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Chart could not be retrieved');
        });
})

router.get('/stock/chart/1m/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/1m`)
        .then((iexRes) => {
            console.log(iexRes.data.length);
            res.status(200).send(iexRes.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Chart could not be retrieved');
        });
})

router.get('/stock/chart/1y/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/1y`)
        .then((iexRes) => {
            console.log(iexRes.data.length);
            res.status(200).send(iexRes.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Chart could not be retrieved');
        });
})

router.get('/stock/symbols', (req, res) => {
    res.status(200).send(SYMBOLS);
});

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
            return res.json({ user, token});
        });
    })(req, res);
});

module.exports = router;

