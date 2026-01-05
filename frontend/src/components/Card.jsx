export default function Card({ title, value, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
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
