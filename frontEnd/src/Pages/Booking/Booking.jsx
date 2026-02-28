import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./booking.css";

const Booking = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const ticketRef = useRef(); // 👈 add this

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

    // 👇 PDF download function
    const handleDownloadPDF = async () => {
        const canvas = await html2canvas(ticketRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Booking_${bookingDetails.bookingId}.pdf`);
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
                    <p className="warning">All sales are final — no refunds will be issued.</p>

                </div>
            ) : (
                <div className="booking-card">

                    {/* 👇 wrap ticket area with ref */}
                    <div ref={ticketRef} className="ticket-area">
                        <h3>Booking Confirmed 🎉</h3>
                        <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Seats:</strong> {data.seats.join(", ")}</p>
                        <p><strong>Departure:</strong> {data.departure}</p>
                        <p><strong>Total Paid:</strong> LKR {total}</p>

                        <div className="qr-section">
                            <QRCodeCanvas
                                value={JSON.stringify(bookingDetails)}
                                size={200}
                            />
                        </div>
                    </div>

                    {/* 👇 download button */}
                    <button className="download-btn" onClick={handleDownloadPDF}>
                        Download Ticket as PDF
                    </button>

                    <button className="back-btn" onClick={() => navigate("/")}>
                        Back to Dashboard
                    </button>
                    <p className="warning">📸 Please screenshot this ticket as proof of your booking. This may not be recoverable later.</p>

                </div>
            )}
        </div>
    );
};

export default Booking;