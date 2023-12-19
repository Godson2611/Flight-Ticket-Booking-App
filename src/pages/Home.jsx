/** @format */

import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Search from "../components/Search";
import Support from "../components/Support";
import Info from "../components/Info";
import Lounge from "../components/Lounge";
import Travelers from "../components/Travelers";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Search />
      <Support />
      <Info />
      <Lounge />
      <Travelers />
      <Footer />
    </>
  );
};

export default Home;
