const Express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const logger = require('morgan');
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = Express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('tiny'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});