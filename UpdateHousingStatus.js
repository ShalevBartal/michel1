import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateHousingStatus.css'; // Make sure the path matches your CSS file's location
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import UpdateIcon from '@mui/icons-material/Update';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function UpdateHousingStatus() {
    const [updateInfo, setUpdateInfo] = useState({
        id: '',
        roomNumber: '',
        status: '',
        joinDate: null // Adjusted for DatePicker component
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUpdateInfo({ ...updateInfo, [e.target.name]: e.target.value });
    };

    const handleDateChange = (newValue) => {
        setUpdateInfo({ ...updateInfo, joinDate: newValue });
    };

    const validateForm = () => {
        if (!/^\d{9}$/.test(updateInfo.id)) {
            alert('Soldier ID must be exactly 9 digits.');
            return false;
        }
        if (!/^[1-9]\d?$/.test(updateInfo.roomNumber)) {
            alert('Room Number must be at most 2 digits and cannot be 0.');
            return false;
        }
        if (updateInfo.status !== "Activated") {
            alert('Status must be "Activated".');
            return false;
        }
        if (!updateInfo.joinDate) {
            alert('Join Date must be filled out.');
            return false;
        }
        return true; // Validation passed
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Stop the submission if validation fails

        fetch('http://localhost:5000/update-housing-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateInfo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Housing status updated successfully. A message was sent to the coordinator of the associated house and to the soldier.');
            setUpdateInfo({
                id: '',
                roomNumber: '',
                status: '',
                joinDate: null // Resetting the date
            });
            navigate('/'); // Optionally navigate to home or another page
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    };

    return (
        <div className="update-housing-status-container">
            <h2>Update Housing Status - Soldier <UpdateIcon style={{ color: '#9c27b0' }} /></h2>
            <form onSubmit={handleSubmit}>
                <TextField
                  name="id"
                  value={updateInfo.id}
                  onChange={handleChange}
                  placeholder="Soldier ID"
                  type="text"
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <IconButton>
                        <HomeIcon style={{ color: '#4caf50' }} />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  name="roomNumber"
                  value={updateInfo.roomNumber}
                  onChange={handleChange}
                  placeholder="Room Number"
                  type="text"
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <IconButton>
                        <PaymentIcon style={{ color: '#2196f3' }} />
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  name="status"
                  value={updateInfo.status}
                  onChange={handleChange}
                  placeholder="Status"
                  type="text"
                  required
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <IconButton>
                        <RemoveCircleOutlineIcon style={{ color: '#f44336' }} />
                      </IconButton>
                    ),
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="joinDate"
                    label="Join Date"
                    value={updateInfo.joinDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </LocalizationProvider>
                <button type="submit" className="submit-button" style={{ color: '#9c27b0' }}><UpdateIcon /> Update Status</button>
            </form>
            <div className="navigation-buttons">
                <button type="button" onClick={() => navigate('/')} className="nav-button"><HomeIcon style={{ color: '#4caf50' }} /> Return to Home</button>
                <button type="button" onClick={() => navigate('/remove-colleague')} className="nav-button"><RemoveCircleOutlineIcon style={{ color: '#f44336' }} /> Go to Remove Colleague</button>
                <button type="button" onClick={() => navigate('/monthly-payment-verification')} className="nav-button"><PaymentIcon style={{ color: '#2196f3' }} /> Go to Monthly Payment Verification</button>
            </div>
        </div>
    );
}

export default UpdateHousingStatus;
