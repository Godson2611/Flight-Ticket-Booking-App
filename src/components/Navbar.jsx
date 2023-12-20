/** @format */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SiConsul } from "react-icons/si";
import { CgMenuGridO } from "react-icons/cg";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("navBarMenu");
  const [noBg, addBg] = useState("navBarTwo");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const logout = useLogout();

  const showNavbar = () => {
    setActive("navBarMenu showNavBar");
  };

  const removeNavbar = () => {
    setActive("navBarMenu");
  };

  const getFlights = () =>{
    navigate("/allflights")
  }

  const getBookings = () => {
    navigate("/user-bookings")
  }

  const toggleNavbar = () => {
    if (active === "navBarMenu") {
      showNavbar();
    } else {
      removeNavbar();
    }
  };

  const handleSignOut = () => {
    logout();
  };

  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navBar_With_Bg");
    } else {
      addBg("navBarTwo");
    }
  };

  const handleButtonClick = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const handleScroll = () => {
      addBgColor();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    navigate(`/${sectionId.toLowerCase()}`);
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - 50,
        behavior: "smooth",
      });

      setTimeout(() => {
        removeNavbar();
      }, 500);
    }
  };

  return (
    <div className='navBar flex'>
      <div className='navBarOne flex'>
        <div>
          <SiConsul />
        </div>
        <div className='atb flex'>
          {!userData ? (
            <>
              <span onClick={() => navigate("/signin")}>Sign In</span>
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </>
          ) : (
            <>
              <button className='welcomeButton' onClick={handleButtonClick}>
                <span style={{ fontSize: "1.1em" }}>
                  Welcome {userData.firstName} {userData.lastName}
                </span>
              </button>

              <span
                className='signOutLink'
                style={{ cursor: "pointer" }}
                onClick={handleSignOut}
              >
                Sign Out
              </span>
            </>
          )}
        </div>
      </div>
      <div className={noBg}>
        <div className='logoDiv'>
          <h1>Logo</h1>
        </div>
        <div className={active}>
          <ul className='menu flex'>
            <li onClick={() => navigate("/Header")} className='listItem'>
              Home
            </li>
            <li onClick={() => scrollToSection("Search")} className='listItem'>
              Search
            </li>
            <li onClick={() => scrollToSection("Support")} className='listItem'>
              Support
            </li>
            <li
              onClick={() => scrollToSection("Travelers")}
              className='listItem'
            >
              Travelers
            </li>
            <li onClick={() => scrollToSection("Footer")} className='listItem'>
              Footer
            </li>
          </ul>
          <button className='btn flex btnOne' onClick={getFlights}>Book</button>
          <button className='btn flex btnOne' onClick={getBookings}>Bookings</button>
        </div> 
        <button className='btn flex btnTwo' onClick={getFlights}>Book</button>
        <button className='btn flex btnTwo' onClick={getBookings}>Bookings</button>
        <div onClick={toggleNavbar} className='toggleIcon'>
          <CgMenuGridO className='icon' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;