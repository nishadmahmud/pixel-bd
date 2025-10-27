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
          🚚 Delivery Terms & Conditions
        </h1>
        <p className="text-gray-600 text-center text-base font-bangla">
          অর্ডার, অগ্রিম প্রদান এবং ডেলিভারি সম্পর্কিত শর্তাবলী
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
        অর্ডার এর অগ্রিম গ্রহণ এবং ডেলিভারি চার্জ সংক্রান্ত নিয়মাবলী (সীমিত সময়ের জন্য)
      </motion.h3>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="space-y-6 text-gray-700 leading-relaxed bg-white p-6 md:p-10 rounded-2xl shadow-md"
      >
        <div>
          <p className="font-medium text-gray-800 font-bangla">
            ১. যেকোনো পণ্যের অর্ডার গ্রহণের ক্ষেত্রে অগ্রিম গ্রহণের পরিমাণ :
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 font-bangla">
            <li className="font-bangla">
              ১ থেকে ১০০০ টাকা মূল্যের যেকোনো পণ্যের জন্য ডেলিভারি চার্জসহ ফুল পেমেন্ট করতে হবে।
            </li>
            <li className="font-bangla">
              পণ্যের মূল্য যদি ১০০০ টাকার অধিক হয় সেক্ষেত্রে পণ্যের ধরন বেধে ২০% পর্যন্ত অগ্রিম পেমেন্ট করতে হবে।
            </li>
            <li className="font-bangla">
              সপ থেকে পণ্য পিকাপের ক্ষেত্রেও পণ্যের ধরন বেধে অগ্রিম পেমেন্ট করতে হবে।
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-800 font-bangla">
            ২. যেকোনো পণ্যের প্রি-অর্ডার করে গ্রহণের ক্ষেত্রে অগ্রিম গ্রহণের পরিমাণ :
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li className="font-bangla">পণ্য অনুযায়ী নির্ধারণ করা হবে।</li>
          </ul>
        </div>

        <div>
          <p className="font-bangla">
            ৩. প্রি-অর্ডারকৃত পণ্য সরবরাহ করতে সাধারণত আমাদের ৭-১০ কর্মদিবস সময় লাগে। কিছু ক্ষেত্রে, ১৫-২০ কর্মদিবস পর্যন্তও সময় লাগতে পারে।
          </p>
        </div>

        <div>
          <p className="font-bangla">
            ৪. আন্তর্জাতিক বাজারে পণ্যের মূল্য পরিবর্তিত হতে পারে, সেক্ষেত্রে প্রি-অর্ডারকৃত পণ্যের সাথে অতিরিক্ত মূল্য যোগ করতে হবে অথবা অগ্রিম প্রদানকৃত মূল্য ফেরত নেওয়া যাবে।
          </p>
        </div>

        <div>
          <p className="font-bangla">
            ৫. ঢাকা সিটির ভিতরে (নির্দিষ্ট এলাকায়) যেকোনো এক্সেসরিজ আইটেম ক্যাশ অন ডেলিভারি এর মাধ্যমে নেওয়া হলে সেক্ষেত্রে ডেলিভারি চার্জ ৬০/- টাকা এবং ৭২ ঘন্টার মধ্যে ডেলিভার করা হবে (ক্ষেত্র বিশেষে পরিবর্তন হতে পারে কুরিয়ার কোম্পানির নিয়ম অনুযায়ী)।
          </p>
        </div>

        <div>
          <p className="font-bangla">
            ৬. ঢাকার বাইরে যেকোনো ডিভাইসের জন্য যদি পার্শিয়াল পেমেন্ট করা হয় সেক্ষেত্রে ডেলিভারি চার্জ ২২০/- টাকা পর্যন্ত এবং সাথে কন্ডিশন চার্জ প্রযোজ্য হবে কুরিয়ার কোম্পানির নিয়ম অনুযায়ী।
          </p>
        </div>

        <div>
          <p className="font-bangla">
            ৭. ঢাকার বাইরে যেকোনো এক্সেসরিজের জন্য যদি পার্শিয়াল পেমেন্ট করা হয় সেক্ষেত্রে ডেলিভারি চার্জ ১৩০/- টাকা পর্যন্ত এবং সাথে কন্ডিশন চার্জ প্রযোজ্য হবে কুরিয়ার কোম্পানির নিয়ম অনুযায়ী।
          </p>
        </div>

        <div>
          <p className="font-bangla">
            ৮. ঢাকার বাইরে বিভাগীয় ও জেলা শহর ব্যতিত সকল উপজেলা, থানা ইত্যাদি পর্যায়ে পন্যের ডেলিভারির ক্ষেত্রে অবশ্যই ডেলিভারি চার্জ সহ ফুল পেমেন্ট বাধ্যতামূলক।
            <span className="font-semibold text-gray-900 font-bangla">
              {" "}
              ( কারণ সুন্দরবন কুরিয়ার সার্ভিস জেলা ব্যতিত উপজেলা, থানা পর্যায়ে কোনো ধরনের আর্থিক লেনদেন করবে না )
            </span>
          </p>
        </div>

        <div>
          <p className="font-bangla">৯. ঢাকার বাইরে বিভাগীয় ও জেলা শহর ব্যতিত উপজেলা বা থানা পর্যায়ে ডিভাইস ডেলিভারি করা হয় না।</p>

          <p className="mt-2">
            <span className="text-gray-900 font-semibold font-bangla">বি:দ্র:</span> যেকোনো
            পণ্যের অর্ডার অবশ্যই বিকাল ৫.০০টার মধ্যে প্লেস করতে হবে। বিকাল
            ৫.০০টার পর কোনো পণ্যের অর্ডার পরবর্তী দিনের অর্ডার হিসেবে গণ্য করা
            হবে।
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
