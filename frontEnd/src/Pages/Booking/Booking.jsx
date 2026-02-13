import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "./booking.css";

const Booking = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    if (!data) {
        return (
            <div style={{ padding: "50px", textAlign: "center" }}>
                <h2>No Booking Data Found</h2>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        );
    }

    const total = data.seats.length * data.pricePerSeat;

    const bookingId = "KGS" + new Date().getTime();

    const bookingDetails = {
        bookingId,
        name,
        phone,
        ...data,
        total
    };


    const handleConfirm = () => {
        if (!name || !phone) {
            alert("Please enter name and phone number");
            return;
        }
        setConfirmed(true);
    };

    return (
        <div className="booking-container">

            <h1 className="booking-title">Complete Your Booking</h1>

            {!confirmed ? (
                <div className="booking-card">

                    <p><strong>Route:</strong> {data.routes}</p>
                    <p><strong>Departure:</strong> {data.departure}</p>
                    <p><strong>Seats:</strong> {data.seats.join(", ")}</p>
                    <p><strong>Total:</strong> LKR {total}</p>

                    <input
                        type="text"
                        placeholder="Passenger Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input-field"
                    />

                    <button className="confirm-btn" onClick={handleConfirm}>
                        Confirm Booking
                    </button>

                </div>
            ) : (
                <div className="booking-card">

                    <h3>Booking Confirmed 🎉</h3>
                    <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Seats:</strong> {data.seats.join(", ")}</p>
                    <p><strong>Total Paid:</strong> LKR {total}</p>

                    <div className="qr-section">
                        <QRCodeCanvas
                            value={JSON.stringify(bookingDetails)}
                            size={200}
                        />

                    </div>

                    <button className="back-btn" onClick={() => navigate("/")}>
                        Back to Dashboard
                    </button>

                </div>
            )}
        </div>
    );
};

export default Booking;
