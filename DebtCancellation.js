import React, { useState } from 'react';
import './DebtCancellation.css'; // Adjust the path if your file structure is different

function DebtCancellation() {
  const [formData, setFormData] = useState({
    soldierId: '',
    dateOfDebt: '',
    confirmationChecked: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const { soldierId, dateOfDebt, confirmationChecked } = formData;

    // Validate Soldier ID to be exactly 9 digits
    if (!/^\d{9}$/.test(soldierId)) {
      alert('Soldier ID must be exactly 9 digits.');
      return false;
    }

    // Validate Date of Debt is not in the future
    const today = new Date();
    const inputDate = new Date(dateOfDebt);
    if (inputDate > today) {
      alert('Date of Debt cannot be in the future.');
      return false;
    }

    // Validate checkbox is checked
    if (!confirmationChecked) {
      alert('Please confirm the debt payment entry.');
      return false;
    }

    return true; // Form is valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    // Proceed with submitting the form data to the backend
    console.log(formData); // Replace this with your fetch call to the backend

    // Reset form after successful submission
    setFormData({
      soldierId: '',
      dateOfDebt: '',
      confirmationChecked: false,
    });
  };

  return (
    <div className="debt-cancellation-form">
      <h2>Debt Cancellation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Soldier ID:</label>
          <input type="text" name="soldierId" value={formData.soldierId} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Debt:</label>
          <input type="date" name="dateOfDebt" value={formData.dateOfDebt} onChange={handleChange} required />
        </div>
        <div>
          <label>
            <input type="checkbox" name="confirmationChecked" checked={formData.confirmationChecked} onChange={handleChange} />
            You are required to enter the debt payment in the payment verification before deleting the debt, did you do that?
          </label>
        </div>
        <button type="submit" disabled={!formData.confirmationChecked}>Submit</button>
      </form>
    </div>
  );
}

export default DebtCancellation;
