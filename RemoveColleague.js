import React, { useState } from 'react';
import './RemoveColleague.css'; // Ensure the path to your CSS file is correct

function RemoveColleague() {
    const [removalInfo, setRemovalInfo] = useState({
        soldier_id: '',
        reasonForLeaving: '',
        dateOfLeaving: ''
    });
    const [isTidy, setIsTidy] = useState(false); // State for the tidy room checkbox

    const handleChange = (e) => {
        setRemovalInfo({ ...removalInfo, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setIsTidy(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate soldier_id is exactly 9 digits
        if (!/^\d{9}$/.test(removalInfo.soldier_id)) {
            alert('Soldier ID must be exactly 9 digits.');
            return;
        }

        // Ensure the tidy room checkbox is checked
        if (!isTidy) {
            alert('Please confirm that the soldier has tidied the room.');
            return;
        }

        fetch('http://localhost:5000/remove-colleague', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removalInfo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Colleague removed successfully. A message with the details of the removed soldier was sent to the senior coordinator and the coordinator of the associated house.');
            // Reset form and checkbox state
            setRemovalInfo({
                soldier_id: '',
                reasonForLeaving: '',
                dateOfLeaving: ''
            });
            setIsTidy(false); // Reset the checkbox
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    };

    return (
        <div className="remove-colleague-container">
            <h2>Remove Colleague</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="soldier_id"
                    value={removalInfo.soldier_id}
                    onChange={handleChange}
                    placeholder="Colleague ID"
                    type="text"
                    required
                />
                <textarea
                    name="reasonForLeaving"
                    value={removalInfo.reasonForLeaving}
                    onChange={handleChange}
                    placeholder="Reason for Leaving"
                    required
                />
                <input
                    name="dateOfLeaving"
                    value={removalInfo.dateOfLeaving}
                    onChange={handleChange}
                    placeholder="Date of Leaving"
                    type="date"
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isTidy}
                        onChange={handleCheckboxChange}
                    />
                    Did the soldier tidy the room and return the room key ?
                </label>
                <button type="submit" disabled={!isTidy}>Remove Colleague</button>
            </form>
        </div>
    );
}

export default RemoveColleague;
