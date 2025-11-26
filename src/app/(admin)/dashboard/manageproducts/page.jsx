"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function ManageProducts() {
  const [bookedCars, setBookedCars] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem("bookedCars") || "[]");
    setBookedCars(cars);

    const total = cars.reduce((acc, car) => acc + (car.priceUSD || 0), 0);
    setSubtotal(total);
  }, []);

  const handleRemove = (id) => {
    const updatedCars = bookedCars.filter((car) => car._id !== id);
    setBookedCars(updatedCars);
    localStorage.setItem("bookedCars", JSON.stringify(updatedCars));

    const total = updatedCars.reduce(
      (acc, car) => acc + (car.priceUSD || 0),
      0
    );
    setSubtotal(total);
  };

  if (!bookedCars.length)
    return (
      <div className="text-center mt-20 text-gray-700 text-xl">
        No cars booked yet!
      </div>
    );

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto my-10 gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 bg-white shadow-lg rounded-2xl p-6 sticky top-8 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {bookedCars.map((car) => (
              <li key={car._id} className="py-2">
                <p className="font-medium">{car.name}</p>
                <p className="text-gray-600">
                  ${car.priceUSD?.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <p className="font-bold text-lg">
              Subtotal: ${subtotal?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Booked Cars */}
        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookedCars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden relative"
            >
              <img
                src={car.imageUrl || "/placeholder.jpg"}
                alt={car.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-600">
                  {car.brand} {car.model}
                </p>
                <p className="text-indigo-600 font-semibold text-lg">
                  ${car.priceUSD?.toLocaleString()}
                </p>
                <p className="text-yellow-500 font-medium">
                  ⭐ {car.rating} / 5
                </p>
                <button
                  onClick={() => handleRemove(car._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
