import { useState } from "react";
import Card from "../../components/Card";
import { useAppContext } from "../../context/AppContext";

export default function Goals() {
  const {
    goals = [],
    addGoal,
    editGoal,
    removeGoal,
  } = useAppContext();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("daily");
  const [target, setTarget] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  /* -------------------- SUBMIT (CREATE / UPDATE) -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !target) return;

    const payload = {
      title,
      type,
      target: Number(target),
    };

    try {
      if (editingId) {
        await editGoal(editingId, payload);
        setEditingId(null);
      } else {
        await addGoal(payload);
      }

      setTitle("");
      setTarget("");
      setType("daily");
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- FILTER -------------------- */
  const filteredGoals =
    filter === "all"
      ? goals
      : goals.filter((g) => g.type === filter);

  /* -------------------- PROGRESS HANDLERS -------------------- */
  const incrementProgress = async (goal) => {
    if (goal.completed) return;

    const newProgress = Math.min(goal.progress + 1, goal.target);

    await editGoal(goal.id, {
      progress: newProgress,
    });
  };


  const decrementProgress = async (goal) => {
    await editGoal(goal.id, {
      progress: Math.max(goal.progress - 1, 0),
    });
  };


  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20 animate-fade-in">
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

        {/* Add / Edit Goal */}
        <Card title={editingId ? "Edit Goal" : "Add New Goal"}>
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal title"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Target"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
            >
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
              {f}
            </button>
          ))}
        </div>

        {/* Goals List */}
        <Card title="Your Goals">
          {filteredGoals.length === 0 ? (
            <p className="text-sm text-gray-500">No goals yet.</p>
          ) : (
            <ul className="space-y-2">
              {filteredGoals.map((goal) => (
                <li key={goal.id} className="bg-gray-50 p-3 rounded-lg space-y-2">

                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{goal.title}</p>
                      <p className="text-xs text-gray-500">
                        {goal.type} • {goal.progress}/{goal.target}
                      </p>
                      {goal.completed && (
                        <span className="text-xs text-green-600">
                          Completed ✓
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 text-xs">
                      <button
                        onClick={() => {
                          setTitle(goal.title);
                          setType(goal.type);
                          setTarget(goal.target);
                          setEditingId(goal.id);
                        }}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeGoal(goal.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
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

                  {/* Controls */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => decrementProgress(goal)}
                      className="px-2 py-1 text-xs bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <button
                      onClick={() => incrementProgress(goal)}
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
