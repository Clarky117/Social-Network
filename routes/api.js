const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


const router = require('express').Router();

// User end points

// get all users
router.get('/users', (req, res) => {
    User.find({})
    .populate('thoughts')
    .populate('friends')
    .then((users) => {
        res.json(users);
    })
    .catch((err) => {
        res.sendStatus(400);
        console.log(err);
    })
});

// GET a single user by its _id and populated thought and
//  friend data
router.get('/users/:userID', (req, res) => {
    User.findOne({_id: req.params.userID})
    .populate('thoughts')
    .populate('friends')
    .then((user) => {
        if(!user) {
            res.status(404).json({
                message: 'No user matches this id!'
            });
            return;
        }
        res.json(user)
    })
    .catch((err) => {
        res.sendStatus(400);
        console.log(err);
    })
})

// create a user
router.post('/users', (req, res) => {
    User.create(req.body)
    .then(newUser => res.json(newUser))
    .catch((err) => {
        res.sendStatus(400);
        console.log(err);
    })
})

// update user by _id
router.put('/users/:userID', (req, res) => {
    User.findOneAndUpdate({_id: req.params.userID},
    req.body,
    { new: true, runValidators: true })
    .then(updatedUser => {
        if (!updatedUser) {
            res.status(404).json({ 
                message: 'No user matches this id!'
             });
             return;
        }
        res.json(updatedUser);
    })
    .catch((err) => {
        res.sendStatus(400);
        console.log(err);
    })
})

// delete by user _id
router.delete('/users/:userID', (req, res) => {
    User.findOneAndDelete({_id: req.params.userID})
    .then(deletedUser => res.json(deletedUser))
    .catch((err) => {
        res.sendStatus(400);
        console.log(err);
    })
})

module.exports = router;