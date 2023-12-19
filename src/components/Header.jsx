/** @format */

import React from "react";

// Imported Assests =======>
import video from "../assets/video.mp4";
import aeroplane from "../assets/aeroplane.png";

const Header = () => {
  return (
    <div id='Header' className='header flex container'>
      <div className='mainText'>
        <h1>Create Ever-lasting Memories With Us</h1>
      </div>

      <div className='headerImages flex'>
        <div className='videoDiv'>
          <video src={video} className='video' autoPlay loop muted />
        </div>

        <img src={aeroplane} className='plane' />
      </div>
    </div>
  );
};

export default Header;
