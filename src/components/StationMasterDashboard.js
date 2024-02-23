import React, { useState, useEffect } from 'react';
import TrainForm from './TrainForm';
import axios from 'axios'; // Import axios
import './styles.css';

const StationMasterDashboard = () => {
  const [trains, setTrains] = useState([]);
  const [editableTrain, setEditableTrain] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchTrains = () => {
    axios.get('http://localhost:3001/api/s-master/trains') // Updated URL
      .then(response => setTrains(response.data))
      .catch(error => console.error('Error fetching trains:', error));
  };

  useEffect(() => {
    // Fetch the list of trains when the component mounts
    fetchTrains();
  }, []);

  const handleEdit = (train) => {
    setEditableTrain({ ...train });
    setIsEditing(true);
  };

  const handleSave = () => {
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:5001/trains/${editableTrain._id}`
      : 'http://localhost:3001/api/trains';

    axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: editableTrain,
    })
      .then(() => {
        setIsEditing(false);
        setEditableTrain({});
        fetchTrains(); // Refresh the list after saving
      })
      .catch(error => console.error('Error saving train:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableTrain(prevTrain => ({
      ...prevTrain,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableTrain({});
  };

  const handleDelete = (trainId) => {
    axios.delete(`/api/trains/${trainId}`)
      .then(() => {
        fetchTrains(); // Refresh the list after deletion
      })
      .catch(error => console.error('Error deleting train:', error));
  };

  return (
    <div>
      <h2>Station Master Dashboard</h2>
      <TrainForm
        editableTrain={editableTrain}
        isEditing={isEditing}
        onInputChange={handleInputChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Platform</th>
            <th>Arrival Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train._id}>
              <td>{train.trainName}</td>
              <td>{train.platformNumber}</td>
              <td>{new Date(train.arrivalTime).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(train)}>Edit</button>
                <button onClick={() => handleDelete(train._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationMasterDashboard;
