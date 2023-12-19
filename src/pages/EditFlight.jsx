/** @format */

// Import necessary dependencies
import React, { useState, useEffect } from "react";
import AxiosService from "../utils/ApiService";
import { Button, Modal, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFlight = () => {
  const [flights, setFlights] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  const openModal = (flight) => {
    setCurrentFlight(flight);
    setFormData(flight);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getAllFlights = async () => {
    try {
      const response = await AxiosService.get("/flight/allflights");
      setFlights(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching flights:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const showSuccessToast = () => {
    toast.success("Flight updated successfully!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (errorMessage) => {
    toast.error(`Error updating flight: ${errorMessage}`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleEdit = (flight) => {
    openModal(flight);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosService.delete(`/flight/deleteflight/${id}`);
      setFlights(flights.filter((flight) => flight._id !== id));
      showSuccessToast();
    } catch (error) {
      console.error("Error deleting flight:", error);
      showErrorToast(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AxiosService.put(
        `/flight/updateflight/${currentFlight._id}`,
        formData
      );
      closeModal();
      setLoading(true); // Set loading to true before fetching updated data
      await getAllFlights(); // Refresh the list of flights
      showSuccessToast();
    } catch (error) {
      console.error("Error updating flight:", error);
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    getAllFlights();
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Sidebar />
        <div className='col'>
          <div className='d-sm-flex align-items-center justify-content-between mb-4'>
            <h1 className='h3 mb-0 text-gray-800'>Edit Flight</h1>
          </div>

          {/* Display the loading spinner while fetching data */}
          {loading && <p>Loading...</p>}

          {/* Display the list of flights once loading is false */}
          {!loading && (
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight, key) => (
                  <tr key={key}>
                    <td>{flight._id}</td>
                    <td>{flight.airline}</td>
                    <td>
                      <Button
                        variant='primary'
                        onClick={() => handleEdit(flight)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        onClick={() => handleDelete(flight._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Edit Flight Modal */}
          <Modal show={modalIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Flight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Airline</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter airline'
                    value={formData.airline || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, airline: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Flight Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter flight number'
                    value={formData.flightNumber || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, flightNumber: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Departure Airport</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter departure airport'
                    value={formData.departureAirport || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departureAirport: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Destination Airport</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter destination airport'
                    value={formData.destinationAirport || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        destinationAirport: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Departure Date Time</Form.Label>
                  <Form.Control
                    type='datetime-local'
                    placeholder='Enter departure date time'
                    value={formData.departureDateTime || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        departureDateTime: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Arrival Date Time</Form.Label>
                  <Form.Control
                    type='datetime-local'
                    placeholder='Enter arrival date time'
                    value={formData.arrivalDateTime || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        arrivalDateTime: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Available Seats</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter available seats'
                    value={formData.availableSeats || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableSeats: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Booked Seats</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter booked seats'
                    value={formData.bookedSeats || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, bookedSeats: e.target.value })
                    }
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EditFlight;
