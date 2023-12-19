/** @format */

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AxiosService from "../utils/ApiService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string().max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Make it More Strong"
    ),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='SignUp'>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const response = await AxiosService.post("/user/signup", values);

            if (!response.data || !response.data.message) {
              throw new Error("An error occurred");
            }
            navigate("/signin");
            resetForm();

            toast.success("Sign Up successful");
          } catch (error) {
            setErrors({ general: error.message });
            toast.error("Sign Up failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label>First Name:</label>
              <Field type='text' name='firstName' />
              {errors.firstName && touched.firstName && (
                <p style={{ color: "red" }}>{errors.firstName}</p>
              )}
            </div>

            <div>
              <label>Last Name:</label>
              <Field type='text' name='lastName' />
              {errors.lastName && touched.lastName && (
                <p style={{ color: "red" }}>{errors.lastName}</p>
              )}
            </div>

            <div>
              <label>Email:</label>
              <Field type='email' name='email' />
              {errors.email && touched.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
            </div>

            <div>
              <label>Password:</label>
              <Field
                type={showPassword ? "text" : "password"}
                name='password'
              />
              {errors.password && touched.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>

            <div className='checkbox'>
              <input
                type='checkbox'
                id='showPassword'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor='showPassword'>{showPassword ? "Hide Password" : "Show Password"}</label>
            </div>

            <button type='submit'>Sign Up</button>

            <p>
              Already have an account? <Link to='/signin'>Sign In</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
