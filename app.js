const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const config = require('./config');
const routes = require('./routes/index');

//Authentication configuration
require('./auth/auth');

const PORT = process.env.PORT || 8080;
const app = Express();

const apiLimiter = rateLimit({
    windowMs: 60*1000,
    max: 100, //API requests blocked after 100 per minute
    message: 'Too many requests. Try again later.'
})
const userLimiter = rateLimit({
    windowMs: 60*1000,
    max: 5,  //User route requests blocked after 5 per minute
    message: 'Too many requests. Try again later.'
});

//Middleware
app.use('/', apiLimiter);
app.use('/api/user', userLimiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('tiny'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers, Authorization, X-requested-with, X-Application, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-type", "application/json");
    next();
  });

//DB connection
mongoose.connect(config.dbUri, { useNewUrlParser: true })
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));

//Route handling
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});