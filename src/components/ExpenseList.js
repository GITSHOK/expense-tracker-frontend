import { useEffect, useState } from "react";
import axios from "axios";
import "./components.css";

function ExpenseList({ refresh }) {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch data
  useEffect(() => {
    axios
      .get("https://expense-tacker-backend.onrender.com/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.log(err));
  }, [refresh]);

  // Delete row
  async function deleteItem(id) {
    try {
      await axios.delete(
        `https://expense-tacker-backend.onrender.com/api/expenses/${id}`
      );
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  }

  // Start editing
  function startEditing(expense) {
    setEditingId(expense.id);
    setFormData({
      description: expense.description,
      category: expense.category,
      payment_method: expense.payment_method,
      amount: expense.amount,
      date: expense.date,
    });
  }

  // Handle input change
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Save updated row
  async function saveChanges(id) {
    try {
      const res = await axios.patch(
        `https://expense-tacker-backend.onrender.com/api/expenses/${id}`,
        formData
      );
      setExpenses(
        expenses.map((exp) => (exp.id === id ? res.data : exp))
      );
      setEditingId(null); // exit edit mode
    } catch (err) {
      console.error("Error updating:", err);
    }
  }

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
            <th>DELETE</th>
            <th>UPDATE/CHANGE</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                {editingId === expense.id ? (
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                ) : (
                  expense.description
                )}
              </td>
              <td>
                {editingId === expense.id ? (
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                ) : (
                  expense.category
                )}
              </td>
              <td>
                {editingId === expense.id ? (
                  <input
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                  />
                ) : (
                  expense.payment_method
                )}
              </td>
              <td>
                {editingId === expense.id ? (
                  <input
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                ) : (
                  `$${expense.amount}`
                )}
              </td>
              <td>
                {editingId === expense.id ? (
                  <input
                    name="date"
                    type="date"
                    value={formData.date.split("T")[0]}
                    onChange={handleChange}
                  />
                ) : (
                  new Date(expense.date).toISOString().split("T")[0]
                )}
              </td>
              <td>
                <button onClick={() => deleteItem(expense.id)}>DELETE</button>
              </td>
              <td>
                {editingId === expense.id ? (
                  <>
                    <button onClick={() => saveChanges(expense.id)}>
                      💾 Save
                    </button>
                    <button onClick={() => setEditingId(null)}>
                      ❌ Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => startEditing(expense)}>✏️</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
