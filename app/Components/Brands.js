import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading from "../CustomHooks/heading";
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";

const Brands = ({ brands }) => {
  // Render each brand logo as a link
  const renderBrands = () =>
    brands?.data?.map((item) => (
      <Link
        key={item.id}
        href={`/brands/${item.id}?brand=${item.name}`}
        className="" 
      >
        <Image
          src={item.image_path}
          alt={item.name}
          width={105}
          height={105}
          className="w-14 lg:w-[4.5rem] ml-10 lg:ml-16 object-contain"
        />
      </Link>
    ));

  // Fallback if no brands
  if (!brands?.data?.length) {
    return (
      <div className="flex flex-col items-center mt-10 lg:mt-20">
        <Heading title="Shop By Brands" />
        <p>No Brands Available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-8 lg:mt-12 w-11/12 mx-auto">
     
      <div className='grid mb-3 md:grid-cols-2 grid-cols-2 justify-between items-center'>
         <div>
           <Heading title="Shop By Brands" />
         </div>
      <div className="flex md:items-end justify-end items-start">
      

        {/* “All Brands” button */}
    
        <Link
          // href="/brands"
          href="/"
          className="flex items-center justify-center gap-1 px-4 py-1 text-sm font-medium md:text-sm roboto text-[#212121] hover:text-slate-600 transition-all"
        >
          All Brands
          <IoIosArrowForward size={17}></IoIosArrowForward>
        </Link>
     
      </div>
        </div>

      {/* Row 1: left ➜ right */}
      <Marquee gradient={true} speed={50} className="py-4">
        {renderBrands()}
      </Marquee>

      

      
    </div>
  );
};

export default Brands;
