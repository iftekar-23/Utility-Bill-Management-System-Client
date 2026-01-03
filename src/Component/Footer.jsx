import { Link } from "react-router";
import { MdPayment, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaGithub } from "react-icons/fa6";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "Bills", to: "/bills" },
    { name: "Add Bill", to: "/add-bill" },
    { name: "Help & Support", to: "/help" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms of Service", to: "/terms" },
    { name: "Cookie Policy", to: "/cookies" },
    { name: "Refund Policy", to: "/refund" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={18} />,
      url: "https://facebook.com/ubmsystem",
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter",
      icon: <FaXTwitter size={18} />,
      url: "https://twitter.com/ubmsystem",
      color: "hover:text-gray-800"
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={18} />,
      url: "https://instagram.com/ubmsystem",
      color: "hover:text-pink-600"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={18} />,
      url: "https://linkedin.com/company/ubmsystem",
      color: "hover:text-blue-700"
    },
    {
      name: "GitHub",
      icon: <FaGithub size={18} />,
      url: "https://github.com/ubmsystem",
      color: "hover:text-gray-800"
    }
  ];

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-700' : 'bg-gradient-to-b from-gray-50 to-white border-gray-200'} border-t mt-20`}>
      {/* Main Footer Content */}
      <div className="container-max px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-4 hover:text-blue-700 transition-colors"
            >
              <MdPayment className="text-blue-600 text-3xl" />
              UBM System
            </Link>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-6 max-w-sm`}>
              Simplifying utility bill management with secure, efficient, and user-friendly solutions. 
              Your trusted partner for seamless bill payments and financial organization.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MdEmail className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <a 
                  href="mailto:support@ubmsystem.com" 
                  className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  support@ubmsystem.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <a 
                  href="tel:+1-800-UBM-HELP" 
                  className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
                >
                  +1 (800) UBM-HELP
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MdLocationOn className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  123 Tech Street, Digital City, DC 12345
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-6`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200 flex items-center gap-2 group`}
                  >
                    <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-6`}>
              Legal & Privacy
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className={`text-sm ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-200 flex items-center gap-2 group`}
                  >
                    <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-6`}>
              Stay Connected
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Follow us on social media for updates, tips, and exclusive offers.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' 
                      : 'bg-gray-100 hover:bg-white text-gray-600'
                  } ${social.color} transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="space-y-2">
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2`}>
                <span>🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2`}>
                <span>🛡️</span>
                <span>Bank-Level Security</span>
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2`}>
                <span>⚡</span>
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="container-max px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center md:text-left`}>
              <p>
                © {currentYear}{" "}
                <span className="font-semibold text-blue-600">UBM System</span>. 
                All rights reserved. | Made with ❤️ for better bill management.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/accessibility" 
                className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
              >
                Accessibility
              </Link>
              <Link 
                to="/sitemap" 
                className={`${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
              >
                Sitemap
              </Link>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                v2.1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;