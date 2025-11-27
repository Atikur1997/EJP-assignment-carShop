"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getFirebaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) router.push("/dashboard");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
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
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1 } }),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      {/* Title / Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 max-w-md"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-300 text-lg">
          Login to access your premium dashboard.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="card bg-white/90 w-full max-w-md shadow-2xl rounded-xl border border-gray-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="card-body space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <motion.div custom={0} variants={fieldVariants}>
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
              custom={1}
              variants={fieldVariants}
              className="relative"
            >
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-10 focus:border-blue-500 focus:ring focus:ring-blue-200"
                required
              />
            </motion.div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className={`btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-4 transition-transform transform hover:scale-105 ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
              custom={2}
              variants={fieldVariants}
            >
              Login
            </motion.button>
          </form>

          {/* Google Login */}
          <motion.button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2 mt-2 hover:bg-gray-100 transition-colors"
            custom={3}
            variants={fieldVariants}
          >
            <FcGoogle size={20} /> Continue with Google
          </motion.button>

          {/* Register Link */}
          <motion.p
            className="mt-4 text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Don't have an account?{" "}
            <a href="/register" className="link link-hover text-blue-600">
              Register
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
