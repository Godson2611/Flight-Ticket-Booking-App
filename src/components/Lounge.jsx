/** @format */

import React from "react";
import lounge from "../assets/lounge.jpg"

const Lounge = () => {
  return (
    <div className='lounge container section'>
      <div className='sectionContainer grid'>
        <div className='imgDiv'><img src={lounge} alt="images-for-client" /></div>
        <div className='textDiv'>
          <h2>Unaccompanied Minor Louge</h2>

          <div className='grids grid'>
            <div className='singleGrid'>
              <span className='gridTitle'>Help through the airport</span>
              <p>
                You can also call airlines from your phone and book a flight
                ticket to one of your favorite destinations.
              </p>
            </div>
            <div className='singleGrid'>
              <span className='gridTitle'>In-flight assistance</span>
              <p>
                Enjoy a comfortable journey with our in-flight services. Call
                airlines from your phone to book a flight ticket to your
                preferred destination.
              </p>
            </div>
            <div className='singleGrid'>
              <span className='gridTitle'>Care on the flight</span>
              <p>
                Experience top-notch care during your flight. Call airlines from
                your phone to book a flight ticket to one of your favorite
                destinations.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Lounge;
