/** @format */

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Admin from "../pages/Admin";
import Flights from "../pages/Flights";
import Profile from "../pages/Profile";
import Booking from "../pages/Booking";
import AllFlights from "../pages/AllFlights";
import UserBookings from "../pages/UserBookings";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Map from "../pages/Map";
import FAQ from "../pages/Faq";
import Features from "../pages/Features";
import HowTo from "../pages/HowTo";
import EditFlight from "../pages/EditFlight";
import CreateFlightsForm from "../pages/CreateFlights";
import UpdateUsers from "../pages/UpdateUsers";

const AppRouters = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/admin/*' element={<Admin />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/booking' element={<Booking />} />
      <Route path='/flights' element={<Flights />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/allflights' element={<AllFlights />} />
      <Route path='/user-Bookings' element={<UserBookings />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/map' element={<Map />} />
      <Route path='/faq' element={<FAQ />} />
      <Route path='/features' element={<Features />} />
      <Route path='/how-to' element={<HowTo />} />
      <Route path='/create-flights' element={<CreateFlightsForm />} />
      <Route path='/edit-flights' element={<EditFlight />} />
      <Route path='/update-users' element={<UpdateUsers />} />
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRouters;
