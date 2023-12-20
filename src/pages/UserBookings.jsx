import React, { useEffect, useState } from "react";
import AxiosService from "../utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserBookings = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    try {
      setLoading(true);
      const response = await AxiosService.get("/book/userbookings");
      setUserBookings(response.data.bookings);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user bookings");
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      const response = await AxiosService.delete(
        `/book/cancelbooking/${bookingId}`
      );
      getUserBookings();
      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error canceling booking");
      setLoading(false);
    }
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="user-bookings">
      <h2>Your Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userBookings.length > 0 ? (
        <ul>
          {userBookings.map((booking) => (
            <li key={booking._id}>
              <div>
                <p>
                  <strong>Flight Number:</strong> {booking.flightNumber}
                </p>
                <p>
                  <strong>Airline:</strong> {booking.airline}
                </p>
                <p>
                  <strong>Departure Time:</strong>{" "}
                  {new Date(booking.departureDateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Arrival Time:</strong>{" "}
                  {new Date(booking.arrivalDateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Booked Seats:</strong> {booking.bookedSeats}
                </p>
              </div>
              <ul>
                {booking.bookings.map((individualBooking) => (
                  <li key={individualBooking._id}>
                    Booked by: {individualBooking.firstName}{" "}
                    {individualBooking.lastName}, <strong>Seats:</strong>{" "}
                    {individualBooking.bookedSeats}
                    <button
                      onClick={() => handleCancelBooking(individualBooking._id)}
                    >
                      Cancel Booking
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <p className="bold">
            Feel free to cancel any booking you no longer need. We understand
            plans change, and we want to make it easy for you to manage your
            reservations.
          </p>
          <button className="back-to-home-button" onClick={navigateToHome}>
            Back to Home
          </button>
        </ul>
      ) : (
        <div>
          <p>
            <h1>No bookings found.</h1>
          </p>
          <p className="bold">
            It seems like you haven't made any bookings yet. To make a booking,
            navigate to our available flights and reserve your seats today!
          </p>
          <button className="back-to-home-button" onClick={navigateToHome}>
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
