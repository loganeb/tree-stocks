const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/user', (req, res) => {
    res.json({
        auth: true,
        username: req.username,
        _id: req._id
    });
});

router.get('/user/profile', (req, res) => {
    res.json({
        auth: true,
        username: req.username,
        _id: req._id 
    });
});

router.get('/user/watchlist', UserController.getWatchlist);

router.post('/user/watchlist/add', UserController.addToWatchlist);

router.post('/user/watchlist/update', UserController.updateWatchlist);

module.exports = router;