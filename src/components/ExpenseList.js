import { useEffect, useState } from "react";
import axios from "axios";
import './components.css';


function ExpenseList({refresh}){
    const [expenses,setExpenses] = useState([]);

    useEffect(() => {
        axios.get("https://expense-tacker-backend.onrender.com/api/expenses")
        .then(res => setExpenses(res.data))
        .catch(err => console.log(err))

    },[refresh])    //refresh dependencies mean it reloads evrytime new expenses are added


return (
  <div className="expense-list">
    <h2>Expense History</h2>
    <table className="expense-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Payment Method</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>{expense.payment_method}</td>
            <td>${expense.amount}</td>
            <td>{new Date(expense.date).toISOString().split("T")[0]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default ExpenseList