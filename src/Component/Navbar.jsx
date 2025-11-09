import { Link, NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { ImBoxAdd } from "react-icons/im";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold border-b-2 border-primary transition-all"
      : "text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary transition-all";


  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire("Logged out!", "You have been logged out.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">

        <Link
          to="/"
          className="text-2xl font-bold text-primary tracking-wide flex items-center gap-2"
        >
          <MdPayment className="text-primary text-3xl" />
          UBM System
        </Link>


        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li>
            <NavLink to="/" className={navLinkClass}>
              <span className="flex items-center gap-2">
                <GoHomeFill className="text-lg" />
                Home
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bills" className={navLinkClass}>
              <span className="flex items-center gap-2">
                <ImBoxAdd className="text-lg" /> Bills
              </span>
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/my-pay-bills" className={navLinkClass}>
                <span className="flex items-center gap-2">
                  <MdPayment className="text-lg" /> My Pay Bills
                </span>
              </NavLink>
            </li>
          )}
        </ul>


        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 relative group">

              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
              </div>


              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap pointer-events-none">
                {user.displayName || "User"}
              </span>


              <button
                onClick={handleLogout}
                className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1"
              >
                <IoLogOut className="text-base" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1"
              >
                <IoLogIn className="text-base" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn-outline px-4 py-1.5 rounded-full text-sm font-medium"
              >
                Register
              </NavLink>
            </>
          )}
        </div>


        <div className="md:hidden">
          <button
            onClick={() =>
              document.getElementById("mobile-menu").classList.toggle("hidden")
            }
            className="text-gray-700 hover:text-primary transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>


      <div
        id="mobile-menu"
        className="hidden bg-white border-t shadow-sm md:hidden transition-all"
      >
        <ul className="flex flex-col items-start gap-3 py-4 px-6 list-none m-0">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/bills" className={navLinkClass}>
              Bills
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/my-pay-bills" className={navLinkClass}>
                My Pay Bills
              </NavLink>
            </li>
          )}
          {user ? (
            <li className="w-full">
              <button
                onClick={handleLogout}
                className="btn-primary w-full py-1.5 rounded-full mt-2 flex items-center justify-center gap-1"
              >
                <IoLogOut />
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="w-full">
                <NavLink
                  to="/login"
                  className="btn-primary w-full py-1.5 rounded-full flex items-center justify-center gap-1"
                >
                  <IoLogIn />
                  Login
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/register"
                  className="btn-outline w-full py-1.5 rounded-full flex items-center justify-center"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
