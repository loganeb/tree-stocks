const express = require('express');
const router = express.Router();

router.get('/profile', (req, res, next) => {
    res.send('You are authenticated.');
});

module.exports = router;