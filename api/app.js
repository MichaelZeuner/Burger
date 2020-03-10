const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://Michael:hpiBVWPseKt9bS7t@cluster0-z2mu5.mongodb.net/test?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed...')
    })

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        name: req.body.name,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(200).json(createdPost);
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json(documents);
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    console.log(req.params);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: 'Post deleted!' });
    });
});

module.exports = app;