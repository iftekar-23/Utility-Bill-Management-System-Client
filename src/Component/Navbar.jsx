import { Link, NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { ImBoxAdd } from "react-icons/im";
import { IoDocumentText, IoLogIn, IoLogOut } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        {/* Logo / Site name */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary tracking-wide flex items-center gap-2"
        >
          <MdPayment className="text-primary text-3xl" />
          UBM System
        </Link>

        {/* Nav links */}
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

        {/* Auth / Avatar */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:inline text-gray-700 font-medium">
                {user.displayName || "User"}
              </span>
              <button
                onClick={signOutUser}
                className="btn-primary px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-1"
              >
                <IoLogOut className="text-base" />
                Logout
              </button>
            </>
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

        {/* Mobile Menu Icon */}
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

      {/* Mobile Dropdown */}
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
                onClick={signOutUser}
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
