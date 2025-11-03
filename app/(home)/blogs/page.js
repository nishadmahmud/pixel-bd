"use client";

import { useRef } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { fetcher, userId } from "@/app/utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Blogs() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/latest-ecommerce-blog-list/${userId}`,
    fetcher
  );

  if (error) return <p className="text-center py-20">Failed to load blogs.</p>;
  if (!data) return <p className="text-center py-20">Loading blogs...</p>;

  const blogs = data?.data || [];

  return (
    <main className="md:w-9/12 w-10/12 mx-auto pt-16 text-black poppins">
      <h1 className="text-3xl font-medium text-center mb-12 poppins">
        Discover the world of Pixel.
      </h1>

      <div className="relative px-8">
        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 border"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          ref={nextRef}
          className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 border"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div className="bg-white overflow-hidden flex flex-col text-center h-full">
                <div className="relative w-full h-64 rounded-3xl">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-lg font-medium poppins">{blog.title}</h3>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-blue-600 font-medium hover:underline inline-flex justify-center poppins"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
