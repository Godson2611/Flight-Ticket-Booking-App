/** @format */

import React from "react";
import { Link } from "react-router-dom";

const HowTo = () => {
  return (
    <>
      <div className='howto'>
        <h1>
          Comprehensive Guide: Booking, Managing, and Canceling Your Flight
        </h1>

        <p>
          Welcome to a seamless and efficient flight experience. This
          comprehensive guide will walk you through the process with precision:
        </p>

        <ol>
          <li>
            <strong>Initiate Your Journey:</strong> Begin by effortlessly
            navigating to our curated "All Flights" section.
          </li>
          <li>
            <strong>Refined Search Capabilities:</strong> Alternatively,
            leverage our advanced search feature for a tailored flight
            exploration.
          </li>
          <li>
            <strong>Select Your Ideal Flight:</strong> Choose from our array of
            flights and specify the number of seats according to your
            preferences.
          </li>
          <li>
            <strong>Confirm Your Reservation:</strong> With a simple click of
            the "Book" button, solidify your travel plans effortlessly.
          </li>
          <li>
            <strong>Effortless Booking Management:</strong> Seamlessly manage
            your bookings by navigating to the dedicated "Manage Your Bookings"
            section.
          </li>
          <li>
            <strong>Cancel with Ease:</strong> If plans change, canceling a
            booking is a breeze—just a simple click on the cancellation button
            is all it takes.
          </li>
          <li>
            <strong>Check-In and Check-Out with Confidence:</strong> Access your
            check-in and check-out details directly within the user-friendly
            "Manage Your Bookings" section.
          </li>
          <li>
            <strong>A New Journey Begins:</strong> Ready to embark on a new
            adventure? Start the booking process afresh for your next travel
            endeavor.
          </li>
        </ol>

        <p>
          Your journey with us is now simplified, ensuring a smooth experience
          from booking to management. For any inquiries, consult our FAQ section
          or connect with our dedicated support team.
        </p>
        <Link to='/Header'>
          <button className='back-to-home-button'>Back to Home</button>
        </Link>
      </div>
    </>
  );
};

export default HowTo;
