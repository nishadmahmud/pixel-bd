"use client";
import Image from "next/image";
import React from "react";

const phones = [
  {
    title: "Google Pixel 10 Pro and Pro XL",
    subtitle: "Meet the new status pro.",
    button: "Learn more",
    img: "/pixel1 (1).png",
  },
  {
    title: "Google Pixel 10 Pro Fold",
    subtitle: "Unfold extraordinary.",
    button: "Learn more",
    img: "/pixel1 (2).png",
  },
  {
    title: "Google Pixel 10",
    subtitle: "Do spectacular, on the regular.",
    button: "Learn more",
    img: "/pixel1 (3).png",
  },
];

const accessories = [
  {
    title: "Google Pixel Watch 4",
    subtitle: "Precision crafted. Performance ready.",
    button: "Learn more",
    img: "/screenshot.png", // replace with your watch image
  },
  {
    title: "Google Pixel Buds Pro 2",
    subtitle: "Light ears ahead.",
    button: "Learn more",
    img: "/screenshot__1_-removebg-preview.png", // replace with your buds image
  },
];

const PixelShowcase = () => {
  return (
    <div className="w-11/12 mx-auto space-y-5 pb-20">
      {/* Top Section - Phones */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {phones.map((phone, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between text-center rounded-3xl px-6 pt-10 bg-gray-200 overflow-hidden"
          >
            <div className="space-y-4 mb-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium poppins text-gray-900">
                {phone.title}
              </h2>
              <p className="text-gray-700 mt-2">{phone.subtitle}</p>
              <button className="mt-4 border border-gray-800 px-5 py-2 rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition">
                {phone.button}
              </button>
            </div>
            <div className="relative w-full h-[400px] md:h-[350px]">
              <Image
                src={phone.img}
                alt={phone.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Section - Accessories */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {accessories.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between text-center rounded-3xl px-6 pt-10 bg-gray-200 overflow-hidden"
          >
            <div className="space-y-4 mb-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium poppins text-gray-900">
                {item.title}
              </h2>
              <p className="text-gray-700 mt-2">{item.subtitle}</p>
              <button className="mt-4 border border-gray-800 px-5 py-2 rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition">
                {item.button}
              </button>
            </div>
            <div className="relative w-full h-[400px] md:h-[350px]">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PixelShowcase;
