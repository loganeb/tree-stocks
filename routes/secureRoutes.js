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

router.post('/user/watchlist/add', UserController.addToWatchlist);

router.post('/user/update', (req, res, next) => {
    res.send(`Update to ${req.username}'s profile successful.`)
});

router.post('/user/watchlist/update', UserController.updateWatchlist);

module.exports = router;