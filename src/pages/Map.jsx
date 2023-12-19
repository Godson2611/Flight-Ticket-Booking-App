import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

const Map = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const center = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const markerPosition = {
    lat: 20.5937,
    lng: 78.9629,
  };

  const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

  return (
    <div className='map-container'>
      <h2 className='map-title'>Our Location</h2>
      <p className='map-description'>We are located at the heart of the city. Come visit us!</p>
      <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={4.20}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      </LoadScript>
      <Link to="/" className='home-button'>Back to Home</Link>
    </div>
  );
};

export default Map;
