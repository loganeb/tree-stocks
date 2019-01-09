const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config');
const routes = require('./routes/index');
const secureRoutes = require('./routes/secureRoutes');

require('./auth/auth');

const PORT = process.env.PORT || 8080;
const app = Express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('tiny'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

mongoose.connect(config.dbUri, {useNewUrlParser: true})
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(err));

app.use('/api', routes);
app.use('/user', passport.authenticate('jwt', { session: false}), secureRoutes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});