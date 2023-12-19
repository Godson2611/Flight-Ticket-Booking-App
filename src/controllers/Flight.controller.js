/** @format */

import flightModel from "../models/Flight.model.js";

const createFlight = async (req, res) => {
  try {
    const { body } = req;
    const newFlight = new flightModel(body);
    const savedFlight = await newFlight.save();

    res
      .status(201)
      .json({ message: "Flight created successfully", data: savedFlight });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const allFlights = async (req, res) => {
  try {
    const flights = await flightModel.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const flightById = async (req, res) => {
  try {
    const flight = await flightModel.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const SearchFlight = async (req, res) => {
  try {
    const { location } = req.body;

    const flights = await flightModel.find({
      departureAirport: { $regex: new RegExp(location, 'i') },
    });

    if (flights.length === 0) {
      return res.status(404).json({ message: "No flights found matching the search criteria" });
    }

    res.status(200).json({ message: "Flights found successfully", flights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFlight = async (req, res) => {
  try {
    const updatedFlight = await flightModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlight = await flightModel.findByIdAndDelete(id);

    if (!deletedFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res
      .status(200)
      .json({ message: "Flight deleted successfully", deletedFlight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  createFlight,
  allFlights,
  flightById,
  SearchFlight,
  updateFlight,
  deleteFlight,
};
