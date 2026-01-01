import Card from "../../components/Card";

export default function Expenses() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Expenses 💸
          </h1>
          <p className="text-sm text-gray-500">
            Monitor your income and spending
          </p>
        </div>

        {/* Placeholder Card */}
        <Card title="Expense Records">
          <p className="text-sm text-gray-600">
            No expense records yet.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Your expense history will appear here.
          </p>
        </Card>

      </div>
    </div>
  );
}
