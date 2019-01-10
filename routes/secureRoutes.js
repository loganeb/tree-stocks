const express = require('express');
const router = express.Router();

router.get('/profile', (req, res, next) => {
    res.send('You are authenticated.');
});

router.post('/user/update', (req, res, next) => {
    res.send(`Update to ${req.username}'s profile successful.`)
});

module.exports = router;