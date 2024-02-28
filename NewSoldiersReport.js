import React, { useState, useEffect } from 'react';
import './NewSoldiersReport.css';

function NewSoldiersReport() {
  const [joinDate, setJoinDate] = useState('');
  const [soldiers, setSoldiers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (joinDate) {
      setLoading(true);
      const url = `http://localhost:5000/new-soldiers?joinDate=${joinDate}`;
      fetch(url)
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
    }
  }, [joinDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="new-soldiers-report-container">
      <h2>New Soldiers Report</h2>
      <label>
        Join Date:
        <input 
          type="date" 
          value={joinDate} 
          onChange={e => setJoinDate(e.target.value)} 
        />
      </label>

      <table>
        <thead>
          <tr>
            <th>ColleagueID</th>
            <th>Name</th>
            <th>JoinDate</th>
            {/* Add other headers as needed */}
          </tr>
        </thead>
        <tbody>
          {soldiers.map((soldier, index) => (
            <tr key={index}>
              <td>{soldier.ColleagueID}</td>
              <td>{soldier.Name}</td>
              <td>{soldier.JoinDate}</td>
              {/* Add other fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewSoldiersReport;
