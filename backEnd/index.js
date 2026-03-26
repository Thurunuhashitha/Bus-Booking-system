const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const cleanupOldBookings = require('./cleanupTask');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Bus Booking Backend is Running!');
});

// Initialize Cron Job
cleanupOldBookings();

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
