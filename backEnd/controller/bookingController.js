const db = require('../db/dbConnection');

// Confirm a booking
exports.confirmBooking = async (req, res) => {
    const { route_name, user_name, seat_number, booking_date } = req.body;
    const MAX_SEATS = 54;

    if (!route_name || !user_name || !seat_number || !booking_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 1. Check if the seat is already booked
        const [existing] = await db.execute(
            'SELECT id FROM bookings WHERE route_name = ? AND booking_date = ? AND seat_number = ?',
            [route_name, booking_date, seat_number]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'This seat is already booked for this date.' });
        }

        // 2. Check total bookings for the route/date
        const [totalBookings] = await db.execute(
            'SELECT COUNT(*) as count FROM bookings WHERE route_name = ? AND booking_date = ?',
            [route_name, booking_date]
        );

        if (totalBookings[0].count >= MAX_SEATS) {
            return res.status(400).json({ error: 'No more seats available for this route and date.' });
        }

        // 3. Insert booking
        const [result] = await db.execute(
            'INSERT INTO bookings (route_name, user_name, seat_number, booking_date) VALUES (?, ?, ?, ?)',
            [route_name, user_name, seat_number, booking_date]
        );

        res.status(201).json({
            message: 'Booking confirmed successfully',
            bookingId: result.insertId
        });
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ error: 'Failed to confirm booking' });
    }
};

// Get Dashboard data (Available/Booked Seats) per route and date
exports.getDashboardData = async (req, res) => {
    const { route_name, booking_date } = req.query;
    const MAX_SEATS = 54;

    if (!route_name || !booking_date) {
        return res.status(400).json({ error: 'route_name and booking_date are required' });
    }

    try {
        // Get booked seat numbers and count
        const [rows] = await db.execute(
            'SELECT seat_number FROM bookings WHERE route_name = ? AND booking_date = ?',
            [route_name, booking_date]
        );

        const bookedSeats = rows.map(r => r.seat_number);
        const bookedCount = bookedSeats.length;
        const availableCount = MAX_SEATS - bookedCount;

        res.json({
            total_seats: MAX_SEATS,
            booked_seats: bookedCount,
            available_seats: availableCount,
            booked_seat_numbers: bookedSeats
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
};
