// Thought + Reaction

const { Schema, model } = require('mongoose');

// Reaction
const reactionSchema = new Schema({
    body: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

// Thought
const thoughtSchema = new Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        timestamps: true,
        id: false
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;