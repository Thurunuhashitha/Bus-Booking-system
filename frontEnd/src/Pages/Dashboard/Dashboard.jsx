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
<div className="seat-layout-wrapper">
  <div className="seat-layout">
    {/* Left Column - 2x2 layout */}
    <div className="seat-column left-column">
      {/* Row 1 */}
      <div className={`seat ${seats[0].status}`} onClick={() => handleSeatClick(seats[0])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">1</div>
      </div>
      <div className={`seat ${seats[1].status}`} onClick={() => handleSeatClick(seats[1])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">2</div>
      </div>

      {/* Row 2 */}
      <div className={`seat ${seats[5].status}`} onClick={() => handleSeatClick(seats[5])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">6</div>
      </div>
      <div className={`seat ${seats[6].status}`} onClick={() => handleSeatClick(seats[6])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">7</div>
      </div>

      {/* Row 3 */}
      <div className={`seat ${seats[10].status}`} onClick={() => handleSeatClick(seats[10])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">11</div>
      </div>
      <div className={`seat ${seats[11].status}`} onClick={() => handleSeatClick(seats[11])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">12</div>
      </div>

      {/* Row 4 */}
      <div className={`seat ${seats[15].status}`} onClick={() => handleSeatClick(seats[15])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">16</div>
      </div>
      <div className={`seat ${seats[16].status}`} onClick={() => handleSeatClick(seats[16])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">17</div>
      </div>

      {/* Row 5 */}
      <div className={`seat ${seats[20].status}`} onClick={() => handleSeatClick(seats[20])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">21</div>
      </div>
      <div className={`seat ${seats[21].status}`} onClick={() => handleSeatClick(seats[21])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">22</div>
      </div>

      {/* Row 6 */}
      <div className={`seat ${seats[25].status}`} onClick={() => handleSeatClick(seats[25])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">26</div>
      </div>
      <div className={`seat ${seats[26].status}`} onClick={() => handleSeatClick(seats[26])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">27</div>
      </div>

      {/* Row 7 */}
      <div className={`seat ${seats[30].status}`} onClick={() => handleSeatClick(seats[30])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">31</div>
      </div>
      <div className={`seat ${seats[31].status}`} onClick={() => handleSeatClick(seats[31])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">32</div>
      </div>

      {/* Row 8 */}
      <div className={`seat ${seats[35].status}`} onClick={() => handleSeatClick(seats[35])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">36</div>
      </div>
      <div className={`seat ${seats[36].status}`} onClick={() => handleSeatClick(seats[36])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">37</div>
      </div>

      {/* Row 9 */}
      <div className={`seat ${seats[40].status}`} onClick={() => handleSeatClick(seats[40])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">41</div>
      </div>
      <div className={`seat ${seats[41].status}`} onClick={() => handleSeatClick(seats[41])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">42</div>
      </div>

      {/* Row 10 - Empty on left */}
    </div>

    {/* Aisle */}
    <div className="aisle">
      <div className="aisle-text">AISLE</div>
    </div>

    {/* Right Column - 3x3 layout */}
    <div className="seat-column right-column">
      {/* Row 1 */}
      <div className={`seat ${seats[2].status}`} onClick={() => handleSeatClick(seats[2])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">3</div>
      </div>
      <div className={`seat ${seats[3].status}`} onClick={() => handleSeatClick(seats[3])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">4</div>
      </div>
      <div className={`seat ${seats[4].status}`} onClick={() => handleSeatClick(seats[4])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">5</div>
      </div>

      {/* Row 2 */}
      <div className={`seat ${seats[7].status}`} onClick={() => handleSeatClick(seats[7])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">8</div>
      </div>
      <div className={`seat ${seats[8].status}`} onClick={() => handleSeatClick(seats[8])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">9</div>
      </div>
      <div className={`seat ${seats[9].status}`} onClick={() => handleSeatClick(seats[9])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">10</div>
      </div>

      {/* Row 3 */}
      <div className={`seat ${seats[12].status}`} onClick={() => handleSeatClick(seats[12])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">13</div>
      </div>
      <div className={`seat ${seats[13].status}`} onClick={() => handleSeatClick(seats[13])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">14</div>
      </div>
      <div className={`seat ${seats[14].status}`} onClick={() => handleSeatClick(seats[14])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">15</div>
      </div>

      {/* Row 4 */}
      <div className={`seat ${seats[17].status}`} onClick={() => handleSeatClick(seats[17])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">18</div>
      </div>
      <div className={`seat ${seats[18].status}`} onClick={() => handleSeatClick(seats[18])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">19</div>
      </div>
      <div className={`seat ${seats[19].status}`} onClick={() => handleSeatClick(seats[19])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">20</div>
      </div>

      {/* Row 5 */}
      <div className={`seat ${seats[22].status}`} onClick={() => handleSeatClick(seats[22])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">23</div>
      </div>
      <div className={`seat ${seats[23].status}`} onClick={() => handleSeatClick(seats[23])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">24</div>
      </div>
      <div className={`seat ${seats[24].status}`} onClick={() => handleSeatClick(seats[24])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">25</div>
      </div>

      {/* Row 6 */}
      <div className={`seat ${seats[27].status}`} onClick={() => handleSeatClick(seats[27])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">28</div>
      </div>
      <div className={`seat ${seats[28].status}`} onClick={() => handleSeatClick(seats[28])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">29</div>
      </div>
      <div className={`seat ${seats[29].status}`} onClick={() => handleSeatClick(seats[29])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">30</div>
      </div>

      {/* Row 7 */}
      <div className={`seat ${seats[32].status}`} onClick={() => handleSeatClick(seats[32])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">33</div>
      </div>
      <div className={`seat ${seats[33].status}`} onClick={() => handleSeatClick(seats[33])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">34</div>
      </div>
      <div className={`seat ${seats[34].status}`} onClick={() => handleSeatClick(seats[34])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">35</div>
      </div>

      {/* Row 8 */}
      <div className={`seat ${seats[37].status}`} onClick={() => handleSeatClick(seats[37])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">38</div>
      </div>
      <div className={`seat ${seats[38].status}`} onClick={() => handleSeatClick(seats[38])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">39</div>
      </div>
      <div className={`seat ${seats[39].status}`} onClick={() => handleSeatClick(seats[39])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">40</div>
      </div>

      {/* Row 9 */}
      <div className={`seat ${seats[42].status}`} onClick={() => handleSeatClick(seats[42])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">43</div>
      </div>
      <div className={`seat ${seats[43].status}`} onClick={() => handleSeatClick(seats[43])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">44</div>
      </div>
      <div className={`seat ${seats[44].status}`} onClick={() => handleSeatClick(seats[44])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">45</div>
      </div>

      {/* Row 10 - Only right side */} 
      <div className={`seat ${seats[45].status}`} onClick={() => handleSeatClick(seats[45])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">46</div>
      </div>
      <div className={`seat ${seats[46].status}`} onClick={() => handleSeatClick(seats[46])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">47</div>
      </div>
      <div className={`seat ${seats[46].status}`} onClick={() => handleSeatClick(seats[46])}>
        <div className="seat-icon">💺</div>
        <div className="seat-number">48</div>
      </div>
      <div style={{visibility: 'hidden', aspectRatio: '1', minHeight: '60px', width: '100%'}}></div> 
    </div>
  </div>

  {/* Last Row - Full width 6 seats (49-54) */}
  <div className="last-row-full">
    <div className={`seat ${seats[48].status}`} onClick={() => handleSeatClick(seats[48])}>
      <div className="seat-icon">💺</div>
      <div className="seat-number">49</div>
    </div>
    <div className={`seat ${seats[49].status}`} onClick={() => handleSeatClick(seats[49])}>
      <div className="seat-icon">💺</div>
      <div className="seat-number">50</div>
    </div>
    <div className={`seat ${seats[50].status}`} onClick={() => handleSeatClick(seats[50])}>
      <div className="seat-icon">💺</div>
      <div className="seat-number">51</div>
    </div>
    <div className={`seat ${seats[51].status}`} onClick={() => handleSeatClick(seats[51])}>
      <div className="seat-icon">💺</div>
      <div className="seat-number">52</div>
    </div>
    <div className={`seat ${seats[52].status}`} onClick={() => handleSeatClick(seats[52])}>
      <div className="seat-icon">💺</div>
      <div className="seat-number">53</div>
    </div>
    <div className={`seat ${seats[53].status}`} onClick={() => handleSeatClick(seats[53])}>
      <div className="seat-icon">💺</div>
      <div className="seat-number">54</div>
    </div>
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