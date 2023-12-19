/** @format */

import express from "express";
import FlightController from "../controllers/Flight.controller.js";
const router = express.Router();

router.post("/createflight", FlightController.createFlight);
router.get("/allflights", FlightController.allFlights);
router.get("/flight/:id", FlightController.flightById);
router.put("/updateflight/:id", FlightController.updateFlight);
router.delete("/deleteflight/:id", FlightController.deleteFlight);
router.post("/searchflight", FlightController.SearchFlight);

export default router;
