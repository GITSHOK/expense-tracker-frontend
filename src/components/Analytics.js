import { Bar } from 'react-chartjs-2';
import './components.css'
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics({ refresh }) {
  const [datao, setData] = useState([]);

  useEffect(() => {
    axios.get("https://expense-tacker-backend.onrender.com/api/expenses")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [refresh]);

  // Group expenses by category and sum amounts
  const categoryMap = {};
  datao.forEach(exp => {
    if (categoryMap[exp.category]) {
      categoryMap[exp.category] += parseFloat(exp.amount);
    } else {
      categoryMap[exp.category] = parseFloat(exp.amount);
    }
  });

  const data = {
    labels: Object.keys(categoryMap),          // x-axis: categories
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(categoryMap),      // y-axis: total per category
        backgroundColor: 'rgba(22, 241, 58, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3
      }
    ]
  };

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Category-wise Expenses' }
  },
  scales: {
    y: {
      min: 0,
      max: 1000,
      ticks: { stepSize: 100 },
      title: { display: true, text: 'Amount (₹)' }
    },
    x: {
      title: { display: true, text: 'Category' }
    }
  }
};


  return (
  <div className="analytics-section">
    <h2>Expense Analytics</h2>
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  </div>
);
}

export default Analytics;
