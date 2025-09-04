import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Analytics from "./components/Analytics";
import './components/components.css';
function App() {
  const [refresh, setRefresh] = useState(false);

  const handleExpenseAdded = () => {
    setRefresh(!refresh); // toggle refresh to reload expenses
  };
  console.log("lets see");

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Expense Tracker</h1>
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <ExpenseList refresh={refresh} />
      <Analytics refresh={refresh} />
    </div>
  );
}

export default App;
