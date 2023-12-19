import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import AxiosService from '../utils/ApiService';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const UpdateUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllUsers = async () => {
    try {
      const response = await AxiosService.get('/user/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    status: Yup.string().required('Status is required'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      role: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await AxiosService.put(`user/edituser/${selectedUser._id}`, values);
        getAllUsers();
        handleCloseModal();
        toast.success('User updated successfully', { position: 'bottom-right' });
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Error updating user', { position: 'bottom-right' });
      }
    },
  });

  const handleShowModal = (user) => {
    setSelectedUser(user);
    formik.setValues(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleDeleteUser = async (user) => {
    try {
      await AxiosService.delete(`/user/deleteuser/${user._id}`);
      getAllUsers();
      toast.success('User deleted successfully', { position: 'bottom-right' });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user', { position: 'bottom-right' });
    }
  };

  return (
    <div className='allUsers'>
      <div className='row'>
        <Sidebar />
        <div className='col content'>
          <h1>Welcome to update users</h1>
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item key={user._id} className='d-flex justify-content-between align-items-center'>
                {user.firstName} {user.lastName} - {user.email}
                <div>
                  <Button variant='primary' onClick={() => handleShowModal(user)}>
                    Edit
                  </Button>
                  <Button variant='danger' onClick={() => handleDeleteUser(user)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
              <button className='custom-close-btn' onClick={handleCloseModal}>
                &times;
              </button>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type='text'
                    id='firstName'
                    name='firstName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    isInvalid={formik.touched.firstName && formik.errors.firstName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type='text'
                    id='lastName'
                    name='lastName'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    isInvalid={formik.touched.lastName && formik.errors.lastName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Status:</Form.Label>
                  <Form.Control
                    type='text'
                    id='status'
                    name='status'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.status}
                    isInvalid={formik.touched.status && formik.errors.status}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.status}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                    type='text'
                    id='role'
                    name='role'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                    isInvalid={formik.touched.role && formik.errors.role}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.role}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Update User
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UpdateUsers;
