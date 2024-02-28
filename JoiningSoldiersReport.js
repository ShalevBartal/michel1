import React, { useEffect, useState } from 'react';
import './JoiningSoldiersReport.css';

function JoiningSoldiersReport() {
  const [soldiers, setSoldiers] = useState([]);
  const [filteredSoldiers, setFilteredSoldiers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [joinDateFromFilter, setJoinDateFromFilter] = useState('');
  const [joinDateUntilFilter, setJoinDateUntilFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/joining-soldiers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch soldiers.');
        }
        return response.json();
      })
      .then(data => {
        setSoldiers(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = soldiers.filter(soldier => {
      const soldierJoinDate = soldier.JoinDate ? new Date(soldier.JoinDate) : null;
      const filterFromDate = joinDateFromFilter ? new Date(joinDateFromFilter) : null;
      const filterUntilDate = joinDateUntilFilter ? new Date(joinDateUntilFilter) : null;
      
      const dateCondition = (!filterFromDate || soldierJoinDate >= filterFromDate) &&
                            (!filterUntilDate || soldierJoinDate <= filterUntilDate);
      
      const searchCondition = Object.values(soldier).some(value => 
        value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      );

      return dateCondition && searchCondition;
    });

    setFilteredSoldiers(filtered);
  }, [joinDateFromFilter, joinDateUntilFilter, searchTerm, soldiers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="joining-soldiers-report-container">
      <h2>Joining Soldiers Report</h2>
      <div className="filters">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="joinDateFrom">Join Date From:</label>
        <input
          type="date"
          id="joinDateFrom"
          value={joinDateFromFilter}
          onChange={(e) => setJoinDateFromFilter(e.target.value)}
        />
        <label htmlFor="joinDateUntil">Join Date Until:</label>
        <input
          type="date"
          id="joinDateUntil"
          value={joinDateUntilFilter}
          onChange={(e) => setJoinDateUntilFilter(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ColleagueID</th>
            <th>Name</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>EmergencyContact</th>
            <th>Address</th>
            <th>Sensitivity</th>
            <th>RoomNumber</th>
            <th>Status</th>
            <th>JoinDate</th>
          </tr>
        </thead>
        <tbody>
          {filteredSoldiers.map((soldier, index) => (
            <tr key={index}>
              <td>{soldier.ColleagueID}</td>
              <td>{soldier.Name}</td>
              <td>{soldier.Email}</td>
              <td>{soldier.PhoneNumber}</td>
              <td>{soldier.EmergencyContact}</td>
              <td>{soldier.Address}</td>
              <td>{soldier.Sensitivity}</td>
              <td>{soldier.roomNumber || ''}</td> {/* Ensure fallback for potentially null values */}
              <td>{soldier.status || ''}</td> {/* Ensure fallback for potentially null values */}
              <td>{soldier.JoinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JoiningSoldiersReport;
