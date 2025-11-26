"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // LINKS BASED ON AUTH
  const guestLinks = (
    <>
      <Link href="/">Home</Link>
      <Link href="/allproducts">All Products</Link>
    </>
  );

  const userLinks = (
    <>
      <Link href="/">Home</Link>
      <Link href="/allproducts">All Products</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/manageproducts">Manage Products</Link>
      <Link href="/dashboard/product-details">Product Details</Link>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          {/* MOBILE MENU WITH VERTICAL GAP */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow gap-y-3"
          >
            {user ? userLinks : guestLinks}
          </ul>
        </div>

        {/* WEBSITE TITLE */}
        <button
          onClick={() => router.push("/")}
          className="btn btn-ghost text-xl font-semibold"
        >
          ShopWave
        </button>
      </div>

      {/* DESKTOP MENU WITH HORIZONTAL GAP */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-x-6">
          {user ? userLinks : guestLinks}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {user.photoURL ? (
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="user avatar" />
                </div>
              ) : (
                <FaUserCircle size={32} />
              )}
            </label>

            {/* USER DROPDOWN */}
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box w-60 p-4 shadow mt-3 space-y-2"
            >
              <li className="text-sm font-semibold pointer-events-none opacity-90">
                {user.displayName || "User"}
              </li>

              <li className="text-xs text-gray-500 pointer-events-none">
                {user.email}
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-sm mt-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
