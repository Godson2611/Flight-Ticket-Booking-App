import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import AxiosService from "../utils/ApiService";
import { useUserContext } from "../context/UserContext";
import { toast } from 'react-toastify';

const Profile = () => {
  const { userData, setUserData } = useUserContext();
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userData || !userData._id) {
          return;
        }

        const response = await AxiosService.get(`/user/${userData._id}`);
        const userProfileData = response.data.user;
        setUserData(() => ({
          ...userProfileData,
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userData, setUserData]);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUserData({ ...userData });
  };

  const handleSaveClick = async () => {
    try {
      await AxiosService.put(`/user/${userData._id}`, editedUserData);

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...editedUserData,
      }));

      setEditMode(false);
      toast.success('Profile updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigateToHome = () => {
    navigate("/"); // Redirect to the home page using useNavigate
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { _id, firstName, lastName, email, role } = editMode ? editedUserData : userData;

  return (
    <div className='profile'>
      <h1>Welcome to the User Profile</h1>
      <p>
        <strong>User ID:</strong> {_id}
      </p>
      <p>
        <strong>First Name:</strong>{" "}
        {editMode ? (
          <input type="text" name="firstName" value={editedUserData.firstName} onChange={handleInputChange} />
        ) : (
          firstName
        )}
      </p>
      <p>
        <strong>Last Name:</strong>{" "}
        {editMode ? (
          <input type="text" name="lastName" value={editedUserData.lastName} onChange={handleInputChange} />
        ) : (
          lastName
        )}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>

      {editMode ? (
        <>
          <button className="save" onClick={handleSaveClick}>Save</button>
          <button className="cancel" onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <button className="edit" onClick={handleEditClick}>Edit</button>
          <button className="back" onClick={navigateToHome}>Back to Home</button>
        </>
      )}
    </div>
  );
};

export default Profile;
