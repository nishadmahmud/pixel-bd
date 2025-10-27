'use client'

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import Loader from "@/app/Components/Loader";
import { fetcher, userId } from "@/app/utils/constants";

const Page = () => {

  const {data : offers, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_API}/latest-ecommerce-offer-list/${userId}`,fetcher)

  return (
    <div className="grid min-h-screen lg:grid-cols-3 md:grid-cols-2 w-11/12 pt-2 pb-5 gap-5 mx-auto">
        {isLoading ? <Loader />
        : offers?.data && offers?.data.length > 0 ? 
        offers.data.map((offer,idx)=>(
           <div key={idx} className="bg-white text-black shadow-lg rounded-lg overflow-hidden p-6 flex flex-col relative">
           <Image  width={100} height={100} src={offer.image} alt={offer.title} className="w-full h-64 object-cover rounded-lg" />
           <h2 className="text-2xl font-bold mt-4">{offer.title}</h2>
           <div className="mt-4 text-gray-700 flex-grow" dangerouslySetInnerHTML={{ __html: offer.description }}></div>
         
           {/* Button Positioned at the Bottom */}
           <Link href={`/offer/${offer.brand_id}`} className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-center">
             <button className="bg-[#232323] text-white px-4 py-2 w-full rounded-md font-semibold">Details</button>
           </Link>
         </div>
        )) : 
        <p className="text-red-600 text-center lg:mt-10 md:mt-16 mt-28">No offer available</p>
        }
    </div>
  );
};

export default Page;
