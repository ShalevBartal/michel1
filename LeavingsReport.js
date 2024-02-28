import React, { useEffect, useState } from 'react';
import './LeavingsReport.css'; // Ensure this CSS file is properly linked

function LeavingsReport() {
  const [leavings, setLeavings] = useState([]);
  const [filteredLeavings, setFilteredLeavings] = useState([]);
  const [dateOfLeavingFromFilter, setDateOfLeavingFromFilter] = useState('');
  const [dateOfLeavingUntilFilter, setDateOfLeavingUntilFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/leavings') // Replace with your actual backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch leavings data.');
        }
        return response.json();
      })
      .then(data => {
        setLeavings(data.data);
        setFilteredLeavings(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const dateFiltered = leavings.filter(leave => {
      const leaveDate = leave.date_of_leaving ? new Date(leave.date_of_leaving) : null;
      const filterFromDate = dateOfLeavingFromFilter ? new Date(dateOfLeavingFromFilter) : null;
      const filterUntilDate = dateOfLeavingUntilFilter ? new Date(dateOfLeavingUntilFilter) : null;
      
      return (
        (filterFromDate ? leaveDate >= filterFromDate : true) &&
        (filterUntilDate ? leaveDate <= filterUntilDate : true)
      );
    });

    const searchFiltered = dateFiltered.filter(leave =>
      Object.keys(leave).some(key =>
        leave[key] != null ? leave[key].toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
    );

    setFilteredLeavings(searchFiltered);
  }, [dateOfLeavingFromFilter, dateOfLeavingUntilFilter, searchTerm, leavings]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="leavings-report-container">
      <h2>Leavings Report</h2>
      <div className="filters">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label htmlFor="dateOfLeavingFrom">Date of Leaving From:</label>
        <input
          type="date"
          id="dateOfLeavingFrom"
          value={dateOfLeavingFromFilter}
          onChange={(e) => setDateOfLeavingFromFilter(e.target.value)}
        />
        <label htmlFor="dateOfLeavingUntil">Date of Leaving Until:</label>
        <input
          type="date"
          id="dateOfLeavingUntil"
          value={dateOfLeavingUntilFilter}
          onChange={(e) => setDateOfLeavingUntilFilter(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Soldier ID</th>
            <th>Reason for Leaving</th>
            <th>Date of Leaving</th>
            <th>Last Room Number</th> {/* Added this line */}
          </tr>
        </thead>
        <tbody>
          {filteredLeavings.map((leave, index) => (
            <tr key={index}>
              <td>{leave.soldier_id}</td>
              <td>{leave.reason_for_leaving}</td>
              <td>{leave.date_of_leaving}</td>
              <td>{leave.Last_room_number}</td> {/* Added this line */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeavingsReport;
