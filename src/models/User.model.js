/** @format */

import mongoose from "./index.models.js";

const validateEmail = (e) => {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(e);
};

const validatePhoneNumber = (value) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(value);
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First Name is required"] },
    lastName: { type: String, required: [true, "Last Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: validateEmail,
    },
    password: { type: String, required: [true, "Password is required"] },
    status: { type: Boolean, default: true },
    role: { type: String, default: "customer" },
    createdAt: { type: Date, default: Date.now() },
    phoneNumber: {
      type: String,
      validate: {
        validator: validatePhoneNumber,
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    bookings: [
      {
        flight: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Flights",
        },
        flightNumber: {
          type: String,
          required: true,
        },
        bookedSeats: {
          type: Number,
          required: true,
        },
      },
    ],
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
  },
  {
    collection: "Users",
    versionKey: false,
  }
);

const userModel = mongoose.model("Users", userSchema);
export default userModel;
