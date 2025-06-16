const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routers/movieRoutes');
const categoryRoutes = require('./routers/categoryRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send({
        error: 'Not Found',
        message: 'The requested resource could not be found.'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
    });
});

module.exports = app;
