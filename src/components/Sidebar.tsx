import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/gallery", label: "Gallery" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

const Sidebar = () => {
  return (
    <nav className="flex w-64 min-h-screen border-r bg-white dark:bg-slate-900 dark:border-slate-700 p-4 sticky top-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Menu</h2>
      </div>

      <ul className="space-y-1">
        {links.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                  isActive
                    ? "bg-sky-600 text-white dark:bg-sky-500"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;