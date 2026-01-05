import { useState } from "react";
import Card from "../../components/Card";
import { useAppContext } from "../../context/AppContext";


export default function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const { expenses, setExpenses } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("month");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) return;

    if (editingId) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingId
            ? {
                ...expense,
                title,
                amount: Number(amount),
                category,
              }
            : expense
        )
      );
      setEditingId(null);
    } else {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          title,
          amount: Number(amount),
          category,
          date: new Date(),
        },
      ]);
    }
    setTitle("");
    setAmount("");
    setCategory("food");
  };
  const now = new Date();

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    if (filter === "today") {
      return (
        expenseDate.toDateString() === now.toDateString()
      );
    }

    if (filter === "month") {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Expenses 💸
          </h1>
          <p className="text-sm text-gray-500">
            Track your spending and income
          </p>
        </div>

        {/* Add Expense Form */}
        <Card title="Add New Expense">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Expense Title */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lunch, Uber, Rent"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 250"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="shopping">Shopping</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </form>
        </Card>
        
        {/* Filter  */}
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
          {expenses.length === 0 ? (
            <p className="text-sm text-gray-500">
              No expenses added yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredExpenses.map((expense) => (
                <li
                  key={expense.id}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">{expense.title}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {expense.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800">
                      ₹{expense.amount}
                    </p>

                    <button
                      onClick={() => {
                        setTitle(expense.title);
                        setAmount(expense.amount);
                        setCategory(expense.category);
                        setEditingId(expense.id);
                      }}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        setExpenses(
                          expenses.filter((e) => e.id !== expense.id)
                        )
                      }
                      className="text-red-500 text-xs hover:underline"
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