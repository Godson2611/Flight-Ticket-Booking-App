/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

const NoFlights = () => {
  const navigate = useNavigate();
  return (
    <div className='no-flights'>
      <h3>No Flights Found</h3>
      <p>We couldn't find any flights that match your search criteria.</p>
      <p>Please modify your search and try again.</p>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Back to search
      </button>
    </div>
  );
};

export default NoFlights;
