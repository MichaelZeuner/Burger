const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('Firsst Middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Hellooooooo!');
});

module.exports = app;