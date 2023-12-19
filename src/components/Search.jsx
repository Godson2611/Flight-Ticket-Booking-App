/** @format */

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import AxiosService from "../utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchSchema = Yup.object().shape({
  location: Yup.string().required("Required"),
  checkIn: Yup.string().required("Required"),
  checkOut: Yup.string().required("Required"),
});

const Search = () => {
  const navigate = useNavigate();
  return (
    <div id="Search" className='search container section'>
      <div className='sectionContainer grid'>
        <Formik
          initialValues={{
            location: "",
            checkIn: "",
            checkOut: "",
          }}
          validationSchema={SearchSchema}
          onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
            try {
              setSubmitting(true); // Set isSubmitting to true when the form is being submitted

              const response = await AxiosService.post(
                `/flight/searchflight`,
                values
              );

              if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/flights", {
                  state: { flights: response.data.flights },
                });
              } else {
                setErrors({
                  general: "An error occurred while processing the request",
                });
              }
            } catch (error) {
              console.error("Error during form submission:", error);
              navigate("/flights");
              setErrors({
                general: "An error occurred while processing the request",
              });
            } finally {
              setSubmitting(false); // Set isSubmitting to false when the form submission is complete
              resetForm();
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className='searchInputs flex'>
              <div className='singleInput flex'>
                <div className='iconDiv'>
                  <RiAccountPinCircleLine className='icon' />
                </div>
                <div className='texts'>
                  <h4>Location</h4>
                  <Field
                    type='text'
                    name='location'
                    placeholder='Where do you want to go?'
                  />
                  {errors.location && touched.location ? (
                    <div className='error'>{errors.location}</div>
                  ) : null}
                </div>
              </div>

              <div className='singleInput flex'>
                <div className='iconDiv'>
                  <RxCalendar className='icon' />
                </div>
                <div className='texts'>
                  <h4>Check In</h4>
                  <Field
                    type='text'
                    name='checkIn'
                    placeholder='Year-Month-Day'
                  />
                  {errors.checkIn && touched.checkIn ? (
                    <div className='error'>{errors.checkIn}</div>
                  ) : null}
                </div>
              </div>

              <div className='singleInput flex'>
                <div className='iconDiv'>
                  <RxCalendar className='icon' />
                </div>
                <div className='texts'>
                  <h4>Check Out</h4>
                  <Field
                    type='text'
                    name='checkOut'
                    placeholder='Year-Month-Day'
                  />
                  {errors.checkOut && touched.checkOut ? (
                    <div className='error'>{errors.checkOut}</div>
                  ) : null}
                </div>
              </div>

              <button type='submit' className='btn btnBlock flex' disabled={isSubmitting}>
                {isSubmitting ? "Searching..." : "Search Flight"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Search;
