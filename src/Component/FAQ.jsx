import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FAQ = () => {
  const { isDark } = useTheme();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How secure is my financial information?",
      answer: "We use bank-level encryption and security protocols to protect your data. All transactions are processed through secure payment gateways, and we never store your complete payment information on our servers."
    },
    {
      id: 2,
      question: "What types of bills can I pay through UBM System?",
      answer: "You can pay various utility bills including electricity, gas, water, internet, cable TV, and phone bills. We're constantly adding new service providers to expand our coverage."
    },
    {
      id: 3,
      question: "Are there any fees for using UBM System?",
      answer: "Basic bill management and payment services are free. Some premium features like advanced analytics and priority support may have minimal fees, which are clearly disclosed upfront."
    },
    {
      id: 4,
      question: "Can I set up automatic payments?",
      answer: "Yes! You can set up automatic payments for any of your bills. You'll receive notifications before each payment is processed, and you can modify or cancel auto-pay at any time."
    },
    {
      id: 5,
      question: "What happens if a payment fails?",
      answer: "If a payment fails, you'll be immediately notified via email and SMS. We'll automatically retry the payment once, and provide you with alternative payment options to avoid late fees."
    },
    {
      id: 6,
      question: "Can I access my account from multiple devices?",
      answer: "Absolutely! Your account syncs across all devices. You can access UBM System from your computer, tablet, or smartphone with the same login credentials."
    },
    {
      id: 7,
      question: "How do I get customer support?",
      answer: "We offer 24/7 customer support through live chat, email, and phone. You can also access our comprehensive help center with step-by-step guides and video tutorials."
    },
    {
      id: 8,
      question: "Can I download payment receipts and reports?",
      answer: "Yes, you can download detailed payment receipts, monthly statements, and annual reports in PDF format. These are perfect for record-keeping and tax purposes."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="section-padding" id="faq">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaQuestionCircle className="text-3xl text-blue-600" />
            <h2 className="heading-lg">Frequently Asked Questions</h2>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Find answers to common questions about UBM System. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card mb-4 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={`w-full p-6 text-left flex items-center justify-between hover:bg-opacity-50 transition-all ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <h3 className={`text-lg font-semibold pr-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <FaChevronDown />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 pb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;