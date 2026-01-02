import { useState } from "react";
import Card from "../../components/Card";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";


export default function Goals() {
    useEffect(() => {
      const today = new Date().toDateString();
    
      setGoals((prev) =>
        prev.map((g) => {
          if (g.type !== "daily") return g;
    
          if (
            g.lastDoneAt &&
            new Date(g.lastDoneAt).toDateString() !== today
          ) {
            return {
              ...g,
              progress: 0,
              completed: false,
            };
          }
          return g;
        })
      );
    }, []);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");
  const { goals, setGoals } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [target, setTarget] = useState("");
  const [filter, setFilter] = useState("all");


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
          completed: false,
          streak: 0,
          lastDoneAt: null,
          createdAt: new Date(),
        },
      ]);
    }

    setTitle("");
    setTarget("");
    setType("daily");
  };
  const filteredGoals =
  filter === "all"
    ? goals
    : goals.filter((g) => g.type === filter);

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
        {/* Filter */}
        <div className="flex gap-2">
          {["all", "daily", "monthly", "yearly"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        {/* Goals List */}
        <Card title="Your Goals">
          {goals.length === 0 ? (
            <p className="text-sm text-gray-500">
              No goals added yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredGoals.map((goal) => (
                <li
                  key={goal.id}
                  className="bg-gray-50 p-3 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">
                        {goal.title}
                      </p>
                      {goal.completed && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Completed ✓
                        </span>
                      )}
                      {goal.streak > 0 && (
                        <p className="text-xs text-orange-600">
                          🔥 Streak: {goal.streak}
                        </p>
                      )}

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
                      disabled={goal.completed}
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
                      className={`px-2 py-1 text-xs rounded ${
                        goal.completed
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-200"
                      }`}
                    >
                      −
                    </button>


                    <button
                      disabled={goal.completed}
                      onClick={() =>
                        setGoals(
                          goals.map((g) => {
                            if (g.id !== goal.id) return g;

                            const newProgress = Math.min(g.progress + 1, g.target);
                            const isCompleted = newProgress >= g.target;

                            let newStreak = g.streak;

                            if (isCompleted) {
                              const today = new Date();
                              const lastDone = g.lastDoneAt
                                ? new Date(g.lastDoneAt)
                                : null;

                              if (
                                lastDone &&
                                today.toDateString() !== lastDone.toDateString() &&
                                today - lastDone <= 24 * 60 * 60 * 1000
                              ) {
                                newStreak += 1;
                              } else {
                                newStreak = 1;
                              }
                            }

                            return {
                              ...g,
                              progress: newProgress,
                              completed: isCompleted,          // ✅ THIS LINE WAS MISSING
                              streak: newStreak,
                              lastDoneAt: isCompleted ? new Date() : g.lastDoneAt,
                            };
                          })
                        )
                      }
                      className={`px-2 py-1 text-xs rounded ${
                        goal.completed
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white"
                      }`}
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
