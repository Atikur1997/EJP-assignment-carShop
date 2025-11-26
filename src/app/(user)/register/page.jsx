"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(""); // New state for Name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await register(email, password);
      // Update user display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      router.push("/user");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/user");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
  };

  return (
    <div className="hero bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen flex flex-col justify-center items-center px-4">
      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 max-w-md"
      >
        <h2 className="text-4xl font-bold text-white mb-2">
          Drive Your Dream Car
        </h2>
        <p className="text-gray-300 text-lg">
          Join our premium car collection and explore high-performance vehicles.
        </p>
      </motion.div>

      {/* Registration Card */}
      <motion.div
        className="card bg-gradient-to-br from-white/90 via-white/80 to-white/90 w-full max-w-md shadow-2xl rounded-xl border border-gray-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="card-body space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <motion.div custom={0} variants={fieldVariants}>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </motion.div>

            {/* Email */}
            <motion.div custom={1} variants={fieldVariants}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              className="relative"
              custom={2}
              variants={fieldVariants}
            >
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-10 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 top-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              className="relative"
              custom={3}
              variants={fieldVariants}
            >
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full pr-10 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </motion.div>

            {/* Register Button */}
            <motion.button
              type="submit"
              className={`btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 transition-transform transform hover:scale-105 ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              Register
            </motion.button>
          </form>

          {/* Google Login Button */}
          <motion.button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 mt-2 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle size={20} /> Continue with Google
          </motion.button>

          <motion.p
            className="mt-4 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Already have an account?{" "}
            <a href="/login" className="link link-hover text-blue-600">
              Login
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
