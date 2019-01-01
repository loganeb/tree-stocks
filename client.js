const axios = require('axios');

function getPrice(symbol){
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/price`)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            return err;
        })
}

function getChart(symbol){
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`)
        .then((res) =>{
            return res.data;
        })
        .catch((err) => {
            return err;
        })
}

getPrice('AMZN');