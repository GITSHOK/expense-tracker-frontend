import { useState } from "react";
import axios from "axios";
import './components.css';

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [payment_method, setPayment_method] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for backend
    const newExpense = {
  description: title, // sending the title valus as decription
  amount,
  date,
  category,
  payment_method
};

    try {
      // Send to backend
      await axios.post("https://expense-tacker-backend.onrender.com/api/expenses", newExpense);

      // Notify parent to update expenses list
      onExpenseAdded();

      // Reset form fields
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");
      setPayment_method("");
    } catch (err) {
      console.error("Failed to add expense:", err);
      alert("Error adding expense. Please try again.");
    }
  };

return (
  <div className="expense-form">
    <h2>Add New Expense</h2>
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label>Expense Title</label>
        <input 
          type="text" 
          placeholder="Enter expense title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
      </div>
      
      <div className="form-group">
        <label>Amount</label>
        <input 
          type="number" 
          placeholder="Enter amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required
        />
      </div>
      
      <div className="form-group">
        <label>Date</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required
        />
      </div>
      
      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Payment Method</label>
        <input
          type="text"
          placeholder="Enter payment method"
          value={payment_method}
          onChange={(e) => setPayment_method(e.target.value)}
        />
      </div>
      
      <button type="submit" className="submit-btn">Add Expense</button>
    </form>
  </div>
);
}

export default ExpenseForm;
