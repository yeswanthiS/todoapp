const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


