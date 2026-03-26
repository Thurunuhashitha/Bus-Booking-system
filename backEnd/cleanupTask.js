const cron = require('node-cron');
const db = require('./db/dbConnection');

// Schedule a task to run every day at midnight (00:00)
// To clear old bookings where booking_date < current_date
const cleanupOldBookings = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running scheduled cleanup for old bookings...');
        try {
            const today = new Date().toISOString().split('T')[0];
            
            // Delete bookings that have passed
            const [result] = await db.execute(
                'DELETE FROM bookings WHERE booking_date < ?',
                [today]
            );
            
            console.log(`Successfully cleared ${result.affectedRows} old bookings.`);
        } catch (error) {
            console.error('Error during scheduled cleanup:', error);
        }
    });
};

module.exports = cleanupOldBookings;
