import React from 'react';
import { Link } from 'react-router-dom';
import './HouseManagementTab.css'; // Ensure this is the correct path to your CSS file

function HouseManagementTab() {
  return (
    <div className="house-management-tab-container">
      <h1>House Management</h1>
      <ul className="house-management-list">
        <li><Link to="/manage-coordinator" className="house-management-link">Manage Coordinator</Link></li>
        <li><Link to="/monthly-payment-verification" className="house-management-link">Monthly Payment Verification</Link></li>
        <li><Link to="/weekly-shopping-verification" className="house-management-link">Weekly Shopping Verification</Link></li>
        <li><Link to="/debt-cancellation" className="house-management-link">Debt Cancellation</Link></li>
        {/* Add the link for Extraordinary Houses (Budget) */}
        <li><Link to="/extraordinary-houses-budget" className="house-management-link">Extraordinary Houses (Budget)</Link></li>
      </ul>
    </div>
  );
}

export default HouseManagementTab;
