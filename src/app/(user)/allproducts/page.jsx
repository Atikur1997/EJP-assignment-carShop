"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Banner from "@/components/Banner";

export default function AllProductsPage() {
  const [cars, setCars] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/cars");
        if (!res.ok) throw new Error("Failed to fetch cars");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <Banner />

      {/* All Products Section */}
      <div className="my-10 mx-5">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-10">
          All Available Cars
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 shadow-xl rounded-2xl overflow-hidden p-4"
            >
              <img
                src={car.imageUrl || "/placeholder.jpg"}
                alt={car.name || "Car image"}
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-purple-700">
                {car.name || "Unknown Car"}
              </h3>
              <p className="text-gray-800 font-semibold mb-2">
                ${car.priceUSD?.toLocaleString() || "N/A"}
              </p>

              {/* Available Colors */}
              <div className="flex gap-2 flex-wrap mb-4">
                {car.availableColors?.length ? (
                  car.availableColors.map((color) => (
                    <span
                      key={color}
                      className="w-5 h-5 rounded-full border border-gray-400"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    ></span>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No colors available</p>
                )}
              </div>

              {/* Show Details Button */}
              <button
                onClick={() =>
                  router.push(`/dashboard/productdetails/${car._id}`)
                }
                className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
              >
                Show Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
