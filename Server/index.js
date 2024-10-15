const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const compression = require('compression');
const cors = require('cors');
const connectDb = require('./config/db');
const Router = require('./Router/Routes');

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
connectDb()
// Example Route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api/v1',Router)

// Handle unhandled routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
