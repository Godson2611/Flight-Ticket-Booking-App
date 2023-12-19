import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  return (
    <div className='faq'>
      <h1>Frequently Asked Questions</h1>

      <section>
        <h2>General Questions</h2>
        <ul>
          <li>
            <strong>Q: How can I book a flight ticket?</strong>
            <br />
            A: You can book a flight by navigating to the "All Flights" section or using the search feature. Choose your desired flight, and follow the easy one-click booking process.
          </li>
          <li>
            <strong>Q: What payment methods do you accept?</strong>
            <br />
            A: No payment methods are required. Booking is simplified with a single click, thanks to our dummy payment gateway.
          </li>
          <li>
            <strong>Q: Can I view my booking history?</strong>
            <br />
            A: Yes, you can view your booking history in the "My Bookings" or "Manage Your Booking" section after logging into your account.
          </li>
        </ul>
      </section>

      <section>
        <h2>Booking Process</h2>
        <ul>
          <li>
            <strong>Q: What happens if I cancel a booked flight?</strong>
            <br />
            A: If you cancel a booked flight, it's like starting fresh. You can search for new flights and book once again.
          </li>
          <li>
            <strong>Q: Can I modify my reservation?</strong>
            <br />
            A: Yes, you can modify your reservation by visiting the "Manage Your Booking" section and selecting the modification options.
          </li>

          <li>
            <strong>Q: What happens if my flight is canceled?</strong>
            <br />
            A: To experience the cancellation process, you can book a flight from scratch and then cancel it.
          </li>
        </ul>
      </section>

      <section>
        <h2>Account and Security</h2>
        <ul>
          <li>
            <strong>Q: Can I reset my profile?</strong>
            <br />
            A: Yes, you can customize your profile by resetting and updating your information in the account settings section.
          </li>
          <li>
            <strong>Q: Is my personal information secure?</strong>
            <br />
            A: Yes, we prioritize the security of your personal information. We use encryption and follow industry best practices to protect your data.
          </li>
        </ul>
      </section>

      <Link to="/Header">
        <button className="back-to-home-button">Back to Home</button>
      </Link>
    </div>
  );
};

export default FAQ;
