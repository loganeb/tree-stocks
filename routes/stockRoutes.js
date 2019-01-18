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
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${SYMBOLS.join(',')}&types=quote`)
        .then((iexRes) => { 
            let tickerData = [];
            Object.keys(iexRes.data).forEach(symbol => {
                tickerData.push({ 
                    symbol: symbol, 
                    price: iexRes.data[symbol].quote.latestPrice, 
                    change: iexRes.data[symbol].quote.changePercent
                });
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

router.get('/symbols/full', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/ref-data/symbols`)
        .then( iexRes => {
            res.status(200).send(iexRes.data);
        })
        .catch( err => {
            console.log(err);
            res.status(400).send('Symbols could not be retrieved.');
        })
})

router.get('/news', (req, res) => {
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${SYMBOLS.join(',')}&types=news`)
        .then((iexRes) => {
            let stories = [];
            Object.keys(iexRes.data).forEach(symbol => {
                stories.push(...iexRes.data[symbol].news);
            });

            res.status(200).send(stories);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('News could not be retrieved');
        })
})

module.exports = router;