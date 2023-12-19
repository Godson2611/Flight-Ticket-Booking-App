// components/ForgotPassword.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AxiosService from '../utils/ApiService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className='ForgotPassword'>
      <h2>Forgot Password</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          try {
            await AxiosService.post(`/user/forgot-password`, values);

            toast.success('Password reset instructions sent to your email', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });

            navigate('/reset-password');

            resetForm && resetForm();
          } catch (error) {
            const errorMessage =
              error.response?.data.message || 'An error occurred';

            setErrors({ general: errorMessage });
            toast.error('Forgot Password failed', {
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
              style={{ color: 'red' }}
            />
          </div>

          <button type='submit'>Reset Password</button>
          <p>
            Remember your password? <Link to='/signin'>Sign In here</Link>.
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
