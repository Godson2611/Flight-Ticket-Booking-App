// components/ResetPassword.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../utils/ApiService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPasswordSchema = Yup.object().shape({
  OTP: Yup.string().required('OTP is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{12,}$/, 'Make a strong password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className='ResetPassword'>
      <h2>Reset Password</h2>
      <Formik
        initialValues={{
          OTP: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await AxiosService.post(`/user/reset-password`, values);

            toast.success('Password changed successfully', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });

            navigate('/signin');

            resetForm && resetForm();
          } catch (error) {
            const errorMessage =
              error.response?.data.message || 'An error occurred';

            setErrors({ general: errorMessage });
            toast.error('Reset Password failed', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } finally {
            setSubmitting && setSubmitting(false);
          }
        }}
      >
        <Form>
          <div>
            <label>OTP:</label>
            <Field type='text' name='OTP' />
            <ErrorMessage name='OTP' component='div' style={{ color: 'red' }} />
          </div>

          <div>
            <label>Password:</label>
            <Field
              type={showPassword ? 'text' : 'password'}
              name='password'
            />
            <button
              type='button'
              onClick={() => handleTogglePassword('password')}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            <ErrorMessage
              name='password'
              component='div'
              style={{ color: 'red' }}
            />
          </div>

          <div>
            <label>Confirm Password:</label>
            <Field
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
            />
            <button
              type='button'
              onClick={() => handleTogglePassword('confirmPassword')}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
            <ErrorMessage
              name='confirmPassword'
              component='div'
              style={{ color: 'red' }}
            />
          </div>

          <button type='submit'>Submit</button>
          <p>
            Remember your password? <Link to='/signin'>Sign In here</Link>.
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPassword;
