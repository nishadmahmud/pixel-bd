// import React from 'react';

// const ProductBannerOne = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default ProductBannerOne;


"use client";
import Image from "next/image";

export default function ProductBannerOne({banner}) {

  console.log(banner);

  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between md:w-9/12 w-10/12 mx-auto py-16 bg-white">
      {/* Left Text Section */}
      <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
        <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-6 poppins">
          Galaxy XR
        </h2>
        <h3 className="text-3xl sm:text-5xl font-medium text-gray-800 mb-6 roboto">
          A new way to <br className="hidden sm:block" /> see, explore, and
          <br className="hidden sm:block" /> understand your world
        </h3>
        <p className="text-gray-700 text-base sm:text-lg mb-8 open-sans">
          Extend reality with your AI-powered headset. Engineered by Samsung and
          built on Android XR.
        </p>
        <button className="px-6 py-3 border border-gray-800 rounded-full text-gray-900 hover:bg-gray-200 hover:text-black transition font-medium">
          Learn more
        </button>
      </div>

      {/* Right Image Section */}
      <div className="lg:w-1/2 flex justify-center">
        <div>
          <Image
            src={`${banner[0].image_path}`}
            alt="Galaxy XR Headset"
            className="rounded-2xl object-cover"
            width={500}
            height={400}
            priority
          />
        </div>
      </div>
    </section>
  );
}
