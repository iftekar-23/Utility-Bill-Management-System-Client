import { Link } from "react-router";
import { MdPayment } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary mb-3"
          >
            <MdPayment className="text-primary text-3xl" />
            UBM System
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            UBM System helps you manage bills, payments, and records easily with a
            secure and intuitive interface. Stay organized, stay efficient.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-primary transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/bills"
                className="text-gray-600 hover:text-primary transition-all"
              >
                Bills
              </Link>
            </li>
            <li>
              <Link
                to="/my-pay-bills"
                className="text-gray-600 hover:text-primary transition-all"
              >
                My Pay Bills
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary transition-all"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-gray-600 hover:text-primary transition-all"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / About */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We’re passionate about simplifying your digital payment experience.
            Our mission is to make bill tracking and payment management effortless
            for individuals and businesses alike.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 text-center py-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} UBM System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
