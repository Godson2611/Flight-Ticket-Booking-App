import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AxiosService from "../utils/ApiService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='SignIn'>
      <h2>Sign In</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            const response = await AxiosService.post(`/user/signin`, values);

            if (response.data.userData && response.data.userData.role === 'admin') {
              navigate("/admin");
            } else {
              navigate("/home");
            }

            toast.success(response.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT,
            });

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem(
              "userData",
              JSON.stringify(response.data.userData)
            );
            setUserData(response.data.userData);
            resetForm && resetForm();
          } catch (error) {
            const errorMessage =
              error.response?.data.message || "An error occurred";

            setErrors({ general: errorMessage });
            toast.error("Signin failed", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } finally {
            setSubmitting && setSubmitting(false);
          }
        }}
      >
        <Form>
          <div>
            <label>Email:</label>
            <Field type='email' name='email' />
            <ErrorMessage
              name='email'
              component='div'
              style={{ color: "red" }}
            />
          </div>

          <div>
            <label>Password:</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              name='password'
            />
            <div className="checkbox">
              <input
                type='checkbox'
                id='showPassword'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor='showPassword'>
                {showPassword ? "Hide Password" : "Show Password"}
              </label>
            </div>
            <ErrorMessage
              name='password'
              component='div'
              style={{ color: "red", marginTop: "5px" }}
            />
          </div>

          <button type='submit'>Sign In</button>
          <p>
            Not registered yet? <Link to='/signup'>Register here</Link>.
          </p>

          <p>
            Forgot your password?
            <Link to='/forgot-password'>Reset it here.</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default SignIn;
