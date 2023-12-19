import mongoose from "./index.models.js";

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    destinationAirport: {
      type: String,
      required: true,
    },
    departureDateTime: {
      type: Date,
      required: true,
    },
    arrivalDateTime: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    bookings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        firstName: { type: String },
        lastName: { type: String },
        bookedSeats: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    collection: "Flights",
    versionKey: false,
  }
);

const flightModel = mongoose.model("Flights", flightSchema);
export default flightModel;
