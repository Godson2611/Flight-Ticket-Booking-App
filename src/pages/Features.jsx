import React from 'react';
import { Link } from 'react-router-dom';

const Features = () => {
  return (
    <div className='features'>
      <h1>Features of Our Flight Ticket Booking App</h1>

      <section>
        <h2>1. Wide Range of Flights</h2>
        <p>Explore a diverse selection of flights to various destinations worldwide.</p>
      </section>

      <section>
        <h2>2. Easy Booking Process</h2>
        <p>Effortlessly book your flights with our user-friendly and secure booking process.</p>
      </section>

      <section>
        <h2>4. Check-In Online</h2>
        <p>Conveniently check-in online to save time and streamline your travel experience.</p>
      </section>

      <section>
        <h2>5. Manage Your Bookings</h2>
        <p>Effortlessly manage your bookings, make modifications, and view your flight details with ease.</p>
      </section>

      <section>
        <h2>6. Quick Guide and FAQ</h2>
        <p>Access a quick guide and frequently asked questions to assist you in using our application effectively.</p>
      </section>

      <section>
        <h2>7. Interactive Map</h2>
        <p>Explore our interactive map to visualize flight routes and destinations.</p>
      </section>

      <section>
        <h2>8. Custom User Profile</h2>
        <p>Create a personalized user profile with the following features:</p>
        <ul>
          <li>Set and update your profile name</li>
          <li>View your booking history</li>
        </ul>
      </section>
      <Link to="/Header">
        <button className="back-to-home-button">Back to Home</button>
      </Link>
    </div>
  );
};

export default Features;
