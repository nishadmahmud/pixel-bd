'use client'
import React, { useEffect, useRef, useState } from 'react';
import Heading from '../CustomHooks/heading';
import Image from 'next/image';
import useSWR from 'swr';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';
import { fetcher, userId } from '../utils/constants';

const NewArrival = ({ banner }) => {
  const { data: newArrivals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const products = newArrivals?.data?.data || [];
  const bannerImage = banner?.data?.[4];

  // 🔹 State + refs for syncing height
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [videoHeight, setVideoHeight] = useState(350);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const leftHeight = leftRef.current?.offsetHeight || 0;
      const rightHeight = rightRef.current?.offsetHeight || 0;
      const maxHeight = Math.max(leftHeight, rightHeight);
      setVideoHeight(maxHeight);
    });

    if (leftRef.current) resizeObserver.observe(leftRef.current);
    if (rightRef.current) resizeObserver.observe(rightRef.current);

    return () => resizeObserver.disconnect();
  }, [products, isLoading]);

  return (
    <div className="mt-12 w-11/12 mx-auto">
      <Heading title="New Arrival" />

      {/* Banner for mobile */}
      {bannerImage && (
        <div className="relative w-full h-52 block lg:hidden rounded-md overflow-hidden mt-6">
          <Image
            src={bannerImage?.image_path}
            alt={bannerImage.title || 'Banner'}
            fill
            className="object-cover w-full h-full rounded-md"
            quality={100}
          />
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 mt-8 items-start">
        
        {/* Left products */}
        <div ref={leftRef} className="grid grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => <CardSkeleton key={idx} />)
            : products.length > 0
            ? products.slice(0, 4).map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))
            : <p className="col-span-full text-center text-gray-500">No products</p>}
        </div>

        {/* Center video */}
        <div
          className="relative w-full lg:w-[300px] xl:w-[340px] rounded-lg overflow-hidden"
          style={{ height: videoHeight }}
        >
          <video
            src="/bannerVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right products */}
        <div ref={rightRef} className="grid grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => <CardSkeleton key={idx} />)
            : products.length > 4
            ? products.slice(4, 8).map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
