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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Shopping">Shopping</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
      </div>
      
      <div className="form-group">
          <label>Payment Method</label>
            <select
              value={payment_method}
              onChange={(e) => setPayment_method(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
      </div>
      
      <button type="submit" className="submit-btn">Add Expense</button>
    </form>
  </div>
);
}

export default ExpenseForm;
