"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductDetailsClient() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/cars");
        if (!res.ok) throw new Error("Failed to fetch cars");

        const cars = await res.json();
        const matchedCar = cars.find((c) => c._id === id);
        if (!matchedCar) throw new Error("Car not found");

        setCar(matchedCar);
      } catch (err) {
        console.error(err);
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleBookNow = () => {
    // Get booked cars from localStorage
    const bookedCars = JSON.parse(localStorage.getItem("bookedCars") || "[]");

    // Avoid duplicates
    const alreadyBooked = bookedCars.find((c) => c._id === car._id);
    if (!alreadyBooked) {
      bookedCars.push(car);
      localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
    }

    router.push("/dashboard/manageproducts");
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-700 text-xl animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-600 text-xl">{error}</div>
    );
  if (!car)
    return (
      <div className="text-center mt-20 text-gray-700 text-xl">
        Car not found!
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-6xl mx-auto my-16 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 shadow-2xl rounded-3xl overflow-hidden"
    >
      {/* Hero Image */}
      <div className="relative">
        <img
          src={car?.imageUrl || "/placeholder.jpg"}
          alt={car?.name || "Car image"}
          className="w-full h-[500px] object-cover rounded-b-3xl"
        />
        <div className="absolute bottom-6 right-6">
          <button
            onClick={handleBookNow}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-lg transform hover:scale-105 transition-transform duration-300"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Car Header */}
      <div className="p-8 space-y-4 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-extrabold text-gray-800"
        >
          {car?.name || "Unknown Car"}
        </motion.h1>
        <p className="text-xl text-gray-600 font-medium">
          {car?.brand || "Brand"} {car?.model || "Model"} •{" "}
          {car?.year || "Year"}
        </p>
        <p className="text-3xl text-indigo-600 font-bold">
          ${car?.priceUSD?.toLocaleString() || "N/A"}
        </p>
        <p className="text-yellow-500 font-semibold text-lg">
          ⭐ {car?.rating || "N/A"} / 5
        </p>
      </div>

      {/* Features */}
      <div className="px-8 py-6 bg-white rounded-2xl mx-8 -mt-10 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Features
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {car?.features?.map((f) => (
            <span
              key={f}
              className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white px-4 py-1 rounded-full font-medium shadow-md"
            >
              {f}
            </span>
          )) || <p className="text-gray-400">No features available</p>}
        </div>
      </div>

      {/* Technical Specs */}
      <div className="px-8 py-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Specifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Fuel Type", value: car?.fuelType || "-" },
            { label: "Transmission", value: car?.transmission || "-" },
            { label: "Seats", value: car?.seats || "-" },
            {
              label: "Mileage",
              value: car?.mileage ? car.mileage + " miles" : "-",
            },
            { label: "Engine", value: car?.engine || "-" },
            {
              label: "Horsepower",
              value: car?.horsepower ? car.horsepower + " hp" : "-",
            },
            {
              label: "Top Speed",
              value: car?.topSpeedMph ? car.topSpeedMph + " mph" : "-",
            },
          ].map((spec) => (
            <motion.div
              key={spec.label}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <p className="font-semibold text-gray-700">{spec.label}</p>
              <p className="text-gray-800 font-medium mt-1">{spec.value}</p>
            </motion.div>
          ))}

          {/* Colors */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 p-4 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 text-center"
          >
            <p className="font-semibold text-gray-700 mb-2">Colors</p>
            <div className="flex justify-center gap-2">
              {car?.availableColors?.map((color) => (
                <span
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-400"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              )) || <p className="text-gray-400">No colors</p>}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description */}
      <div className="px-8 py-6 mt-8 bg-white rounded-2xl mx-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Description
        </h2>
        <p className="text-gray-600 text-lg text-center">
          {car?.description || "No description available"}
        </p>
      </div>
    </motion.div>
  );
}
