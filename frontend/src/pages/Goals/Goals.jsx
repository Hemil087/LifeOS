import { useState } from "react";
import Card from "../../components/Card";

export default function Goals() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");
  const [goals, setGoals] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newGoal = {
      id: Date.now(),
      title,
      type,
    };

    setGoals([...goals, newGoal]);
    setTitle("");
    setType("daily");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Goals 🎯
          </h1>
          <p className="text-sm text-gray-500">
            Add and track your goals
          </p>
        </div>

        {/* Add Goal Form */}
        <Card title="Add New Goal">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Goal Title */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Goal Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Study 2 hours"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Goal Type */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Goal Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Add Goal
            </button>

          </form>
        </Card>

        {/* Goals List */}
        <Card title="Your Goals">
          {goals.length === 0 ? (
            <p className="text-sm text-gray-500">
              No goals added yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg"
                >
                  <div>
                    <p className="text-gray-800">{goal.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{goal.type}</p>
                  </div>

                  <button
                    onClick={() =>
                      setGoals(goals.filter((g) => g.id !== goal.id))
                    }
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

      </div>
    </div>
  );
}
