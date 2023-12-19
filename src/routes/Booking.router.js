import express from "express";
import BookingController from "../controllers/Booking.controller.js";
import auth from '../common/auth.js';

const router = express.Router();

router.post("/bookflight/:id", auth.validate, BookingController.bookFlight);
router.delete("/cancelbooking/:bookingId", auth.validate, BookingController.cancelBooking);
router.get("/userbookings", auth.validate, BookingController.getUserBookings);

export default router;
