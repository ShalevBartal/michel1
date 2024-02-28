import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './VacantRoomsReport.css';

function VacantRoomsReport() {
  const [vacantRooms, setVacantRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetch('http://localhost:5000/vacant-rooms-report') // Adjust this to your actual endpoint
      .then(response => response.json())
      .then(data => setVacantRooms(data.data))
      .catch(error => console.error('Error fetching vacant rooms data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRooms = vacantRooms.filter(room =>
    room.house_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.COORDINATOR_id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.room_number.toString().includes(searchTerm) ||
    room.available_beds.toString().includes(searchTerm)
  );

  return (
    <div className="vacant-rooms-report-container">
      <h2>Vacant Rooms Report</h2>
      {/* Button to navigate to Update Housing Status page, now at the top */}
      <button className="navigate-button" onClick={() => navigate('/update-housing-status')}>
        Go to Update Housing Status
      </button>
      <input
        type="text"
        placeholder="Search in report..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table>
        <thead>
          <tr>
            <th>House ID</th>
            <th>Coordinator ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Room Number</th>
            <th>Available Beds</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room, index) => (
            <tr key={index}>
              <td>{room.house_id}</td>
              <td>{room.COORDINATOR_id}</td>
              <td>{room.name}</td>
              <td>{room.address}</td>
              <td>{room.room_number}</td>
              <td>{room.available_beds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VacantRoomsReport;
