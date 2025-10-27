// 'use client';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import useStore from '../CustomHooks/useStore';
// import useSWR from 'swr';
// import { fetcher, userId } from '../(home)/utils/constants';
// import { X } from 'lucide-react';

// const PromotionModal = () => {
//   const { isOpenPromoBanner, setIsOpenPromoBanner } = useStore();
//   const [isFirstVisit, setIsFirstVisit] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);

//   // Fetch offers
//   const { data: offers, isLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`,
//     fetcher
//   );
//   const offer = offers?.data;

//   useEffect(() => {
//     const hasSeenModal = sessionStorage.getItem('hasSeenPromoBanner');
//     if (!hasSeenModal && offer?.length > 0) {
//       setIsFirstVisit(true);
//       setIsOpenPromoBanner(true);
//       sessionStorage.setItem('hasSeenPromoBanner', 'true');
//     }
//   }, [offer, setIsOpenPromoBanner]);

//   const handleClose = () => {
//     setIsOpenPromoBanner(false);
//   };

//   const lastImage = offer?.length ? offer[offer.length - 1]?.image : null;

//   if (!isOpenPromoBanner || !isFirstVisit || !offer?.length) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex justify-center items-center px-4">
//       <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-[90%] md:w-[70%] lg:w-[60%] max-w-4xl">
//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-3 right-3 z-30 bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-red-300"
//           aria-label="Close promotion"
//         >
//           <X className="w-5 h-5 text-white group-hover:text-gray-100 transition-colors duration-200" />
//         </button>

//         {/* Image Section */}
//         <div className="relative aspect-[16/8] w-full">
//           {lastImage ? (
//             <>
//               {/* Skeleton shimmer while loading */}
//               {imageLoading && (
//                 <div className="absolute inset-0 bg-gray-200 animate-pulse" />
//               )}
//               <Image
//                 src={lastImage}
//                 alt="Promo"
//                 fill
//                 className={`object-cover transition-opacity duration-500 ${
//                   imageLoading ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 priority
//                 onLoadingComplete={() => setImageLoading(false)}
//               />
//             </>
//           ) : (
//             <div className="w-full h-full bg-gray-200 animate-pulse" />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromotionModal;


'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useStore from '../CustomHooks/useStore';
import { X } from 'lucide-react';

const PromotionModal = () => {
  const { isOpenPromoBanner, setIsOpenPromoBanner } = useStore();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    // Always open the modal on page load for testing
    setIsOpenPromoBanner(true);

    // 👉 If you want to show only once per session, uncomment below:
    /*
    const hasSeenModal = sessionStorage.getItem('hasSeenPromoBanner');
    if (!hasSeenModal) {
      setIsOpenPromoBanner(true);
      sessionStorage.setItem('hasSeenPromoBanner', 'true');
    }
    */
  }, [setIsOpenPromoBanner]);

  const handleClose = () => {
    setIsOpenPromoBanner(false);
  };

  // ✅ Static image from /public/modal.png
  const staticImage = '/modal.png';

  if (!isOpenPromoBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex justify-center items-center px-4">
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-[90%] md:w-[70%] lg:w-[60%] max-w-4xl">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-30 bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Close promotion"
        >
          <X className="w-5 h-5 text-white group-hover:text-gray-100 transition-colors duration-200" />
        </button>

        {/* Image Section */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px]">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={staticImage}
            alt="Promo Banner"
            fill
            className={`object-cover transition-opacity duration-500 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority
            onLoadingComplete={() => setImageLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
