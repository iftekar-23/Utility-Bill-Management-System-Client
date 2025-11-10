import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-2xl font-semibold text-gray-600">
          Please login to view your profile.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-3xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.displayName || "Anonymous User"}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Joined:</strong> {new Date().toLocaleDateString()}
          </p>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:scale-105 transition-transform">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
