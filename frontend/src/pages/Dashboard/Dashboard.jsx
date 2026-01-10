import Card from "../../components/Card";
import FullPageLoader from "../../components/FullPageLoader";
import { useAppContext } from "../../context/AppContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const {
    goals = [],
    expenses = [],
    loadingGoals,
    loadingExpenses,
  } = useAppContext();

  const { user } = useAuth();
  const navigate = useNavigate();

  /* -------------------- LOADING STATE -------------------- */
  if (loadingGoals || loadingExpenses) {
    return (
      <FullPageLoader text="Loading your dashboard…" />
    );
  }

  /* -------------------- DERIVED DATA -------------------- */
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const expenseByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const chartData = Object.entries(expenseByCategory).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  const activeGoals = goals.filter((g) => !g.completed);

  /* -------------------- DAILY GOAL PROGRESS -------------------- */
  const dailyGoals = goals.filter((g) => g.type === "daily");

  const dailyCompleted = dailyGoals.filter(
    (g) => g.completed
  ).length;

  const dailyProgressPercent =
    dailyGoals.length === 0
      ? 0
      : Math.round((dailyCompleted / dailyGoals.length) * 100);

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Hello{user?.username ? `, ${user.username}` : ""} 👋
            </h1>
            <p className="text-sm text-gray-500">
              Here’s a quick look at your day
            </p>
          </div>

          <button
            onClick={() => navigate("/logout")}
            className="text-sm text-red-500 font-medium hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Total Goals" value={goals.length} />
          <Card title="Active Goals" value={activeGoals.length} />
          <Card title="Total Expenses" value={`₹${totalExpenses}`} />

          <Card title="Expense Breakdown">
            {chartData.length === 0 ? (
              <p className="text-sm text-gray-500">
                No expenses yet.
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="amount"
                      nameKey="category"
                      outerRadius={80}
                      label
                    >
                      {chartData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={[
                            "#2563eb",
                            "#16a34a",
                            "#f59e0b",
                            "#ef4444",
                            "#6366f1",
                          ][index % 5]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </Card>
        </div>

        {/* Daily Goal Progress */}
        <Card title="Daily Goal Progress">
          {dailyGoals.length === 0 ? (
            <p className="text-sm text-gray-500">
              No daily goals yet.
            </p>
          ) : (
            <>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${dailyProgressPercent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {dailyProgressPercent}% completed
              </p>
            </>
          )}
        </Card>

      </div>
    </div>
  );
}
