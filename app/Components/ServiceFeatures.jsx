"use client";
import { Calculator, Truck, RefreshCw, ThumbsUp, Headphones } from "lucide-react";

export default function ServiceFeatures() {
  // Only show first 4 items on mobile, all 5 on large screens
  const allFeatures = [
    { icon: <Calculator className="text-purple-500 md:w-6 md:h-6 w-4 h-4" />, text: "36 Months EMI" },
    { icon: <Truck className="text-yellow-500 md:w-6 md:h-6 w-4 h-4" />, text: "Fastest Delivery" },
    { icon: <RefreshCw className="text-green-500 md:w-6 md:h-6 w-4 h-4" />, text: "Exchange Facility" },
    { icon: <ThumbsUp className="text-rose-500 md:w-6 md:h-6 w-4 h-4" />, text: "Best Price Deals" },
    { icon: <Headphones className="text-orange-500 md:w-6 md:h-6 w-4 h-4" />, text: "After Sell Service" },
  ];

  return (
    <div className="w-full bg-gray-50 rounded-xl shadow-sm border grid grid-cols-2 lg:grid-cols-5 items-center justify-between py-5 px-6 gap-4">
      {allFeatures.map((feature, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 text-gray-800 ${
            index > 3 ? "hidden lg:flex" : ""
          }`} // hide 5th item on mobile, show on lg
        >
          {feature.icon}
          <span className="md:text-sm text-xs font-medium">{feature.text}</span>
        </div>
      ))}
    </div>
  );
}
