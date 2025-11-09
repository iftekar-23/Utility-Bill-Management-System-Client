import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;


    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return setError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
    }


    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUserProfile(name, photoURL)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: `Welcome, ${name}`,
              timer: 1800,
              showConfirmButton: false,
            });
            navigate(from, { replace: true });
          })
          .catch(() => setError("Failed to update profile information."));
      })
      .catch(() => setError("Email already registered or invalid format."));
  };

  // 🌐 Google Sign-in
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch(() => setError("Google sign-in failed. Please try again."));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your photo URL (optional)"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition-all"
          >
            Register
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6">
          <p className="text-center text-gray-600">Or continue with</p>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 border rounded-md mt-2 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-2" /> Google
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
