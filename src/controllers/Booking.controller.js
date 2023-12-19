/** @format */

import flightModel from "../models/Flight.model.js";
import userModel from "../models/User.model.js";

const bookFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookedSeats } = req.body;

    if (!bookedSeats || bookedSeats <= 0) {
      return res.status(400).json({ error: "Invalid bookedSeats value" });
    }

    const flight = await flightModel.findById(id);
    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    if (flight.availableSeats < bookedSeats) {
      return res.status(400).json({ error: "Not enough available seats" });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const user = req.user;

    const booking = {
      user: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      bookedSeats,
    };

    flight.bookings.push(booking);
    flight.bookedSeats += bookedSeats;
    flight.availableSeats -= bookedSeats;

    const updatedFlight = await flight.save();

    const latestBookingId = flight.bookings[flight.bookings.length - 1]._id;
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        bookings: {
          flight: id,
          flightNumber: flight.flightNumber,
          bookedSeats,
          _id: latestBookingId,
        },
      },
      $inc: { bookedSeats },
    });

    res.status(200).json({
      message: "Flight booked successfully",
      data: {
        flight: {
          _id: updatedFlight,
          flightNumber: updatedFlight.flightNumber,
        },
        bookedSeats,
        userId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const flight = await flightModel.findOne({ "bookings._id": bookingId });
    if (!flight) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = flight.bookings.find((b) => b._id.toString() === bookingId);

    if (!booking) {
      console.log(booking);
      return res.status(404).json({ error: "Booking not found" });
    }

    const userId = req.user?.id;

    if (!userId || userId !== booking.user.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized to cancel this booking" });
    }

    flight.bookings = flight.bookings.filter(
      (b) => b._id.toString() !== bookingId
    );
    flight.bookedSeats -= booking.bookedSeats;
    flight.availableSeats += booking.bookedSeats;

    const updatedFlight = await flight.save();

    await userModel.findByIdAndUpdate(userId, {
      $pull: { bookings: { _id: bookingId } },
    });

    res.status(200).json({
      message: "Booking canceled successfully",
      data: {
        flight: updatedFlight,
        canceledBooking: booking,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const bookings = await flightModel
      .find({ "bookings.user": userId })
      .populate("bookings.user");

    res.status(200).json({ user, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { bookFlight, cancelBooking, getUserBookings };
