# CarShop

A modern, dynamic car booking and management application built with **Next.js**, **Firebase**, and **Tailwind CSS**. This project allows users to browse cars, book them, manage their bookings, and authenticate using email/password or Google login. It also features a sleek, animated interface powered by **Framer Motion**.

---

## 🚀 Features

- User authentication with **Firebase Auth** (Email/Password & Google Login)
- Manage booked cars and calculate subtotal
- View order summary for booked cars
- Remove booked cars dynamically
- Responsive UI with **DaisyUI** & **Tailwind CSS**
- Smooth animations with **Framer Motion**
- Client-side localStorage management for bookings
- Modular and reusable React components
- Fully dynamic page rendering with Next.js 16

---

## 🛠 Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** Firebase Auth
- **Database (optional future support):** Firebase Firestore, MongoDB
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Other:** Swiper, Lenis (smooth scrolling)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ejp-assignment.git
cd ejp-assignment

# Install dependencies
npm install

# Create a .env file for Vite
# This file will store your backend API URL and Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID


# Start the development server
npm run dev
```

## 🔐 Authentication

Email & Password
Google Login
Firebase Authentication for secure login and registration
Auth state persists across sessio

## 📝 Future Improvements

Add Firestore/MongoDB integration to store bookings permanently
Add admin panel for managing cars
Add booking history page
Add payment integration
Improve animations and UX

## 📜 License

This project is MIT Licensed.
