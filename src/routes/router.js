/** @format */

import express from "express";
import UserRoutes from "./User.router.js";
import FlightRoutes from "./Flight.router.js";
import BookingRoutes from "./Booking.router.js";
const router = express.Router();

router.use("/user", UserRoutes);
router.use("/flight", FlightRoutes);
router.use("/book", BookingRoutes);

export default router;
