// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


const router = require('express').Router();

// user end points

// get all users
router.get('/users', (req, res) => {
    User.find({})
    .populate('thoughts')
    .populate('friends')
    .then((users) => {
        res.json(users);
    })
    .catch((err) => {
        res.status(400);
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
        res.status(400);
        console.log(err);
    })
});

// create a user
router.post('/users', (req, res) => {
    User.create(req.body)
    .then((newUser) => {
        res.json(newUser);
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// update user by _id
router.put('/users/:userID', (req, res) => {
    User.findOneAndUpdate({_id: req.params.userID},
    req.body,
    { new: true, runValidators: true })
    .then((updatedUser) => {
        if(!updatedUser) {
            res.status(404).json({
                message: 'No user matches this id!'
            });
            return;
        }
        res.json(updatedUser)
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// delete by user _id
router.delete('/users/:userID', (req, res) => {
    User.findOneAndDelete({_id: req.params.userID})
    .then((deletedUser) => {
        res.json(deletedUser);
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// user/friends endpoints

// add a new friend by id - post /api/users/:userID/friends/:friendID
router.post('/users/:userID/friends/:friendID', (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.userID },
        { $push: {friends: req.params.friendID} },
        { new: true }
    )
    .then((updatedFriends) => {
        if(!updatedFriends) {
            res.status(404).json({
                message: 'No user matches this id!'
            });
            return;
        }
        res.json(updatedFriends)
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// delete
router.delete('/users/:userID/friends/:friendID', (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.userID },
        { $pull: {friends: req.params.friendID} },
        { new: true }
    )
    .then((deletedFriends) => {
        if(!deletedFriends) {
            res.status(404).json({
                message: 'No user matches this id!'
            });
            return;
        }
        res.json(deletedFriends)
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// thoughts end points

// get all thoughts
router.get('/thoughts', (req, res) => {
    Thought.find({})
    .populate('reactions')
    .sort({ _id: -1 })
    .then((thoughts) => {
        res.json(thoughts);
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// get thought by _id
router.get('/thoughts/:thoughtID', (req, res) => {
    Thought.findOne({_id: req.params.thoughtID})
    .populate('reactions')
    .sort({ _id: -1 })
    .then((thought) => {
        if(!thought) {
            res.status(404).json({
                message: 'No thought matches this id!'
            });
            return;
        }
        res.json(thought)
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// create new thought
router.post('/thoughts', (req, res) => {
    Thought.create(req.body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        )
    })
    .then((newThought) => {
        if(!newThought) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(newThought);
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// update thought by _id
router.put('/thoughts/:thoughtID', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        req.body,
        { new: true, runValidators: true }
    )
    .then((updatedThought) => {
        if(!updatedThought) {
            res.status(404).json({ message: 'No thoughts found with that id' });
            return;
        }
        res.json(updatedThought);
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
});

// delete thought
router.delete('/thoughts/:thoughtID', (req, res) => {
    Thought.findOneAndDelete(
        { _id: req.params.thoughtID }
    )
    .then((deletedThought) => {
        if(!deletedThought) {
            res.status(404).json({ message: 'No thoughts found with that id' });
            return;
        }
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: req.params.thoughtID} },
            { new: true }
        )
    })
    .then((dbThought) => {
        if(!dbThought) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
        }
        res.json(dbThought)
    })
    .catch((err) => {
        res.status(400);
        console.log(err);
    })
})


module.exports = router;