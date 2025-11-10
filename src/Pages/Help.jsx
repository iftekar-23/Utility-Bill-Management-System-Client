import React from "react";
import { HelpCircle } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How can I pay my utility bills?",
      answer:
        "Go to the Bills page, choose the bill you want to pay, and click 'Pay Bill'. You can only pay bills from the current month.",
    },
    {
      question: "Can I register multiple accounts?",
      answer:
        "Each email can be registered only once. You can update your profile anytime from the Profile page.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "Click on the 'Forgot Password?' link on the Login page to reset your password through email.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-16 p-8 bg-white shadow-lg rounded-3xl">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <HelpCircle className="text-blue-500 w-8 h-8" />
        <h1 className="text-4xl font-bold text-gray-800">Help & FAQ</h1>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
