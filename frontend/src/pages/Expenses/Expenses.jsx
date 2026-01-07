import { useState } from "react";
import Card from "../../components/Card";
import { useAppContext } from "../../context/AppContext";

export default function Expenses() {
  const {
    expenses = [],
    addExpense,
    editExpense,
    removeExpense,
  } = useAppContext();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("month");

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const payload = {
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      if (editingId) {
        await editExpense(editingId, payload);
        setEditingId(null);
      } else {
        await addExpense(payload);
      }

      setTitle("");
      setAmount("");
      setCategory("food");
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- FILTER -------------------- */
  const now = new Date();

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    if (filter === "today") {
      return expenseDate.toDateString() === now.toDateString();
    }

    if (filter === "month") {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Expenses 💸
          </h1>
          <p className="text-sm text-gray-500">
            Track your spending
          </p>
        </div>

        {/* Add / Edit Expense */}
        <Card title={editingId ? "Edit Expense" : "Add New Expense"}>
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Expense title"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount (₹)"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
            >
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </form>
        </Card>

        {/* Filters */}
        <div className="flex gap-2">
          {["today", "month", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {f === "month" ? "This Month" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Expense List */}
        <Card title="Expense History">
          {filteredExpenses.length === 0 ? (
            <p className="text-sm text-gray-500">
              No expenses found.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredExpenses.map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm"
                >
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {expense.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="font-semibold">
                      ₹{expense.amount}
                    </p>

                    <button
                      onClick={() => {
                        setTitle(expense.title);
                        setAmount(expense.amount);
                        setCategory(expense.category);
                        setEditingId(expense.id);
                      }}
                      className="text-blue-500 text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => removeExpense(expense.id)}
                      className="text-red-500 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

      </div>
    </div>
  );
}
