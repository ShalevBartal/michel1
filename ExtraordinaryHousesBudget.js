import React, { useState } from 'react';
import './ExtraordinaryHousesBudget.css'; // Ensure this CSS file exists and is correctly pathed

function ExtraordinaryHousesBudget() {
    const initialFormState = {
        fromDate: '',
        budget: ''
    };
    const [formInput, setFormInput] = useState(initialFormState);
    const [houseNames, setHouseNames] = useState('');

    const handleChange = (e) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/find-houses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formInput),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const namesString = data.names.join(', ');
            setHouseNames(namesString); // Update the state with the new house names
            alert(`Houses: ${namesString}`);
            setFormInput(initialFormState); // Reset the form input to initial state
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    };

    return (
        <div className="extraordinary-houses-budget-container">
            <h2>Extraordinary Houses (Budget)</h2>
            <form onSubmit={handleSubmit}>
                {/* Label for the "From Date" input */}
                <label htmlFor="fromDate">From Date:</label>
                <input
                    id="fromDate"
                    name="fromDate"
                    value={formInput.fromDate}
                    onChange={handleChange}
                    type="date"
                    required
                />
                <label htmlFor="budget">Budget:</label>
                <input
                    id="budget"
                    name="budget"
                    value={formInput.budget}
                    onChange={handleChange}
                    placeholder="Budget"
                    type="number"
                    required
                />
                <button type="submit">Find Houses</button>
            </form>
            {houseNames && <div><h3>Matching Houses:</h3><p>{houseNames}</p></div>}
        </div>
    );
}

export default ExtraordinaryHousesBudget;
