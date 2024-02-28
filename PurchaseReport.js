import React, { useEffect, useState } from 'react';
import './PurchaseReport.css';

function PurchaseReport() {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filters, setFilters] = useState({ fromDate: '', untilDate: '', category: '', houseName: '' });
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/purchase-report')
      .then(response => response.json())
      .then(data => {
        setPurchases(data.data);
        setFilteredPurchases(data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching purchase data:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    let result = purchases;

    if (filters.fromDate) {
      const selectedFromDate = new Date(filters.fromDate);
      selectedFromDate.setHours(0, 0, 0, 0);
      result = result.filter(purchase => {
        const purchaseDate = new Date(purchase.Date_of_purchase);
        return purchaseDate >= selectedFromDate;
      });
    }

    if (filters.untilDate) {
      const selectedUntilDate = new Date(filters.untilDate);
      selectedUntilDate.setHours(23, 59, 59, 999);
      result = result.filter(purchase => {
        const purchaseDate = new Date(purchase.Date_of_purchase);
        return purchaseDate <= selectedUntilDate;
      });
    }

    if (filters.category) {
      result = result.filter(purchase => purchase.category === filters.category);
    }

    if (filters.houseName) {
      result = result.filter(purchase => purchase.house_name === filters.houseName);
    }

    setFilteredPurchases(result);
  }, [filters, purchases]);

  useEffect(() => {
    const sum = {};
    filteredPurchases.forEach(purchase => {
      const key = `${purchase.house_name}-${purchase.category}`;
      if (!sum[key]) {
        sum[key] = 0;
      }
      sum[key] += purchase.price;
    });
    setSummary(sum);
  }, [filteredPurchases]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="purchase-report-container">
      <h2>Purchase Report</h2>
      <div className="filters">
        <label htmlFor="fromDate">From date:</label>
        <input type="date" id="fromDate" name="fromDate" onChange={handleFilterChange} value={filters.fromDate} />
        <label htmlFor="untilDate">Until date:</label>
        <input type="date" id="untilDate" name="untilDate" onChange={handleFilterChange} value={filters.untilDate} />
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" onChange={handleFilterChange} value={filters.category} />
        <label htmlFor="houseName">House Name:</label>
        <input type="text" id="houseName" name="houseName" onChange={handleFilterChange} value={filters.houseName} />
      </div>
      <table className="purchase-report-table">
        <thead>
          <tr>
            <th>House Name</th>
            <th>Category</th>
            <th>Date of Purchase</th> {/* Added column header for Date of Purchase */}
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredPurchases.map((purchase, index) => (
            <tr key={index} className={index % 2 ? "odd-row" : "even-row"}>
              <td>{purchase.house_name}</td>
              <td>{purchase.category}</td>
              <td>{purchase.Date_of_purchase}</td> {/* Display Date of Purchase */}
              <td>{purchase.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key} className="summary-item">{`${key}: ${value}`}</div>
        ))}
      </div>
    </div>
  );
}

export default PurchaseReport;
