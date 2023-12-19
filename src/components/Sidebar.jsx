/** @format */

import React from "react";
import "../Dashboard.css";
import { Link , useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <ul
        className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
        id='accordionSidebar'
      >
        <Link
          className='sidebar-brand d-flex align-items-center justify-content-center'
          to='/admin'
        >
          <div className='sidebar-brand-icon rotate-n-15'>
            <i className='fas fa-laugh-wink'></i>
          </div>
          <div className='sidebar-brand-text mx-3'>Welcome Admin</div>
        </Link>

        <li className='nav-item active'>
          <Link className='nav-link' to='/admin'>
            <i className='fas fa-fw fa-tachometer-alt'></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className='sidebar-divider my-0' />

        <div className='sidebar-heading'>Interface</div>

        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/create-flights'>
            <i className='fas fa-fw fa-plane'></i>
            <span>Create Flights</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/edit-flights'>
            <i className='fas fa-fw fa-edit'></i>
            <span>Edit Flights</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link collapsed' to='/update-users'>
            <i className='fas fa-fw fa-edit'></i>
            <span>Update Users</span>
          </Link>
        </li>
        <div className='logout-button-container'>
          <button
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "10px 15px", 
              marginLeft: "18px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={ () => navigate("/signin")}
          >
            Logout
          </button>
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
