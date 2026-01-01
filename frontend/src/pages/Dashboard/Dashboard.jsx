import Card from "../../components/Card";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
          <Card title="Today’s Goals" value="3 / 5" />
          <Card title="Today’s Expenses" value="₹450" />
          <Card title="Monthly Savings" value="₹12,000" />
        </div>

        {/* Progress Section */}
        <Card title="Daily Goal Progress">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: "60%" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            60% completed
          </p>
        </Card>

      </div>
    </div>
  );
}
