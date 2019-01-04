const express = require('express');
const router = express.Router();
const axios = require('axios');
const SYMBOLS = require('../symbols');

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
})

router.post('/login/:username', (req, res) => {
    res.status(201).send(`${req.params.username} signed in!`);
});

module.exports = router;

