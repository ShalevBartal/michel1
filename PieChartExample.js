import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './PieChartExample.css'; // Make sure this path matches your file structure

const PieChartExample = () => {
  // State for the first pie chart for dynamic data: Partial and Regular Payments
  const [data1, setData1] = useState({
    labels: [],
    datasets: [{
      label: 'Partial and Regular Payments Since the Beginning of 2024',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Color for Partial Payments
        'rgba(54, 162, 235, 0.6)', // Color for Regular Payments
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }]
  });

  // State for the second pie chart for dynamic data: House Expenses
  const [data2, setData2] = useState({
    labels: ['נורדאו', 'בן יהודה', 'ארנונה', 'באר שבע', 'בית הכרם', 'המסילה', 'קינג גורג'],
    datasets: [{
      label: 'House Expenses Since the Beginning of 2024)',
      data: [], // This will be updated from the fetch call
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Color for נורדאו
        'rgba(54, 162, 235, 0.6)', // Color for בן יהודה
        'rgba(255, 206, 86, 0.6)', // Color for ארנונה
        'rgba(75, 192, 192, 0.6)', // Color for באר שבע
        'rgba(153, 102, 255, 0.6)', // Color for בית הכרם
        'rgba(255, 159, 64, 0.6)', // Color for המסילה
        'rgba(199, 199, 199, 0.6)', // Color for קינג גורג
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
      ],
      borderWidth: 1,
    }]
  });

  // State for the third pie chart for dynamic data: New and Leaving Soldiers
  const [data3, setData3] = useState({
    labels: ['Joining Soldiers', 'Leaving Soldiers'],
    datasets: [{
      label: 'New and Leaving Soldiers Since the Beginning of 2024',
      data: [],
      backgroundColor: [
        'rgba(153, 102, 255, 0.6)', // Color for Joining Soldiers
        'rgba(255, 159, 64, 0.6)', // Color for Leaving Soldiers
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    // Fetching for the first chart's data: Payments Overview
    fetch('http://localhost:5000/payment-overview')
      .then(response => response.json())
      .then(data => {
        setData1({
          labels: data.labels, // ["Partial Payments", "Regular Payments"]
          datasets: [{
            label: 'Partial and Regular Payments Since the Beginning of 2024',
            data: data.counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          }]
        });
      })
      .catch(error => console.error('Error fetching payment data:', error));

    // Fetching for the second chart's data: House Expenses
    fetch('http://localhost:5000/house-expenses')
    .then(response => response.json())
    .then(data => {
      setData2(prevState => ({
        ...prevState,
        datasets: prevState.datasets.map(dataset => ({
          ...dataset,
          data: data.counts,
        })),
      }));
    })
    .catch(error => console.error('Error fetching house expenses data:', error));

    // Fetching for the third chart's data: Soldiers Movement
    fetch('http://localhost:5000/soldier-movement')
      .then(response => response.json())
      .then(data => {
        setData3({
          labels: ['Joining Soldiers', 'Leaving Soldiers'],
          datasets: [{
            label: 'New and Leaving Soldiers Since the Beginning of 2024',
            data: data.counts,
            backgroundColor: [
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }]
        });
      })
      .catch(error => console.error('Error fetching soldier movement data:', error));
  }, []);

  // Options for the charts
  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: '#444',
        anchor: 'center',
        align: 'center',
        offset: 0,
        font: {
          size: 18, // Size of the labels
          weight: 'bold' // Make labels bold
        },
        formatter: (value) => value > 0 ? value : null,
      },
      title: {
        display: true,
        text: '', // Title text is set dynamically for each chart
        font: {
          size: 24,
          weight: 'bold',
        },
      },
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold' // Optionally, you can also make the legend text bold
          },
        },
      },
    },
    // Additional configuration options...
  };

  return (
    <div className="pie-chart-container">
      <div className="chart">
        <Pie data={data1} options={{...options, plugins: {...options.plugins, title: {...options.plugins.title, text: 'Partial and Regular Payments Since the Beginning of 2024'}}}} plugins={[ChartDataLabels]} />
      </div>
      <div className="chart">
        <Pie data={data2} options={{...options, plugins: {...options.plugins, title: {...options.plugins.title, text: 'House Expenses Since the Beginning of 2024(NIS)'}}}} plugins={[ChartDataLabels]} />
      </div>
      <div className="chart">
        <Pie data={data3} options={{...options, plugins: {...options.plugins, title: {...options.plugins.title, text: 'New and Leaving Soldiers Since the Beginning of 2024'}}}} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default PieChartExample;
