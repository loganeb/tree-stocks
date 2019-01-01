const Express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const PORT = process.env.PORT || 8080;

const app = Express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});