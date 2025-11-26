"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaUserCog,
  FaChartPie,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  // Hydration-safe active link
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const menus = [
    { name: "Dashboard", href: "/dashboard", icon: <FaChartPie /> },
    { name: "Products", href: "/allproducts", icon: <FaBoxOpen /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FaUserCog /> },
    { name: "Home", href: "/", icon: <FaHome /> },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r flex flex-col">
        <div className="p-4 text-center text-xl font-semibold border-b">
          Control Panel
        </div>

        <ul className="menu p-4 flex-1">
          {menus.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  currentPath === item.href ? "bg-indigo-600 text-white" : ""
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="btn btn-error text-white w-full flex gap-2 m-4">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
}
