import { Link, NavLink } from "react-router";
import { useState, useEffect, useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import { ImBoxAdd } from "react-icons/im";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#f1f5f9";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#0f172a";
    }
  }, [theme]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 transition-all"
      : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all";

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
          .then(() =>
            Swal.fire("Logged out!", "You have been logged out.", "success")
          )
          .catch((err) => Swal.fire("Error!", err.message, "error"));
      }
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide flex items-center gap-2"
        >
          <MdPayment className="text-blue-600 text-3xl" />
          UBM System
        </Link>

        
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li>
            <NavLink to="/" className={navLinkClass}>
              <span className="flex items-center gap-2">
                <GoHomeFill className="text-lg" /> Home
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
          {user && (
            <li>
              <NavLink to="/profile" className={navLinkClass}>
                <span className="flex items-center gap-2">
                  <FaUserCircle className="text-lg" /> Profile
                </span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/help" className={navLinkClass}>
              <span className="flex items-center gap-2">
                <AiOutlineQuestionCircle className="text-lg" /> Help
              </span>
            </NavLink>
          </li>
        </ul>

      
        <div className="hidden md:flex items-center gap-3">
        
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            {theme === "light" ? (
              <BsMoonStarsFill className="text-lg text-gray-700" />
            ) : (
              <BsSunFill className="text-lg text-yellow-400" />
            )}
          </button>

          {user ? (
            <>
            
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-blue-700 transition"
              >
                <IoLogOut />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1"
              >
                <IoLogIn /> Login
              </NavLink>
              <NavLink
                to="/register"
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-50 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

       
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-blue-600 transition-all"
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
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm transition-all">
          <ul className="flex flex-col items-start gap-4 py-4 px-6 list-none m-0">
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
              <>
                <li>
                  <NavLink to="/my-pay-bills" className={navLinkClass}>
                    My Pay Bills
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={navLinkClass}>
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/help" className={navLinkClass}>
                Help
              </NavLink>
            </li>

          
            <li className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                {theme === "light" ? (
                  <BsMoonStarsFill className="text-lg text-gray-700" />
                ) : (
                  <BsSunFill className="text-lg text-yellow-400" />
                )}
              </button>
            </li>

            
            {user ? (
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 w-full text-white py-2 rounded-full mt-3 flex items-center justify-center gap-1"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            ) : (
              <>
                <li className="w-full">
                  <NavLink
                    to="/login"
                    className="bg-blue-600 w-full text-white py-2 rounded-full flex items-center justify-center gap-1"
                  >
                    <IoLogIn /> Login
                  </NavLink>
                </li>
                <li className="w-full">
                  <NavLink
                    to="/register"
                    className="border border-blue-600 w-full py-2 rounded-full flex items-center justify-center text-blue-600"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
