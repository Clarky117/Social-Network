const connection = require('../config/connection');
const { User, Thought } = require("../models");

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.create([
        { username: 'Clarky', email: 'clarky@fake.com', thoughts: [], friends: [] },
        { username: 'Faker', email: 'faker@fake.com', thoughts: [], friends: [] },
        { username: 'Antics', email: 'antics@fake.com', thoughts: [], friends: [] }
    ]);

    await Thought.create([
        {
            text: 'this is my seeded thought',
            username: 'Clarky',
            reactions: [
                {
                    body: 'does it work?',
                    username: 'Faker'
                }
            ]
        },
        {
            text: 'hope this works!',
            username: 'Faker',
            reactions: [
                {
                    body: 'me tooo',
                    username: 'Clarky'
                },
            ]
        },
        {
            text: 'this is a thought',
            username: 'Clarky',
            reactions: [
                {
                    body: 'woah dude',
                    username: 'Faker'
                }
            ]
        },
        {
            text: 'submit assignment today!',
            username: 'Faker',
            reactions: [
                {
                    body: 'same',
                    username: 'Clarky'
                },
                {
                    body: 'easy man',
                    username: 'Faker'
                }
            ]
        }
    ]);

    process.exit(0);

})
