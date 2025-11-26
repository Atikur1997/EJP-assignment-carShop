"use client";
import { useEffect, useState } from "react";

export default function ManageProducts() {
  const [bookedCars, setBookedCars] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [dates, setDates] = useState([]); // store booking dates

  useEffect(() => {
    // Only runs on the client
    const cars = JSON.parse(localStorage.getItem("bookedCars") || "[]");
    setBookedCars(cars);

    const total = cars.reduce((acc, car) => acc + (car.priceUSD || 0), 0);
    setSubtotal(total);

    const today = new Date().toLocaleDateString();
    setDates(cars.map(() => today)); // set today's date for all booked cars
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

    const today = new Date().toLocaleDateString();
    setDates(updatedCars.map(() => today));
  };

  if (!bookedCars.length)
    return (
      <div className="text-center mt-20 text-gray-700 text-xl">
        No cars booked yet!
      </div>
    );

  return (
    <div className="flex gap-6">
      {/* Left Summary */}
      <div className="md:w-1/4 bg-white shadow-lg rounded-xl p-4 h-fit sticky top-6">
        <h2 className="text-lg font-bold mb-4">Order Summary</h2>
        <div className="divide-y divide-gray-200">
          {bookedCars.map((car, index) => (
            <div
              key={car._id}
              className="flex justify-between items-center py-2"
            >
              <span>
                {index + 1}. {car.name}
              </span>
              <span>${car.priceUSD?.toLocaleString()}</span>
              <span className="text-gray-400 text-sm">{dates[index]}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-2 font-bold">
          Subtotal: ${subtotal?.toLocaleString()}
        </div>
      </div>

      {/* Middle Booked Cars */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookedCars.map((car, index) => (
          <div
            key={car._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden relative"
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
              <p className="text-yellow-500 font-medium">⭐ {car.rating} / 5</p>
              <p className="text-gray-400 text-sm">Booked on: {dates[index]}</p>
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
  );
}
