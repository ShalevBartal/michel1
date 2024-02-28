import React from 'react';
import { Link } from 'react-router-dom';
import './ReportsTab.css'; // Make sure this path matches your CSS file for ReportsTab

function ReportsTab() {
  return (
    <div className="reports-tab-container">
      <h1>Reports</h1>
      <ul className="reports-list">
        <li><Link to="/open-debt-report" className="report-link">Open Debt Report</Link></li>
        <li><Link to="/vacant-rooms-report" className="report-link">Vacant Rooms Report</Link></li>
        <li><Link to="/purchase-report" className="report-link">Purchase Report</Link></li>
        <li><Link to="/joining-soldiers-report" className="report-link">Joining Soldiers Report</Link></li>
        <li><Link to="/leavings-report" className="report-link">Leavings Report</Link></li>
        {/* Add the link to the PieChartExample */}
        <li><Link to="/monitoring-report" className="report-link">Monitoring Report</Link></li>
      </ul>
    </div>
  );
}

export default ReportsTab;
