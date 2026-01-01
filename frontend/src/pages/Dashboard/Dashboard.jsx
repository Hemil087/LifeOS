export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Page container */}
            <div className="max-w-7xl mx-auto space-y-6">
                 {/* Header */}
                <div>
                <h1 className="text-xl font-semibold text-gray-800">
                    Good Morning 👋
                </h1>
                <p className="text-sm text-gray-500">
                    Here’s a quick look at your day 
                </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Goals Card */}
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Today’s Goals</p>
                    <p className="text-2xl font-bold text-gray-800">
                    3 / 5
                    </p>
                </div>
                 {/* Expenses Card */}
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Today’s Expenses</p>
                    <p className="text-2xl font-bold text-gray-800">
                    ₹450
                    </p>
                </div>

                {/* Savings Card */}
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-500">Monthly Savings</p>
                    <p className="text-2xl font-bold text-gray-800">
                    ₹5,000
                    </p>
                </div>

                </div>

                {/* Progress Section */}
                <div className="bg-white rounded-xl shadow p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                    Daily Goal Progress
                </p>

                {/* Progress bar */}
                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: "60%" }}  // static for now
                    />
                </div>
            <p className="text-xs text-gray-500 mt-2">
            60% completed
          </p>
        </div>

      </div>
    </div>
    );
}