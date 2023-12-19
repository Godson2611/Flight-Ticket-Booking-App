/** @format */

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup
import AxiosService from "../utils/ApiService";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

const CreateFlightsForm = () => {
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    airline: Yup.string().required("Airline is required"),
    flightNumber: Yup.string().required("Flight Number is required"),
    departureAirport: Yup.string().required("Departure Airport is required"),
    destinationAirport: Yup.string().required("Destination Airport is required"),
    departureDateTime: Yup.string().required("Departure Date Time is required"),
    arrivalDateTime: Yup.string().required("Arrival Date Time is required"),
    price: Yup.number().required("Price is required"),
    availableSeats: Yup.number().required("Available Seats is required"),
  });

  // Function to show success toast
  const showSuccessToast = () => {
    toast.success("Flight created successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to show error toast
  const showErrorToast = (errorMessage) => {
    toast.error(`Error creating flight: ${errorMessage}`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const formik = useFormik({
    initialValues: {
      airline: "",
      flightNumber: "",
      departureAirport: "",
      destinationAirport: "",
      departureDateTime: "",
      arrivalDateTime: "",
      price: "",
      availableSeats: "",
    },
    validationSchema, // Pass the validation schema to useFormik
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await AxiosService.post("/flight/createflight", values);
        console.log("Flight created successfully:", response.data);
        showSuccessToast();
        resetForm();
      } catch (error) {
        console.error("Error creating flight:", error.message);
        showErrorToast(error.message);
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Create Flights</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* Airline Input */}
            <div className="mb-3">
              <label htmlFor="airline" className="form-label">
                Airline:
              </label>
              <input
                type="text"
                id="airline"
                name="airline"
                className={`form-control ${
                  formik.touched.airline && formik.errors.airline ? "is-invalid" : ""
                }`}
                value={formik.values.airline}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.airline && formik.errors.airline ? (
                <div className="invalid-feedback">{formik.errors.airline}</div>
              ) : null}
            </div>

            {/* Flight Number Input */}
            <div className="mb-3">
              <label htmlFor="flightNumber" className="form-label">
                Flight Number:
              </label>
              <input
                type="text"
                id="flightNumber"
                name="flightNumber"
                className={`form-control ${
                  formik.touched.flightNumber && formik.errors.flightNumber ? "is-invalid" : ""
                }`}
                value={formik.values.flightNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.flightNumber && formik.errors.flightNumber ? (
                <div className="invalid-feedback">{formik.errors.flightNumber}</div>
              ) : null}
            </div>

            {/* Departure Airport Input */}
            <div className="mb-3">
              <label htmlFor="departureAirport" className="form-label">
                Departure Airport:
              </label>
              <input
                type="text"
                id="departureAirport"
                name="departureAirport"
                className={`form-control ${
                  formik.touched.departureAirport && formik.errors.departureAirport
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.departureAirport}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.departureAirport && formik.errors.departureAirport ? (
                <div className="invalid-feedback">{formik.errors.departureAirport}</div>
              ) : null}
            </div>

            {/* Destination Airport Input */}
            <div className="mb-3">
              <label htmlFor="destinationAirport" className="form-label">
                Destination Airport:
              </label>
              <input
                type="text"
                id="destinationAirport"
                name="destinationAirport"
                className={`form-control ${
                  formik.touched.destinationAirport && formik.errors.destinationAirport
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.destinationAirport}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.destinationAirport && formik.errors.destinationAirport ? (
                <div className="invalid-feedback">{formik.errors.destinationAirport}</div>
              ) : null}
            </div>

            {/* Departure Date Time Input */}
            <div className="mb-3">
              <label htmlFor="departureDateTime" className="form-label">
                Departure Date Time:
              </label>
              <input
                type="datetime-local"
                id="departureDateTime"
                name="departureDateTime"
                className={`form-control ${
                  formik.touched.departureDateTime && formik.errors.departureDateTime
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.departureDateTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.departureDateTime && formik.errors.departureDateTime ? (
                <div className="invalid-feedback">{formik.errors.departureDateTime}</div>
              ) : null}
            </div>

            {/* Arrival Date Time Input */}
            <div className="mb-3">
              <label htmlFor="arrivalDateTime" className="form-label">
                Arrival Date Time:
              </label>
              <input
                type="datetime-local"
                id="arrivalDateTime"
                name="arrivalDateTime"
                className={`form-control ${
                  formik.touched.arrivalDateTime && formik.errors.arrivalDateTime
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.arrivalDateTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.arrivalDateTime && formik.errors.arrivalDateTime ? (
                <div className="invalid-feedback">{formik.errors.arrivalDateTime}</div>
              ) : null}
            </div>

            {/* Price Input */}
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className={`form-control ${
                  formik.touched.price && formik.errors.price ? "is-invalid" : ""
                }`}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="invalid-feedback">{formik.errors.price}</div>
              ) : null}
            </div>

            {/* Available Seats Input */}
            <div className="mb-3">
              <label htmlFor="availableSeats" className="form-label">
                Available Seats:
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                className={`form-control ${
                  formik.touched.availableSeats && formik.errors.availableSeats
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.availableSeats}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.availableSeats && formik.errors.availableSeats ? (
                <div className="invalid-feedback">{formik.errors.availableSeats}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>
              Create Flight
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFlightsForm;
