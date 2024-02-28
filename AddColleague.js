import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddColleague.css';

function AddColleague() {
    const [colleague, setColleague] = useState({
        ColleagueID: '',
        Name: '',
        Email: '',
        PhoneNumber: '',
        EmergencyContact: '',
        Address: '',
        Sensitivity: '',
        roomNumber: '',
        status: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setColleague({ ...colleague, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation logic
        if (!/^\d{9}$/.test(colleague.ColleagueID)) {
            alert('Colleague ID must be exactly 9 digits.');
            return;
        }

        if (!/.+@.+/.test(colleague.Email)) {
            alert('Email must include an @ symbol.');
            return;
        }

        if (!/^\d{10}$/.test(colleague.PhoneNumber)) {
            alert('Phone Number must be exactly 10 digits.');
            return;
        }

        if (!/^\d{10}$/.test(colleague.EmergencyContact)) {
            alert('Emergency Contact must be exactly 10 digits.');
            return;
        }

        if (!/^\d{1,2}$/.test(colleague.roomNumber)) {
            alert('Room Number must be at most 2 digits.');
            return;
        }

        if (!["N", "Activated"].includes(colleague.status)) {
            alert('Status must be either "N" or "Activated".');
            return;
        }

        fetch('http://localhost:5000/add-colleague', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(colleague),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('The details were accepted successfully. A message has been sent to the new colleague.');
            setColleague({
                ColleagueID: '',
                Name: '',
                Email: '',
                PhoneNumber: '',
                EmergencyContact: '',
                Address: '',
                Sensitivity: '',
                roomNumber: '',
                status: ''
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    };

    return (
        <div className="add-colleague-layout">
            <div className="instruction-container">
                <img src="/addCollegueScreenExample.png" alt="Add Colleague Example" className="instruction-image" />
            </div>
            <div className="add-colleague-container">
                <h2>Add or Update Colleague Details</h2>
                <form onSubmit={handleSubmit}>
                    <input name="ColleagueID" value={colleague.ColleagueID} onChange={handleChange} placeholder="Colleague ID" type="text" required />
                    <input name="Name" value={colleague.Name} onChange={handleChange} placeholder="Name" type="text" required />
                    <input name="Email" value={colleague.Email} onChange={handleChange} placeholder="Email" type="email" required />
                    <input name="PhoneNumber" value={colleague.PhoneNumber} onChange={handleChange} placeholder="Phone Number" type="tel" required />
                    <input name="EmergencyContact" value={colleague.EmergencyContact} onChange={handleChange} placeholder="Emergency Contact" type="tel" required />
                    <input name="Address" value={colleague.Address} onChange={handleChange} placeholder="Address" type="text" required />
                    <input name="Sensitivity" value={colleague.Sensitivity} onChange={handleChange} placeholder="Sensitivity" type="text" />
                    <input name="roomNumber" value={colleague.roomNumber} onChange={handleChange} placeholder="Room Number" type="text" />
                    <input name="status" value={colleague.status} onChange={handleChange} placeholder="Status" type="text" />
                    <button type="submit">Submit</button>
                </form>
                <div className="navigation-buttons">
                    <button type="button" onClick={() => navigate('/update-housing-status')} className="navigate-button">Go to Update Housing Status</button>
                    <button type="button" onClick={() => navigate('/vacant-rooms-report')} className="navigate-button">Go to Vacant Rooms Report</button>
                </div>
            </div>
        </div>
    );
}

export default AddColleague;
