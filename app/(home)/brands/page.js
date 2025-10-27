"use client";
import React, { useEffect, useState } from "react";
import "react-range-slider-input/dist/style.css";
import Link from "next/link";
import Image from "next/image";
import noImg from '/public/no-image.jpg'
import { userId } from "@/app/utils/constants";

const Page = () => {
  const [selectAlph, setSelectedAlph] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const fetchBrandsByAlphabet = async (alphabet) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/public/alphabetic-brands`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alphabet,
          user_id: userId,
        }),
      });

      const data = await response.json();
      setFilteredItems(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      setFilteredItems([]);
    }
  };

  useEffect(() => {
    fetchBrandsByAlphabet(selectAlph);
  }, [selectAlph]);

  return (
    <div className="md:px-12 p-5">
      <div className="pt-2">
        <h3 className="text-black font-semibold textz-3xl mb-5">All Brands</h3>
        <div className="flex flex-wrap gap-3 mb-5">
          <p
            onClick={() => setSelectedAlph('')}
            className={`text-base cursor-pointer py-[2px] px-3 rounded-md hover:bg-[#0a0a0a] ${!selectAlph ? 'bg-[#0d0d0d] text-white' : 'text-black'}`}
          >
            All
          </p>
          {alphabets.map((item, idx) => (
            <p
              onClick={() => setSelectedAlph(item)}
              key={idx}
              className={`text-base cursor-pointer lg:hover:bg-[#12457f41] py-[2px] px-3 rounded-md ${item === selectAlph ? "bg-[#1a1a1a] text-white" : "bg-transparent text-black"}`}
            >
              {item}
            </p>
          ))}
        </div>
        <hr className="border-[#141414] w-full lg:w-[80%] border-2" />
        <div className="flex lg:gap-3 flex-wrap items-center">
          {filteredItems.length > 0 ? (
            filteredItems.map((brand, idx) => (
              <Link href={`/brands/${brand.id}?brand=${brand.name}`} key={idx}>
                <button className="flex items-center gap-3 font-semibold text-black text-sm rounded-full px-2 py-1 hover:text-gray-500 transition-transform duration-300 hover:filter hover:grayscale-[70%]">
                  <Image
                    alt={brand.name}
                    src={brand.image_path || noImg}
                    width={70}
                    height={70}
                    className="inherit"
                  />
                  {brand.name}
                </button>
              </Link>
            ))
          ) : (
            <p className="text-center mt-5 text-black">No brand Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
