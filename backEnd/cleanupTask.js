const cron = require('node-cron');
const db = require('./db/dbConnection');

const cleanupOldBookings = () => {
    // Run every day at 12:00 AM
    cron.schedule('0 0 * * *', async () => {
        console.log('Deleting old bookings...');

        try {
            const [result] = await db.execute(`
                DELETE FROM bookings
                WHERE booking_date < CURDATE()
            `);

            console.log(`${result.affectedRows} old bookings deleted.`);
        } catch (error) {
            console.error('Cleanup error:', error);
        }
    });
};

module.exports = cleanupOldBookings;