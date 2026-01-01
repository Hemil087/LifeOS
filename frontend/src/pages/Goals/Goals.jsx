export default function Goals() {
    return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Goals 🎯
          </h1>
          <p className="text-sm text-gray-500">
            Track your daily, monthly, and yearly goals
          </p>
        </div>

        {/* Placeholder content */}
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-600">
            No goals added yet.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            You’ll be able to add and manage goals here.
          </p>
        </div>

      </div>
    </div>
    );
}