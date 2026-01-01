export default function Card({ title, value, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      {title && (
        <p className="text-sm text-gray-500">
          {title}
        </p>
      )}

      {value && (
        <p className="text-2xl font-bold text-gray-800 mt-1">
          {value}
        </p>
      )}

      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
}
