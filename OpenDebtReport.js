import React, { useEffect, useState } from 'react';
import './OpenDebtReport.css';

function OpenDebtReport() {
  const [openDebts, setOpenDebts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/open-debt-report')
      .then(response => response.json())
      .then(data => setOpenDebts(data.data))
      .catch(error => console.error('Error fetching open debt data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleUntilDateChange = (e) => {
    setUntilDate(e.target.value);
  };

  // Filter based on search term and date range
  const filteredDebts = openDebts.filter(debt => {
    const debtDate = debt.payment_date ? new Date(debt.payment_date) : new Date();
    const fromDateValid = fromDate ? new Date(fromDate) : new Date('1900-01-01');
    const untilDateValid = untilDate ? new Date(untilDate) : new Date('2100-01-01');

    return (
      (debt.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       debt.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       debt.PhoneNumber.includes(searchTerm) ||
       debt.debt.toString().includes(searchTerm) ||
       debt.ColleagueID.toString().includes(searchTerm)) &&
      debtDate >= fromDateValid &&
      debtDate <= untilDateValid
    );
  });

  return (
    <div className="open-debt-report-container">
      <h2>Open Debt Report</h2>
      <div className="filters">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <label htmlFor="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={handleFromDateChange}
        />
        <label htmlFor="untilDate">Until Date:</label>
        <input
          type="date"
          id="untilDate"
          value={untilDate}
          onChange={handleUntilDateChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Colleague ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Debt</th>
            <th>Payment Date</th> {/* Assuming you have a payment_date field */}
          </tr>
        </thead>
        <tbody>
          {filteredDebts.map((debt, index) => (
            <tr key={index}>
              <td>{debt.ColleagueID}</td>
              <td>{debt.Name}</td>
              <td>{debt.Email}</td>
              <td>{debt.PhoneNumber}</td>
              <td>{debt.debt}</td>
              <td>{debt.payment_date}</td> {/* Display Payment Date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OpenDebtReport;
