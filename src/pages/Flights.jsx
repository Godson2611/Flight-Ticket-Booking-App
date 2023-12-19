/** @format */

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlane, FaMoneyBillWave } from "react-icons/fa";
import NoFlights from "../components/NoFlights";
import AxiosService from "../utils/ApiService";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

const Flights = () => {
  const location = useLocation();
  const flights = location.state?.flights || [];
  const { userData, setUserData } = useUserContext();
  const navigate = useNavigate();

  const [bookedSeatsInput, setBookedSeatsInput] = useState("");

  const handleBook = async (id) => {
    try {
      const bookedSeats = parseInt(bookedSeatsInput, 10);

      if (!bookedSeatsInput || isNaN(bookedSeats) || bookedSeats <= 0) {
        toast.error("Invalid bookedSeats value");
        return;
      }

      const userId = userData?._id;

      if (!userId) {
        toast.error("User not authenticated");
        navigate("/signin");
        return;
      }

      const flightDetails = flights.find((flight) => flight._id === id);

      if (!flightDetails) {
        toast.error("Flight details not found");
        return;
      }

      const response = await AxiosService.post(`/book/bookflight/${id}`, {
        bookedSeats,
        userId,
      });

      const updatedUserData = { ...userData };
      updatedUserData.bookings = [
        ...updatedUserData.bookings,
        {
          flightNumber: flightDetails.flightNumber,
          bookedSeats,
        },
      ];
      setUserData(updatedUserData);

      const bookingDetails = {
        flight: {
          id: flightDetails._id,
          airline: flightDetails.airline,
          flightNumber: flightDetails.flightNumber,
          departureAirport: flightDetails.departureAirport,
          destinationAirport: flightDetails.destinationAirport,
          departureDateTime: flightDetails.departureDateTime,
          arrivalDateTime: flightDetails.arrivalDateTime,
          price: flightDetails.price,
        },
        user: {
          name: userData.name,
          email: userData.email,
        },
        bookedSeats,
      };

      toast.success(response.data.message);
      navigate("/booking", { state: { bookingDetails } });
    } catch (error) {
      console.error(error);
      toast.error("Error booking flight");
    }
  };

  return (
    <div className='flights'>
      <h2>Available Flights</h2>
      <p>
        Here are the flights that match your search criteria. You can book a
        flight by entering the number of seats and clicking the "Book" button.
      </p>
      {flights.length > 0 ? (
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>
                  <FaPlane /> Airline
                </th>
                <th>Flight Number</th>
                <th>Departure Airport</th>
                <th>Destination Airport</th>
                <th>Departure Date & Time</th>
                <th>Arrival Date & Time</th>
                <th>
                  <FaMoneyBillWave /> Price
                </th>
                <th>Available Seats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight._id} className='flight-row'>
                  <td>{flight.airline}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.departureAirport}</td>
                  <td>{flight.destinationAirport}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(flight.departureDateTime))}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(flight.arrivalDateTime))}
                  </td>
                  <td>${flight.price}</td>
                  <td>
                    <input
                      type='number'
                      placeholder={`Enter seats (Max: ${flight.availableSeats})`}
                      value={bookedSeatsInput}
                      onChange={(e) => setBookedSeatsInput(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleBook(flight._id)}>Book</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoFlights />
      )}
    </div>
  );
};

export default Flights;
