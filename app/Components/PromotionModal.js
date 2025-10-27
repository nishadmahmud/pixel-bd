'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useStore from '../CustomHooks/useStore';
import { IoClose } from 'react-icons/io5';
import { FadeLoader } from 'react-spinners';
import useSWR from 'swr';
import { X } from 'lucide-react';
import { fetcher, userId } from '../utils/constants';

const PromotionModal = () => {
  const { isOpenPromoBanner, setIsOpenPromoBanner } = useStore();
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Fetch offers
  const { data: offers, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`,
    fetcher
  );
  const offer = offers?.data;


  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenPromoBanner');
    if (!hasSeenModal && offer?.length > 0) {
      setIsFirstVisit(true);
      setIsOpenPromoBanner(true);
      sessionStorage.setItem('hasSeenPromoBanner', 'true');
    }
  }, [offer, setIsOpenPromoBanner]);

  const handleClose = () => {
    setIsOpenPromoBanner(false);
  };

  const lastImage = offer?.length ? offer[offer.length - 1]?.image : null;


  if (!isOpenPromoBanner || !isFirstVisit || !offer?.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex justify-center items-center px-4">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl md:w-96 md:h-[30rem] w-80 h-[25rem]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 bg-red-500 hover:bg-red-600 p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Close promotion"
        >
          <X className="w-4 h-4 text-white group-hover:text-gray-100 transition-colors duration-200" />
        </button>

        {/* Image Section */}
        <div className="relative md:w-96 md:h-[30rem] w-80 h-[25rem]">
          {lastImage ? (
            <Image
              src={lastImage}
              alt="Promo"
              fill
              
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <FadeLoader color="#EB0439" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
