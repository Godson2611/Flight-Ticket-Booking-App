import React, { useState, useEffect } from 'react';
import AxiosService from '../utils/ApiService';
import { useNavigate } from 'react-router-dom';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await AxiosService.get('flight/allflights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const navigateToHome = () => {
    navigate('/');
  };

  const handleBook = (id) => {
    navigate('/flights', { state: { flights: [flights.find((flight) => flight._id === id)] } });
  };

  return (
    <div className='flight-container'>
      <div className='headers'>
        <h1 className='flight-header'>Explore Our Flights</h1>
        <button className='back-to-home-button' onClick={navigateToHome}>
          Back to Home
        </button>
      </div>
      {loading ? (
        <p>Loading flights...</p>
      ) : (
        <>
          <p className='flight-intro'>
            We offer a wide range of flights to destinations all over the world. Browse the flights
            below to find your perfect journey.
          </p>
          {flights.map((flight, index) => (
            <div key={index} className='flight-card'>
              <h2 className='flight-title'>{flight.airline}</h2>
              <p>Flight Number: {flight.flightNumber}</p>
              <p>Departure Airport: {flight.departureAirport}</p>
              <p>Destination Airport: {flight.destinationAirport}</p>
              <p>Departure Time: {new Date(flight.departureDateTime).toLocaleString()}</p>
              <p>Arrival Time: {new Date(flight.arrivalDateTime).toLocaleString()}</p>
              <p>Price: {flight.price}</p>
              <p>Available Seats: {flight.availableSeats}</p>
              <p>Booked Seats: {flight.bookedSeats}</p>
              <button onClick={() => handleBook(flight._id)}>Book</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AllFlights;
