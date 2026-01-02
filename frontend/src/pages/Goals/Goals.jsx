import { useState } from "react";
import Card from "../../components/Card";
import { useAppContext } from "../../context/AppContext";


export default function Goals() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");
  const { goals, setGoals } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [target, setTarget] = useState("");


const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !target) return;

    if (editingId) {
      setGoals(
        goals.map((goal) =>
          goal.id === editingId
            ? { ...goal, title, type, target: Number(target) }
            : goal
        )
      );
      setEditingId(null);
    } else {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          title,
          type,
          target: Number(target),
          progress: 0,
        },
      ]);
    }

    setTitle("");
    setTarget("");
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
            {/* Target */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Target (e.g. hours, count)
              </label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g. 2"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
              {editingId ? "Update Goal" : "Add Goal"}
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
                  className="bg-gray-50 p-3 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">
                        {goal.title}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {goal.type} • {goal.progress} / {goal.target}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setTitle(goal.title);
                          setType(goal.type);
                          setTarget(goal.target);
                          setEditingId(goal.id);
                        }}
                        className="text-blue-500 text-xs hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          setGoals(goals.filter((g) => g.id !== goal.id))
                        }
                        className="text-red-500 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        width: `${Math.min(
                          (goal.progress / goal.target) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  {/* Progress controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setGoals(
                          goals.map((g) =>
                            g.id === goal.id
                              ? {
                                  ...g,
                                  progress: Math.max(g.progress - 1, 0),
                                }
                              : g
                          )
                        )
                      }
                      className="px-2 py-1 text-xs bg-gray-200 rounded"
                    >
                      −
                    </button>

                    <button
                      onClick={() =>
                        setGoals(
                          goals.map((g) =>
                            g.id === goal.id
                              ? {
                                  ...g,
                                  progress: Math.min(
                                    g.progress + 1,
                                    g.target
                                  ),
                                }
                              : g
                          )
                        )
                      }
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      +
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
