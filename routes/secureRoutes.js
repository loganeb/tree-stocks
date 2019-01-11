const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
    res.json({
        auth: true,
        username: req.username,
        _id: req._id
    });
});

router.get('/user/profile', (req, res, next) => {
    res.json({
        auth: true,
        username: req.username,
        _id: req._id 
    })
});

router.post('/user/update', (req, res, next) => {
    res.send(`Update to ${req.username}'s profile successful.`)
});

module.exports = router;