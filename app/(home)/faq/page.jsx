"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is the warranty period for your smartphones?",
    answer:
      "All our smartphones come with a 1-year official manufacturer warranty covering hardware defects and software malfunctions. Accessories are covered for 6 months.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we deliver across multiple countries. Shipping fees and delivery times vary based on location. You can view estimated delivery times during checkout.",
  },
  {
    question: "Can I return or exchange my phone?",
    answer:
      "Yes, you can request a return or exchange within 7 days of delivery if the product is unused and in original packaging. Damaged or used items are not eligible.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 2-5 business days within the country. For international orders, it may take 7-14 business days depending on customs and courier availability.",
  },
  {
    question: "Do you sell refurbished or used phones?",
    answer:
      "No, we only sell brand-new and sealed devices directly from authorized distributors and manufacturers.",
  },
  {
    question: "Is Cash on Delivery available?",
    answer:
      "Yes, Cash on Delivery (COD) is available for local orders. For international deliveries, prepaid payment is required.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="md:text-3xl text-2xl font-bold text-center mb-10 text-gray-800">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xs border-b border-gray-300 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full px-5 py-4 text-left focus:outline-none hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
