import React from 'react';
import { Link } from 'react-router-dom';
import './ManageColleagueTab.css'; // Make sure to create this CSS file with your desired styles

function ManageColleagueTab() {
  return (
    <div className="manage-colleague-tab-container">
      <h1>Manage Colleague</h1>
      <ul className="manage-colleague-list">
        <li><Link to="/add-or-update-colleague" className="manage-link">Add/Update Colleague</Link></li>
        <li><Link to="/update-housing-status" className="manage-link">Update Housing Status</Link></li>
        <li><Link to="/remove-colleague" className="manage-link">Remove Colleague</Link></li>
      </ul>
    </div>
  );
}

export default ManageColleagueTab;
