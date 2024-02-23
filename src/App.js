import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PassengerDashboard from './components/PassengerDashboard';
import StationMasterDashboard from './components/StationMasterDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/station-master" element={<StationMasterDashboard />} />
      </Routes>

    </Router>
  );
};

export default App;