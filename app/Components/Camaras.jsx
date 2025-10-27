import Image from "next/image";
import React from "react";

const Camaras = () => {
  const phones = [
    {
      title: "Google Nest Cam Outdoor (wired, 2nd gen)",
      subtitle: "Outsmart the unknown with 2K and Gemini.",
      button: "Learn more",
      img: "/cam01.png",
    },
    {
      title: "Google Nest Cam Indoor (wired, 3rd gen)",
      subtitle: "More insight inside with 2K and Gemini.",
      button: "Learn more",
      img: "/cam02.png",
    },
    {
      title: "Google Nest Doorbell (wired, 3rd gen)",
      subtitle: "2K sharp. Gemini smarts. At your door.",
      button: "Learn more",
      img: "/cam03.png",
    },
  ];

  const bgColors = [
    "bg-gradient-to-br from-slate-100 to-slate-300",
    "bg-gradient-to-br from-pink-100 to-pink-200",
    "bg-gradient-to-br from-gray-100 to-gray-300",
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 mx-auto mt-5 md:mt-10">
      {phones.map((phone, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-between text-center rounded-3xl px-6 pt-10 overflow-hidden ${bgColors[index]}`}
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
  );
};

export default Camaras;
