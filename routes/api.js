const { User } = require('../models');

const router = require('express').Router();

// User end points

router.get('/users', (req,res) => {
    User.find({})
    .populate('thoughts')
    .populate('friends')
    .then((users) => {
        res.json(users);
    })
});





module.exports = router;