const express = require('express');
const router = express.Router();
const stockRoutes = require('./stockRoutes');
const userRoutes = require('./userRoutes');
const secureRoutes = require('./secureRoutes');
const passport = require('passport');

router.get('/', (req, res) => {
    res.status(200).send('API Running!');
});

router.use('/stock', stockRoutes);
router.use('/user', userRoutes);
router.use('/secure', passport.authenticate('jwt', { session: false}), secureRoutes);

module.exports = router;

