/** @format */

import React from "react";

// Imported Destination Images =======>
import paris from "../assets/paris.jpg";
import london from "../assets/london.jpg"
import newyork from "../assets/newyork.jpg"
import bangkok from "../assets/bangkok.jpg"
// Imported Traveler Images ========>
import traveler1 from "../assets/traveler1.jpg";
import traveler2 from "../assets/traveler2.jpg";
import traveler3 from "../assets/traveler3.jpg";
import traveler4 from "../assets/traveler4.jpg";

const travelers = [
  {
    id: 1,
    destinationImage: paris,
    travelerImage: traveler1,
    travelerName: "User 1",
    socialLink: "@user1@gmail.com",
  },
  {
    id: 2,
    destinationImage: london,
    travelerImage: traveler2,
    travelerName: "User 2",
    socialLink: "@user2@gmail.com",
  },
  {
    id: 3,
    destinationImage: newyork,
    travelerImage: traveler3,
    travelerName: "User 3",
    socialLink: "@user3@gmail.com",
  },
  {
    id: 4,
    destinationImage: bangkok,
    travelerImage: traveler4,
    travelerName: "User 4",
    socialLink: "@user4@gmail.com",
  },
];

const Travelers = () => {
  return (
    <div id="Travelers" className='travelers container section'>
      <div className='sectionContainer'>
        <h2>Top travelers of this month</h2>
        <div className='travelersContainer grid'>
          {travelers.map(
            ({
              id,
              destinationImage,
              travelerImage,
              travelerName,
              socialLink,
            }) => (
              <div key={id} className='singleTraveler'>
                <img
                  src={destinationImage}
                  alt='Destination'
                  className='destinationImage'
                />

                <div className='travelerDetails'>
                  <div className='travelerPicture'>
                    <img
                      src={travelerImage}
                      alt='Traveler'
                      className='travelerImage'
                    />
                  </div>
                  <div className='travelerName'>
                    <span>{travelerName}</span>
                    <p>{socialLink}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Travelers;
