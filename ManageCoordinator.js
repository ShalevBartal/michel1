import React, { useState } from 'react';
import './ManageCoordinator.css'; // Ensure the path to your CSS file is correct

function ManageCoordinator() {
    const [coordinator, setCoordinator] = useState({
        id: '',
        house_id: '',
        name: '',
        phoneNumber: '',
        email: '',
        operation: 'add' // Default operation
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCoordinator({ ...coordinator, [name]: value });
    };

    const handleOperationChange = (e) => {
        setCoordinator({ ...coordinator, operation: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation remains the same
        if (!/^\d{9}$/.test(coordinator.id)) {
            alert('Coordinator ID must be exactly 9 digits.');
            return;
        }

        // Additional validation based on the operation
        if (coordinator.operation !== 'delete') {
            if (!["1", "2", "3"].includes(coordinator.house_id)) {
                alert('House ID must be 1, 2, or 3.');
                return;
            }

            if (!/^\d{10}$/.test(coordinator.phoneNumber)) {
                alert('Phone Number must be exactly 10 digits.');
                return;
            }

            if (!/@/.test(coordinator.email)) {
                alert('Email must include an "@" symbol.');
                return;
            }
        }

        fetch('http://localhost:5000/manage-coordinator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(coordinator),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert(`Coordinator ${coordinator.operation}d successfully.`);
            setCoordinator({
                id: '',
                house_id: '',
                name: '',
                phoneNumber: '',
                email: '',
                operation: 'add'
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    };

    return (
        <div className="manage-coordinator-container">
            <h2>Manage Coordinator</h2>
            <form onSubmit={handleSubmit}>
                <input name="id" value={coordinator.id} onChange={handleChange} placeholder="Coordinator ID" type="text" required />
                <input name="house_id" value={coordinator.house_id} onChange={handleChange} placeholder="House ID" type="text" required />
                <input name="name" value={coordinator.name} onChange={handleChange} placeholder="Name" type="text" required />
                <input name="phoneNumber" value={coordinator.phoneNumber} onChange={handleChange} placeholder="Phone Number" type="tel" required />
                <input name="email" value={coordinator.email} onChange={handleChange} placeholder="Email" type="email" required />

                <div>
                    <input type="radio" id="add" name="operation" value="add" checked={coordinator.operation === 'add'} onChange={handleOperationChange} />
                    <label htmlFor="add">Add</label>
                    <input type="radio" id="update" name="operation" value="update" checked={coordinator.operation === 'update'} onChange={handleOperationChange} />
                    <label htmlFor="update">Update</label>
                    <input type="radio" id="delete" name="operation" value="delete" checked={coordinator.operation === 'delete'} onChange={handleOperationChange} />
                    <label htmlFor="delete">Delete</label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ManageCoordinator;
