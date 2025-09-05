import { Bar, Pie, Line } from 'react-chartjs-2';
import './components.css'
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
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

  // Group expenses by date (for line chart)
  const dailyExpenseMap = {};
  datao.forEach(exp => {
    const date = new Date(exp.date).toLocaleDateString();
    if (dailyExpenseMap[date]) {
      dailyExpenseMap[date] += parseFloat(exp.amount);
    } else {
      dailyExpenseMap[date] = parseFloat(exp.amount);
    }
  });

  // Sort dates chronologically for line chart
  const sortedDates = Object.keys(dailyExpenseMap).sort((a, b) => 
    new Date(a) - new Date(b)
  );

  // Bar Chart Data
  const barData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryMap),
        backgroundColor: 'rgba(22, 241, 58, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 3
      }
    ]
  };

  // Pie Chart Data
  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
        ],
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  };

  // Line Chart Data (Daily Trends)
  const lineData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Daily Expenses',
        data: sortedDates.map(date => dailyExpenseMap[date]),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Category-wise Expenses' }
    },
    scales: {
      y: {
        min: 0,
        ticks: { stepSize: 100 },
        title: { display: true, text: 'Amount (₹)' }
      },
      x: {
        title: { display: true, text: 'Category' }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Expense Distribution (%)'
      }
    }
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Spending Trends' }
    },
    scales: {
      y: {
        min: 0,
        title: { display: true, text: 'Amount (₹)' }
      },
      x: {
        title: { display: true, text: 'Date' }
      }
    }
  };


  // Group expenses by payment method and sum amounts
const paymentMethodMap = {};
datao.forEach(exp => {
  if (paymentMethodMap[exp.payment_method]) {
    paymentMethodMap[exp.payment_method] += parseFloat(exp.amount);
  } else {
    paymentMethodMap[exp.payment_method] = parseFloat(exp.amount);
  }
});

// Pie Chart Data (Payment Method)
const paymentPieData = {
  labels: Object.keys(paymentMethodMap),
  datasets: [
    {
      data: Object.values(paymentMethodMap),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#8AC926', '#FF595E'
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
};

const paymentPieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'right' },
    title: {
      display: true,
      text: 'Expenses by Payment Method'
    }
  }
};



  return (
    <div className="analytics-section">
      <h2>Expense Analytics</h2>
      
      <div className="charts-container">
        {/* Bar Chart */}
        <div className="chart-container">
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <Pie data={pieData} options={pieOptions} />
        </div>

        {/* Line Chart */}
        <div className="chart-container full-width">
          <Line data={lineData} options={lineOptions} />
        </div>

        {/* Payment Method Pie Chart */}
<div className="chart-container">
  <Pie data={paymentPieData} options={paymentPieOptions} />
</div>

      </div>
    </div>
  );
}

export default Analytics;