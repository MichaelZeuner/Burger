const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201);
})

app.get('/api/posts', (req, res, next) => {
    const posts = [{
        id: 1,
        name: 'nameOne',
        content: 'hi content'
    }, {
        id: 2,
        name: 'nameTwo',
        content: 'hi content more data'
    }]
    res.status(200).json(posts);
});

module.exports = app;