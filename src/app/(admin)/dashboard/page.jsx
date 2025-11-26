"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUserCog,
  FaChartPie,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const menus = [
    { name: "Dashboard", href: "/dashboard", icon: <FaChartPie /> },
    { name: "Products", href: "/allproducts", icon: <FaBoxOpen /> },
    { name: "Settings", href: "/dashboard/settings", icon: <FaUserCog /> },
    { name: "Home", href: "/", icon: <FaHome /> },
  ];

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <div className="drawer lg:drawer-open">
            <input
              id="dashboard-drawer"
              type="checkbox"
              className="drawer-toggle"
            />

            {/* MAIN CONTENT AREA */}
            <div className="drawer-content flex flex-col">
              {/* TOP NAVBAR */}
              <nav className="navbar bg-base-200 shadow px-4">
                <label
                  htmlFor="dashboard-drawer"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
                <p className="font-bold text-lg">Admin Dashboard</p>
              </nav>

              {/* PAGE CONTENT */}
              <div className="p-6">{children}</div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
              <label
                htmlFor="dashboard-drawer"
                className="drawer-overlay"
              ></label>

              <aside className="w-64 bg-base-100 border-r min-h-screen flex flex-col">
                <div className="p-4 text-center text-xl font-semibold border-b">
                  Control Panel
                </div>

                <ul className="menu p-4">
                  {menus.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={
                          pathname === item.href
                            ? "active bg-primary text-white"
                            : ""
                        }
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  {/* LOGOUT */}
                  <li className="mt-auto">
                    <button className="btn btn-error text-white w-full flex gap-2">
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
