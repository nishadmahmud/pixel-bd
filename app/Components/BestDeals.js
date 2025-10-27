'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../CustomHooks/heading';
import useSWR from 'swr';
import CardSkeleton from './CardSkeleton';
import ProductCard from './ProductCard';
import { fetcher, userId } from '../utils/constants';
import Link from 'next/link';

const BestDeals = () => {
  const swrConfig = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true, 
    dedupingInterval: 1000 * 60 * 10, 
    focusThrottleInterval: 1000 * 60 * 10, 
    shouldRetryOnError: false,
  };

  const { data: bestDeals, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/best-deals/${userId}`,
    fetcher,
    swrConfig
  );

  const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 1024); 
      handleResize(); 
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  

  return (
    <div className='md:mt-8 mt-5 w-11/12 mx-auto'>
        <div className='grid mb-3 md:grid-cols-2 grid-cols-2 justify-between items-center'>

         <div>
           <Heading title="Best Deals" />
         </div>
      <div className="flex md:items-end justify-end items-start">
        

        <Link  
        // href="/"
        href="/best-deals"
        
        >
          <button className="text-black font-medium bg-slate-200 border border-slate-400 text-xs px-6 py-1.5 rounded">
            See All
          </button>
        </Link>
      </div>
        </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))
        ) : bestDeals?.data?.length > 0 ? (
          bestDeals?.data
        ?.slice(0, isMobile ? 4 : 5)
        .map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))
        ) : (
          <p className='text-center text-gray-600'>No products found</p>
        )}
      </div>
     
    </div>
  );
};

export default BestDeals;
