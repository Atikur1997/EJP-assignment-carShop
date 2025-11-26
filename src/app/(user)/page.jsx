"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  const [cars, setCars] = useState([]);
  const router = useRouter();
  const { user, loading } = useAuth(); // ✅ include loading

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.slice(0, 6))); // Top 6 cars
  }, []);

  const handleViewDetails = (id) => {
    if (loading) return; // wait until auth state is loaded

    if (user) {
      router.push(`/dashboard/productdetails/${id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="scroll-smooth">
      {/* Swiper Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="my-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10 shadow-xl mx-5 rounded-3xl"
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Top Featured Cars
        </h1>

        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {cars.map((car) => (
            <SwiperSlide
              key={car._id}
              className="flex flex-col items-center justify-center rounded-2xl overflow-hidden bg-white shadow-2xl p-4"
              style={{ width: "300px" }}
            >
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg font-bold text-indigo-600">{car.name}</h3>
              <p className="text-gray-700 mb-2 font-semibold">
                ${car.priceUSD.toLocaleString()}
              </p>
              <div className="flex gap-2 flex-wrap justify-center mb-2">
                {car.availableColors.map((color) => (
                  <span
                    key={color}
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></span>
                ))}
              </div>

              <button
                onClick={() => handleViewDetails(car._id)}
                className={`px-3 py-1 rounded-lg transition-colors duration-300 ${
                  user
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                title={user ? "View Details" : "Login to view details"}
              >
                View Details
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="my-10 mx-5"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Top Choices</h1>
          <button
            onClick={() => router.push("/allproducts")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-300"
          >
            Show All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <motion.div
              key={car._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 shadow-xl rounded-2xl overflow-hidden p-4"
            >
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-purple-700">{car.name}</h3>
              <p className="text-gray-800 font-semibold mb-2">
                ${car.priceUSD.toLocaleString()}
              </p>
              <div className="flex gap-2 flex-wrap mb-2">
                {car.availableColors.map((color) => (
                  <span
                    key={color}
                    className="w-5 h-5 rounded-full border border-gray-400"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  ></span>
                ))}
              </div>
              <button
                onClick={() => handleViewDetails(car._id)}
                className={`px-3 py-1 rounded-lg transition-colors duration-300 ${
                  user
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                title={user ? "View Details" : "Login to view details"}
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
