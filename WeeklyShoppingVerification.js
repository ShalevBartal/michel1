import React, { useState } from 'react';
import './WeeklyShoppingVerification.css'; // Ensure this CSS file exists and styles the form as needed

function WeeklyShoppingVerification() {
  const [shoppingInfo, setShoppingInfo] = useState({
    COORDINATOR_id: '',
    Date_of_purchase: '',
    category: '',
    product: '',
    quantity: '',
    price: '',
    deletePurchase: false, // Added for deletion
  });

  const handleChange = (e) => {
    const isCheckbox = e.target.type === 'checkbox';
    setShoppingInfo({
      ...shoppingInfo,
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value
    });
  };

  const validateForm = () => {
    // If deleting, skip most validations
    if (shoppingInfo.deletePurchase) return true;

    if (!/^\d{9}$/.test(shoppingInfo.COORDINATOR_id)) {
      alert('COORDINATOR ID must be exactly 9 digits.');
      return false;
    }

    const today = new Date();
    const purchaseDate = new Date(shoppingInfo.Date_of_purchase);
    if (purchaseDate > today) {
      alert('Date of Purchase cannot be in the future.');
      return false;
    }

    if (!shoppingInfo.product.trim()) {
      alert('Product cannot be empty.');
      return false;
    }

    if (!(Number(shoppingInfo.quantity) > 0)) {
      alert('Quantity must be a positive number.');
      return false;
    }

    if (!(Number(shoppingInfo.price) > 0)) {
      alert('Price must be a positive number.');
      return false;
    }

    return true; // All validations passed
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop the form submission if validation fails

    fetch('http://localhost:5000/verify-shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shoppingInfo),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      alert(shoppingInfo.deletePurchase ? 'Purchase deleted successfully.' : 'Shopping verified successfully.');
      setShoppingInfo({
        COORDINATOR_id: '',
        Date_of_purchase: '',
        category: '',
        product: '',
        quantity: '',
        price: '',
        deletePurchase: false
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error: Unable to verify shopping.');
    });
  };

  return (
    <div className="weekly-shopping-verification-container">
      <h2>Weekly Shopping Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="COORDINATOR_id"
          value={shoppingInfo.COORDINATOR_id}
          onChange={handleChange}
          placeholder="Coordinator ID"
          type="text"
          required
        />
        <input
          name="Date_of_purchase"
          value={shoppingInfo.Date_of_purchase}
          onChange={handleChange}
          placeholder="Date of Purchase"
          type="date"
          required
        />
        <select
          name="category"
          value={shoppingInfo.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="one-time">One-Time</option>
          <option value="permanent">Permanent</option>
          <option value="completion">Completion</option>
        </select>
        <input
          name="product"
          value={shoppingInfo.product}
          onChange={handleChange}
          placeholder="Product"
          type="text"
          required
        />
        <input
          name="quantity"
          value={shoppingInfo.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          type="number"
          required
        />
        <input
          name="price"
          value={shoppingInfo.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          step="0.01"
          required
        />
        <div>
          <input
            name="deletePurchase"
            type="checkbox"
            checked={shoppingInfo.deletePurchase}
            onChange={handleChange}
          />
          <label htmlFor="deletePurchase">Delete Purchase if needed</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WeeklyShoppingVerification;
