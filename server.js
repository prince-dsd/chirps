const express = require('express')
const path = require('path');
const dotenv = require('dotenv')
const cors = require('cors');

const Twitter = require('twitter-lite');

const config = require('config');
const CONSUMER_KEY = config.get('CONSUMER_KEY');
const CONSUMER_SECRET = config.get('CONSUMER_SECRET');
const ACCESS_TOKEN_KEY = config.get('ACCESS_TOKEN_KEY');
const ACCESS_TOKEN_SECRET = config.get('ACCESS_TOKEN_SECRET');


const app = express()
dotenv.config();

app.use(cors())

const client = new Twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "1.1", // version "1.1" is the default (change for other subdomains)
    consumer_key: CONSUMER_KEY, // from Twitter.
    consumer_secret: CONSUMER_SECRET, // from Twitter.
    access_token_key: ACCESS_TOKEN_KEY, // from your User (oauth_token)
    access_token_secret: ACCESS_TOKEN_SECRET // from your User (oauth_token_secret)
});





app.get("/:user", (req, res) => {
    console.log(req.params.user)
    client.get("/users/search", { q: req.params.user, count: 5 })
        .then(results => {
            console.log(results)
            // res.json({ results: results })

            const userObject = results.map(user => ({ name: user.name, id: user.id_str, screen_name: user.screen_name }));
            res.json({ results: userObject })


        })
        .catch(err => console.log(err))


})

app.get("/tweets/:id_str", (req, res) => {
    client.get("statuses/user_timeline", { user_id: req.params.id_str, count: 30 })
        .then(results => {
            console.log(results)
            res.json(results)
        })
        .catch(err => console.log(err))
})

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));