import React, { useState, useEffect } from 'react';

function ViewPeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/execute-query')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPeople(data.data); // Make sure 'data' is the correct key
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to load people');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>People List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            {person.FirstName} {person.LastName} - {person.Address}, {person.City}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewPeople;
