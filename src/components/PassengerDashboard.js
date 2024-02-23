import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PassengerDashboard.css'; // Import the CSS file

const PassengerDashboard = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch the list of trains when the component mounts
    axios.get('http://localhost:3001/api/passenger/trains')
      .then(response => {
        console.log('Fetched data:', response.data);
        setTrains(response.data);
      })
      .catch(error => console.error('Error fetching trains:', error));
  }, []);

  return (
    <div>
      <h2>Passenger Dashboard</h2>
      <table className="passenger-table">
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Platform Number</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(train => (
            <tr key={train._id}>
              <td>{train.trainName}</td>
              <td>{train.platformNumber}</td>
              <td>{new Date(train.arrivalTime).toLocaleString()}</td>
              <td>{new Date(train.departureTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassengerDashboard;
