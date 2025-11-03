"use client";
import React, { useState, useRef } from "react";
import Heading from "../CustomHooks/heading";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fetcher, userId } from "../utils/constants";
import CardSkeleton from "./CardSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="lg:my-12 my-8 md:w-9/12 w-10/12 mx-auto">
      <Heading title={"Popular on the Pixel Bd."} />

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="relative mt-8">
          {/* Custom navigation buttons */}
          <button
            onClick={handlePrev}
            className={`absolute md:-left-20 -left-10 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-md border bg-white hover:bg-gray-100 transition ${
              activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <ChevronLeft color="black" className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className={`absolute md:-right-20 -right-10 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-md border bg-white hover:bg-gray-100 transition`}
          >
            <ChevronRight color="black" className="w-5 h-5" />
          </button>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            modules={[Navigation]}
            slidesPerView={5}
            spaceBetween={25}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 3, spaceBetween: 15 },
              1024: { slidesPerView: 5, spaceBetween: 25 },
            }}
            className="pb-6"
          >
            {products?.data?.length > 0 ? (
              products?.data.slice(0,10).map((product) => (
                <SwiperSlide key={product.id}>
                 <ProductCard product={product}></ProductCard>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center w-full py-8">No products found</p>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
