-- Create the database
CREATE DATABASE IF NOT EXISTS bus_booking;
USE bus_booking;

-- Create bookings table
-- This table stores all booking records.
-- Each record is specific to a route, a date, and a seat number.
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    seat_number INT NOT NULL,
    booking_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Unique constraint ensures no two people can book the same seat on the same route/date
    UNIQUE KEY unique_seat (route_name, booking_date, seat_number)
);
