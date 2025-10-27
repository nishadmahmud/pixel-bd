"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";

const HeroSlider = ({ slider }) => {
  const sanitizeSlug = (str) =>
    str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-gradient-to-b from-slate-100 to-white py-10">
      {/* ===== Top Text Section ===== */}
      <div className="text-center md:my-8 mb-5 md:mb-8 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900">
          Ask more of <br></br> your phone.
        </h1>
        <p className="mt-5 font-medium text-gray-600 md:text-base text-sm">
          The Google Pixel 10 series is here. Say hello to your new phone.
        </p>
        <div className="flex justify-center gap-4 mt-5">
          <Link
            href="http://localhost:3000/category/7658?category=Phone"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 transition"
          >
            Browse phones
          </Link>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            Watch the spot <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* ===== Slider Section ===== */}
      <div className="mx-auto md:w-9/12 w-10/12">
        <div className="grid grid-cols-1">
          {/* Left - Hero Slider */}
          <div className="relative">
            <div className="group relative h-[35vh] md:h-[80vh] lg:h-[90vh] overflow-hidden rounded-xl">
              <button
                ref={prevRef}
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1.5 text-gray-800 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-white sm:left-4 sm:p-2"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <button
                ref={nextRef}
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-1.5 text-gray-800 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-white sm:right-4 sm:p-2"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{
                  clickable: true,
                  bulletClass: "swiper-pagination-bullet !bg-white/60",
                  bulletActiveClass:
                    "swiper-pagination-bullet-active !bg-white",
                }}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  if (
                    swiper.params.navigation &&
                    typeof swiper.params.navigation !== "boolean" &&
                    prevRef.current &&
                    nextRef.current
                  ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }
                }}
                loop={true}
                speed={800}
                className="h-full w-full"
              >
                {slider?.status === 200 &&
                  slider?.data?.[0]?.image_path?.map((img, idx) => {
                    const product = slider?.data?.[0]?.products?.[idx];
                    const slug = sanitizeSlug(
                      product?.brand_name || product?.name
                    );
                    const productLink = `/products/${slug}/${product?.id}`;
                    return (
                      <SwiperSlide key={idx}>
                        <Link href={productLink}>
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`slider-image-${idx}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="cursor-pointer"
                            priority
                            quality={100}
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>

        
        </div>
      </div>

     
    </section>
  );
};

export default HeroSlider;
