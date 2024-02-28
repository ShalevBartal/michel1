import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import AddColleague from './AddColleague';
import UpdateHousingStatus from './UpdateHousingStatus';
import ManageCoordinator from './ManageCoordinator';
import RemoveColleague from './RemoveColleague';
import MonthlyPaymentVerification from './MonthlyPaymentVerification';
import WeeklyShoppingVerification from './WeeklyShoppingVerification';
import ReportsTab from './ReportsTab';
import ManageColleagueTab from './ManageColleagueTab';
import OpenDebtReport from './OpenDebtReport';
import VacantRoomsReport from './VacantRoomsReport';
import PurchaseReport from './PurchaseReport';
import JoiningSoldiersReport from './JoiningSoldiersReport';
import LeavingsReport from './LeavingsReport';
import Login from './Login';
import HouseManagementTab from './HouseManagementTab';
import PieChartExample from './PieChartExample';
import DebtCancellation from './DebtCancellation';
import ExtraordinaryHousesBudget from './ExtraordinaryHousesBudget'; // Import the ExtraordinaryHousesBudget component

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <nav className="App-header">
              <ul className="App-nav">
                <li><Link to="/" className="App-link">Home</Link></li>
                <li><Link to="/manage-colleague" className="App-link">Manage Colleague</Link></li>
                <li><Link to="/house-management" className="App-link">House Management</Link></li>
                <li><Link to="/reports" className="App-link">Reports</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/manage-colleague" element={<ManageColleagueTab />} />
              <Route path="/house-management" element={<HouseManagementTab />} />
              <Route path="/reports" element={<ReportsTab />} />
              <Route path="/open-debt-report" element={<OpenDebtReport />} />
              <Route path="/vacant-rooms-report" element={<VacantRoomsReport />} />
              <Route path="/joining-soldiers-report" element={<JoiningSoldiersReport />} />
              <Route path="/leavings-report" element={
                user.role !== 'SeniorCoordinator' ? 
                  <LeavingsReport /> : 
                  <div className="error-message">You don't have the necessary permissions</div>
              } />
              <Route path="/purchase-report" element={
                user.role !== 'SeniorCoordinator' ? 
                  <PurchaseReport /> : 
                  <div className="error-message">You don't have the necessary permissions</div>
              } />
              <Route path="/add-or-update-colleague" element={<AddColleague />} />
              <Route path="/update-housing-status" element={<UpdateHousingStatus />} />
              {user.role !== 'SeniorCoordinator' && (
                <Route path="/manage-coordinator" element={<ManageCoordinator />} />
              )}
              <Route path="/remove-colleague" element={<RemoveColleague />} />
              <Route path="/monthly-payment-verification" element={<MonthlyPaymentVerification />} />
              <Route path="/weekly-shopping-verification" element={<WeeklyShoppingVerification />} />
              <Route path="/monitoring-report" element={<PieChartExample />} />
              <Route path="/debt-cancellation" element={<DebtCancellation />} />
              {/* Route for Extraordinary Houses (Budget) */}
              <Route path="/extraordinary-houses-budget" element={<ExtraordinaryHousesBudget />} />
            </Routes>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
