import React from 'react';
import Sidebar from '../components/Sidebar';

const Admin = () => {
  return (
    <div className='admin'>
      <div className='row'>
        <Sidebar />
        <div className='col content'>
          <h1>Welcome to Admin Dashboard</h1>

          <p>
            As an admin, you have the privilege to manage flights and user data.
          </p>

          <h2>Flight Management</h2>

          <p>
            You can perform the following actions related to flights:
          </p>

          <ul>
            <li>Create new flights</li>
            <li>Edit existing flight details</li>
            <li>Delete flights from the system</li>
          </ul>

          <h2>User Data Management</h2>

          <p>
            Additionally, you have the ability to edit user information and profiles.
          </p>

          <p>
            Explore the sidebar for navigation options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
