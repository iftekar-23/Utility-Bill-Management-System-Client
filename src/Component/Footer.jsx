import { Link } from "react-router";
import { MdPayment } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-3 hover:text-blue-700 transition-colors"
          >
            <MdPayment className="text-blue-600 text-3xl" />
            UBM System
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
            UBM System helps you manage bills, payments, and records easily with a
            secure and intuitive interface. Stay organized, stay efficient.
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 transition-all shadow-sm"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white text-gray-700 transition-all shadow-sm"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-600 hover:text-white text-pink-600 transition-all shadow-sm"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-700 hover:text-white text-blue-700 transition-all shadow-sm"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", to: "/" },
              { name: "Bills", to: "/bills" },
              { name: "My Pay Bills", to: "/my-pay-bills" },
              { name: "Login", to: "/login" },
              { name: "Register", to: "/register" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            We’re passionate about simplifying your digital payment experience.
            Our mission is to make bill tracking and payment management effortless
            for individuals and businesses alike.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 text-center py-5 bg-gray-50">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-blue-600">UBM System</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
