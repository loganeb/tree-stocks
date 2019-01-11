const express = require('express');
const router = express.Router();
const axios = require('axios');
const SYMBOLS = require('../symbols');

router.get('/price/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/price`)
        .then((iexRes) => {
            console.log(iexRes.data);
            res.status(200).send(`${iexRes.data}`);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Price could not be retrieved');
        })
});

router.get('/chart/1d/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/1d`)
        .then((iexRes) => {
            res.status(200).send(iexRes.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Chart could not be retrieved');
        });
})

router.get('/chart/1m/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/1m`)
        .then((iexRes) => {
            res.status(200).send(iexRes.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Chart could not be retrieved');
        });
})

router.get('/chart/1y/:symbol', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/${req.params.symbol}/chart/1y`)
        .then((iexRes) => {
            res.status(200).send(iexRes.data);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Chart could not be retrieved');
        });
})

router.get('/ticker', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${SYMBOLS.join(',')}&types=price`)
        .then((iexRes) => { 
            let tickerData = [];
            Object.keys(iexRes.data).forEach(symbol => {
                tickerData.push({ symbol: symbol, price: iexRes.data[symbol].price});
            });

            res.status(200).send(tickerData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Ticker data could not be retrieved');
        });
})

router.get('/symbols', (req, res) => {
    res.status(200).send(SYMBOLS);
});

module.exports = router;