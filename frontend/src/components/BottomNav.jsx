import { Link } from "react-router-dom";

export default function BottomNav({ active }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-14">

          <NavItem
            label="Dashboard"
            to="/"
            isActive={active === "dashboard"}
          />

          <NavItem
            label="Goals"
            to="/goals"
            isActive={active === "goals"}
          />

          <NavItem
            label="Expenses"
            to="/expenses"
            isActive={active === "expenses"}
          />

        </div>
      </div>
    </nav>
  );
}

function NavItem({ label, to, isActive }) {
  return (
    <Link
      to={to}
      className={`text-sm font-medium ${
        isActive ? "text-blue-600" : "text-gray-500"
      }`}
    >
      {label}
    </Link>
  );
}
