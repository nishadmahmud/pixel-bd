"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Do you sell authentic Google Pixel phones?",
    answer:
      "Yes! All Google Pixel devices we sell are 100% original and officially imported from Google’s authorized distributors. Each phone comes factory-sealed with a valid warranty.",
  },
  {
    question: "What warranty do Google Pixel phones include?",
    answer:
      "All Google Pixel smartphones include a 1-year official warranty covering manufacturing defects and software issues. Accessories like chargers and cables are covered for 6 months.",
  },
  {
    question: "Can I exchange or return my Google Pixel device?",
    answer:
      "Yes, you can request an exchange or return within 7 days of delivery if the phone is unused, sealed, and in original packaging. Used or damaged products are not eligible for return.",
  },
  {
    question: "Do you provide software updates or after-sales support?",
    answer:
      "Yes, Pixel bd ensures your device stays updated. All Google Pixel phones receive regular software and security updates directly from Google. Our team also provides post-purchase support.",
  },
  {
    question: "Is Cash on Delivery (COD) available?",
    answer:
      "Yes, Cash on Delivery is available for customers within Bangladesh. For international orders, we currently accept prepaid online payments only.",
  },
  {
    question: "How long does it take to deliver a Google Pixel phone?",
    answer:
      "For local orders, delivery usually takes 2–4 business days. International deliveries may take 7–14 business days depending on customs and courier availability.",
  },
  {
    question: "Do you offer trade-in or upgrade options for older Pixel models?",
    answer:
      "We occasionally offer trade-in and upgrade programs for select Pixel devices. Follow our social pages or check our website for upcoming offers.",
  },
  {
    question: "Are Google Pixel accessories available too?",
    answer:
      "Yes! We stock a wide range of genuine Pixel accessories such as chargers, cases, screen protectors, and earbuds — all compatible with the latest models.",
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
