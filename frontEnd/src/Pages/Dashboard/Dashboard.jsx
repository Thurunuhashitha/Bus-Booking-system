import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Initialize 54 seats - all available at start
  const [seats, setSeats] = useState(
    Array.from({ length: 54 }, (_, i) => ({
      id: i + 1,
      status: 'available',
    }))
  );

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (seat.status === 'booked') return;

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.id === seat.id
          ? { ...s, status: s.status === 'selected' ? 'available' : 'selected' }
          : s
      )
    );

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const availableCount = seats.filter((s) => s.status === 'available').length;
  const bookedCount = seats.filter((s) => s.status === 'booked').length;
  const selectedCount = selectedSeats.length;

  const navigate = useNavigate();
  const [travelDate, setTravelDate] = useState("");

  // Add state for route selection
  const [route, setRoute] = useState("ampara-trinco"); // default route 
  // Function to book selected seats
  const handleBookSeats = () => {

    if (selectedSeats.length === 0) return;

    if (!travelDate) {
      alert("Please select travel date");
      return;
    }
    // Decide departure based on route
    let selectedDeparture = "05:15 PM";

    if (route === "ampara-trinco") {
      selectedDeparture = "07:30 AM";
    }

    navigate("/booking", {
      state: {
        seats: selectedSeats,
        departure: selectedDeparture,
        busType: "Normal",
        pricePerSeat: 1500,
        date: travelDate,  // ✅ pass selected date
        routes: route
      }
    });
  };




  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <img src="/logo.png" alt="Bus Icon" className="brand-icon" />
            <div>
              <div className="brand-title">KGS Bus Booking</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Premium Travel Experience
              </div>
            </div>
          </div>
          <div className="admin-badge">
            <span>👤</span>
            <span>Admin Panel</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Trip Information */}
        <section className="trip-info">
          <div className="trip-info-grid">
            <div className="trip-detail">
              <div className="trip-icon">📍</div>
              <div>
                <div className="trip-label">From</div>
                <div className="trip-value">Ampara</div>
              </div>
            </div>
            <div className="trip-detail">
              <div className="trip-icon">🎯</div>
              <div>
                <div className="trip-label">To</div>
                <div className="trip-value">Thrincomalee</div>
              </div>
            </div>
            <div className="trip-detail">
              <div className="trip-icon">🕐</div>
              <div>
                <div className="trip-label">Departure</div>
                <div className="trip-value">07:30 AM - 01.15 PM</div>
              </div>
            </div>
            <div className="trip-detail">
              <div className="trip-icon">🚌</div>
              <div>
                <div className="trip-label">Bus Type</div>
                <div className="trip-value">Normal</div>
              </div>
            </div>
          </div>
        </section>
        <section className="trip-info">
          <div className="trip-info-grid">
            <div className="trip-detail">
              <div className="trip-icon">📍</div>
              <div>
                <div className="trip-label">From</div>
                <div className="trip-value">Thrincomalee</div>
              </div>
            </div>
            <div className="trip-detail">
              <div className="trip-icon">🎯</div>
              <div>
                <div className="trip-label">To</div>
                <div className="trip-value">Ampara</div>
              </div>
            </div>
            <div className="trip-detail">
              <div className="trip-icon">🕐</div>
              <div>
                <div className="trip-label">Departure</div>
                <div className="trip-value">05:15 PM - 10.30 PM</div>
              </div>
            </div>
            <div className="trip-detail">
              <div className="trip-icon">🚌</div>
              <div>
                <div className="trip-label">Bus Type</div>
                <div className="trip-value">Normal</div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card available">
            <div className="stat-content">
              <div>
                <div className="stat-number">{availableCount}</div>
                <div className="stat-label">Available Seats</div>
              </div>
              <div className="stat-icon-large">💺</div>
            </div>
          </div>
          <div className="stat-card selected">
            <div className="stat-content">
              <div>
                <div className="stat-number">{selectedCount}</div>
                <div className="stat-label">Selected Seats</div>
              </div>
              <div className="stat-icon-large">✓</div>
            </div>
          </div>
          <div className="stat-card booked">
            <div className="stat-content">
              <div>
                <div className="stat-number">{bookedCount}</div>
                <div className="stat-label">Booked Seats</div>
              </div>
              <div className="stat-icon-large">✕</div>
            </div>
          </div>
        </div>

        {/* Seat Selection Section */}
        <section className="seat-section">
          <div className="seat-header">
            <h2 className="seat-title">Select Your Seats</h2>
            <div className="seat-legend">
              <div className="legend-item">
                <div className="legend-box available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-box selected"></div>
                <span>Selected</span>
              </div>
              <div className="legend-item">
                <div className="legend-box booked"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          {/* Rout and Date Section */}
          <div className="route-selection-section">
            <h3 className="route-title">Select Route</h3>
            <div className="route-options">
              <label className="route-option">
                <input
                  type="radio"
                  name="route"
                  value="ampara-trinco"
                  checked={route === "ampara-trinco"}
                  onChange={(e) => setRoute(e.target.value)}
                />
                <span className="route-label">
                  <span className="route-from">Ampara</span>
                  <span className="route-arrow">→</span>
                  <span className="route-to">Trincomalee</span>
                </span>
              </label>

              <label className="route-option">
                <input
                  type="radio"
                  name="route"
                  value="trinco-ampara"
                  checked={route === "trinco-ampara"}
                  onChange={(e) => setRoute(e.target.value)}
                />
                <span className="route-label">
                  <span className="route-from">Trincomalee</span>
                  <span className="route-arrow">→</span>
                  <span className="route-to">Ampara</span>
                </span>
              </label>
            </div>
          </div>

          <div className="date-section">
            <h3 className="date-title">Select Date</h3>
            <input
              className="date-box"
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>

          {/* Seat Layout */}
          <div className="seat-layout-wrapper">
            <div className="seat-layout">

              {seats.map((seat, index) => {
                const seatsPerRow = 5;
                let row = Math.floor(index / seatsPerRow) + 1;
                const col = (index) % (seatsPerRow) + 1;
                let seatCol = (col > 2) ? col + 1 : col;
                if (row == 10) {
                  if (((col + 3) / 6) > 1) {
                    seatCol = (col + 3) % 6;
                    row += 1;
                  } else {
                    seatCol = col + 3
                  }


                } else if (row == 11) {
                  seatCol = col + 2
                }
                else if (col > 2) {
                  seatCol = col + 1
                } else {
                  seatCol = col
                }

                console.log(row, seatCol);

                return (
                  <div key={index} className={`seat ${seat.status}`} onClick={() => handleSeatClick(seat)} style={{ gridColumn: seatCol, gridRow: row }}>
                    <div className="seat-icon">💺</div>
                    <div className="seat-number" >{index + 1}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Booking Button */}
          {selectedCount > 0 && (
            <div className="booking-section">
              <button className="book-button" onClick={handleBookSeats}>
                Book {selectedCount} Seat{selectedCount > 1 ? 's' : ''} • LKR {selectedCount * 1500}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;