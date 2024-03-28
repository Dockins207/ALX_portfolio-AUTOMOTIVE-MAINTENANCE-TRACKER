import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/maintenance')
      .then(response => {
        setMaintenanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching maintenance records:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/maintenance', formData)
      .then(() => {
        alert('Maintenance record added successfully');
        setFormData({});
      })
      .catch(error => {
        console.error('Error adding maintenance record:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="App">
      <h1>Automotive Maintenance Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" name="description" value={formData.description || ''} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={formData.date || ''} onChange={handleChange} />
        </label>
        <button type="submit">Add Maintenance Record</button>
      </form>
      <h2>Maintenance Records</h2>
      <ul>
        {maintenanceRecords.map(record => (
          <li key={record._id}>{record.description} - {record.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

