import React, { useState } from 'react';
import './Dashboard.css';

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

  // Function to book selected seats
  const handleBookSeats = () => {
    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s.status === 'selected' ? { ...s, status: 'booked' } : s
      )
    );
    setSelectedSeats([]);
  };
 

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <img src="/src/assets/logo.png" alt="Bus Icon" className="brand-icon" />
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
                <div className="trip-value">07:30 AM</div>
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

          {/* Driver Section */}
          <div className="driver-section">
            <div className="driver-box">🚗 DRIVER</div>
          </div>

          {/* Seat Layout */}
          <div className="seat-layout">
            {/* Left Column - Seats 1-27 */}
            <div className="seat-column">
              {seats.slice(0, 27).map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.status}`}
                  onClick={() => handleSeatClick(seat)}
                  title={`Seat ${seat.id} - ${seat.status}`}
                >
                  <div className="seat-icon">💺</div>
                  <div className="seat-number">{seat.id}</div>
                </div>
              ))}
            </div>

            {/* Aisle */}
            <div className="aisle">
              <div className="aisle-text">AISLE</div>
            </div>

            {/* Right Column - Seats 28-54 */}
            <div className="seat-column">
              {seats.slice(27, 54).map((seat) => (
                <div
                  key={seat.id}
                  className={`seat ${seat.status}`}
                  onClick={() => handleSeatClick(seat)}
                  title={`Seat ${seat.id} - ${seat.status}`}
                >
                  <div className="seat-icon">💺</div>
                  <div className="seat-number">{seat.id}</div>
                </div>
              ))}
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