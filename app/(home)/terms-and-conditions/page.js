"use client";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 mt-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          🛡️ Warranty Terms & Conditions
        </h1>
        <p className="text-gray-600 text-center text-base font-bangla">
          ওয়ারেন্টি সংক্রান্ত শর্তাবলী
        </p>
        <div className="mt-6 border-b border-gray-300 w-full"></div>
      </motion.div>

      {/* Section Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-semibold text-lg md:text-xl text-gray-800 text-center mt-12 mb-6 font-bangla"
      >
        ব্যবহৃত ডিভাইসের রিপ্লেসমেন্ট ও সার্ভিস ওয়ারেন্টি সম্পর্কিত নিয়মাবলী
      </motion.h3>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-6 text-gray-700 leading-relaxed bg-white p-6 md:p-10 rounded-2xl shadow-md"
      >
        {/* English + Bangla Warranty Terms */}

        <div>
          <p className="font-medium text-gray-800">10 Days Replacement Warranty (Used Devices)</p>
          <p className="text-sm text-gray-700 mt-1">WE PROVIDE 10 DAYS REPLACEMENT WARRANTY FOR USED DEVICES (Without Display & Motherboard).</p>
          <p className="mt-2 font-bangla text-gray-700">আমরা ব্যবহৃত ডিভাইসের জন্য ১০ দিনের রিপ্লেসমেন্ট ওয়ারেন্টি প্রদান করি (ডিসপ্লে ও মাদারবোর্ড ব্যতীত)।</p>
        </div>

        <div>
          <p className="font-medium text-gray-800">Lifetime Service Warranty</p>
          <p className="text-sm text-gray-700 mt-1">LIFETIME SERVICE WARRANTY WITHOUT PARTS.</p>
          <p className="mt-2 font-bangla text-gray-700">লাইফটাইম সার্ভিস ওয়ারেন্টি দেওয়া হবে (পার্টস ছাড়া)।</p>
        </div>

        <div>
          <p className="font-medium text-gray-800">Warranty Voiding Conditions</p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
            <li>Physical, water, or software damage will void the warranty.</li>
            <li>No warranty will be provided if the product has been opened or serviced elsewhere.</li>
          </ul>

          <ul className="list-disc pl-6 mt-2 space-y-2 font-bangla text-gray-700">
            <li>ডিভাইসে শারীরিক, পানির অথবা সফটওয়্যারজনিত ক্ষতি হলে ওয়ারেন্টি বাতিল হবে।</li>
            <li>পণ্যটি অন্য কোথাও খোলা বা সার্ভিস করলে কোনো ওয়ারেন্টি প্রদান করা হবে না।</li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-800">Issues Not Covered Under Warranty</p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
            <li>Battery issues</li>
            <li>Back glass or body damages</li>
            <li>Display spots</li>
            <li>Internal scratches or any internal issues</li>
            <li>Software issues</li>
          </ul>

          <ul className="list-disc pl-6 mt-2 space-y-2 font-bangla text-gray-700">
            <li>ব্যাটারি সংক্রান্ত সমস্যা</li>
            <li>ব্যাক গ্লাস বা বডির ক্ষতি</li>
            <li>ডিসপ্লেতে স্পট</li>
            <li>ইন্টার্নাল স্ক্র্যাচ বা যেকোনো অভ্যন্তরীণ সমস্যা</li>
            <li>সফটওয়্যারজনিত সমস্যা</li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-800">Replacement Processing Time</p>
          <p className="text-sm text-gray-700 mt-1">For replacement, at least 2–3 days’ processing time is required, and no temporary device will be provided.</p>
          <p className="mt-2 font-bangla text-gray-700">রিপ্লেসমেন্ট পেতে কমপক্ষে ২-৩ দিনের সময় লাগবে এবং এই সময়ে কোনো অস্থায়ী ডিভাইস প্রদান করা হবে না।</p>
        </div>

        <div>
          <p className="font-medium text-gray-800">Accessories Not Covered</p>
          <p className="text-sm text-gray-700 mt-1">UV Glass or any accessories are not covered under warranty.</p>
          <p className="mt-2 font-bangla text-gray-700">UV গ্লাস বা যেকোনো এক্সেসরিজ ওয়ারেন্টির আওতায় নয়।</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
