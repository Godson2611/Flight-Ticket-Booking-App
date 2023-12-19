/** @format */

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingDetails = location.state?.bookingDetails || {};
  const { flight, user, bookedSeats } = bookingDetails;

  return (
    <div className='booking-details'>
      <h2>Booking Details</h2>
      <p>
        Thank you for booking with us, {user?.name || "Guest"}! You have booked{" "}
        {bookedSeats} seat(s) for the following flight:
      </p>
      <ul>
        <li>
          <strong>Airline:</strong> {flight?.airline}
        </li>
        <li>
          <strong>Flight Number:</strong> {flight?.flightNumber}
        </li>
        <li>
          <strong>Departure Airport:</strong> {flight?.departureAirport}
        </li>
        <li>
          <strong>Destination Airport:</strong> {flight?.destinationAirport}
        </li>
        <li>
          <strong>Departure Date & Time:</strong> {flight?.departureDateTime}
        </li>
        <li>
          <strong>Arrival Date & Time:</strong> {flight?.arrivalDateTime}
        </li>
        <li>
          <strong>Price:</strong> ${flight?.price}
        </li>
      </ul>
      <button onClick={() => navigate("/home")}>Home Page</button>
    </div>
  );
};

export default Booking;
