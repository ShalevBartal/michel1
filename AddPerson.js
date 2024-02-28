import React, { useState } from 'react';

function AddPerson() {
  const [newPerson, setNewPerson] = useState({
    Address: '',
    City: '',
    FirstName: '',
    LastName: '',
    PersonID: ''
  });

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/add-person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setNewPerson({
        Address: '',
        City: '',
        FirstName: '',
        LastName: '',
        PersonID: ''
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h2>Add a Person</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="PersonID"
          value={newPerson.PersonID}
          onChange={handleChange}
          placeholder="Person ID"
          type="number"
        />
        <input
          name="LastName"
          value={newPerson.LastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="FirstName"
          value={newPerson.FirstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="Address"
          value={newPerson.Address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          name="City"
          value={newPerson.City}
          onChange={handleChange}
          placeholder="City"
        />
        <button type="submit">Add Person</button>
      </form>
    </div>
  );
}

export default AddPerson;
