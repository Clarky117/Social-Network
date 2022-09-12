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

// virtual
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

// seed thoughts and reactions here?
// Thought.create([
//     {
//         text: 'this is my first thought',
//         username: 'Clarky',
//         reactions: [
//             {
//                 body: 'woah dude',
//                 username: 'Faker'
//             }
//         ]
//     },
//     {
//         text: 'i need to figure out how to seed my data better',
//         username: 'Faker',
//         reactions: [
//             {
//                 body: 'me tooo',
//                 username: 'Clarky'
//             },
//             {
//                 body: 'thanks man',
//                 username: 'Faker'
//             }
//         ]
//     }
// ])

module.exports = Thought;