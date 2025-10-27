"use client";

import Image from "next/image";
import Link from "next/link";
import { noImage } from "../utils/constants";
import Heading from "../CustomHooks/heading";

export default function FeaturedCategories({ categories }) {
  return (
    <section className="bg-white pb-12">
      <div className="md:w-8/12 w-11/12 mx-auto text-center">
        {/* Header */}
        <Heading title={`Shop popular categories.`}></Heading>
        

        {/* Categories Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories?.data?.length > 0 ? (
            categories.data.slice(0,4).map((category) => (
              <Link
                key={category.category_id}
                href={`/category/${encodeURIComponent(
                  category.category_id
                )}?category=${encodeURIComponent(category.name)}&total=${encodeURIComponent(
                  category.product_count
                )}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-3xl overflow-hidden border hover:shadow-sm transition-shadow duration-300">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={category.image_url || noImage}
                      alt={category.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-base poppins font-medium text-gray-900 group-hover:text-black">
                  {category.name}
                </h3>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full">
              No categories available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
