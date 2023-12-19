/** @format */

import React from "react";
import { Link } from "react-router-dom";
// Imported Icons ======>
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <div id='Footer' className='footer'>
      <div className='sectionContainer container grid'>
        <div className='gridOne'>
          <div className='logoDiv'>
            <h1>Logo</h1>
          </div>
          <p>Your mind should be stronger than your feelings, fly!</p>
          <div className='socialIcon flex'>
            <TiSocialFacebook className='icon' />
            <FaXTwitter className='icon' />
            <FaYoutube className='icon' />
            <FaPinterest className='icon' />
          </div>
        </div>

        <div className='footerLinks'>
          <span className='linkTitle'>Information</span>
          <li>
            <Link to='/Header'>Home</Link>
          </li>
          <li>
            <Link to='/allflights'>All Flight</Link>
          </li>
          <li>
            <Link to='/user-bookings'>Manage your booking</Link>
          </li>
        </div>
        <div className='footerLinks'>
          <span className='linkTitle'>Quick Guide</span>
          <li>
            <Link to='/faq'>FAQ</Link>
          </li>
          <li>
            <Link to='/how-to'>How to</Link>
          </li>
          <li>
            <Link to='/features'>Features</Link>
          </li>
          <li>
            <Link to='/map'>Map</Link>
          </li>
        </div>
      </div>
      <div className='copyRightDiv flex'>
        <p>
          Courtesy website | Developed by{" "}
          <a href='https://emailto-godson2611@gmail.com' target='_blank' rel='noopener noreferrer'>
            Godson
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
