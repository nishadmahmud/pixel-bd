"use client";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "@smastrom/react-rating/style.css";
import Heading from "../CustomHooks/heading";
import useSWR from "swr";
import CardSkeleton from "./CardSkeleton";
import ProductCard from "./ProductCard";
import { fetcher, userId } from "../utils/constants";

const TopBrandProducts = ({brands}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const {data : pdcByBrands,isLoading} =  useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/brandwise-products/${tabIndex === 0 ? 0 : brands?.data[tabIndex - 1]?.id}/${userId}`,fetcher,{
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div className="mt-12 w-11/12 mx-auto">
      <Heading title={"Top Brand Products"} />

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="mt-5 overflow-x-auto">
       <TabList className="flex flex-wrap justify-start gap-3 mb-5 md:flex-wrap lg:flex-nowrap w-full overflow-x-auto">
  <Tab
    className={`px-5 md:py-2 py-1 rounded-full text-xs md:text-sm cursor-pointer outline-none transition ${
      tabIndex === 0
        ? "bg-black text-white font-semibold"
        : "bg-gray-100 text-black"
    }`}
  >
    All
  </Tab>
  {brands?.data.slice(0, 6).map((brand, index) => (
    <Tab
      key={brand.id}
      className={`px-5 md:py-2 py-1 rounded-full text-xs md:text-sm cursor-pointer outline-none transition ${
        tabIndex === index + 1
          ? "bg-black text-white font-semibold"
          : "bg-gray-200 text-black"
      }`}
    >
      {brand?.name}
    </Tab>
  ))}
</TabList>


        {[null, ...brands?.data.slice(0, 6)].map((_, index) => (
          <TabPanel key={index}>
            { isLoading ?
            <div className='flex gap-5  justify-center'>
               {
                Array.from({length : 6}).map((_,idx) => {
                  return  <CardSkeleton key={idx} />
               })
              }
               </div> : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {pdcByBrands?.data?.data.length > 0 ? (
                  pdcByBrands?.data?.data.slice(0,10).map((product,idx) => (
                    <ProductCard key={idx} product={product} />
                  ))
                ) : (
                  <p className="text-black col-span-full text-center">No products found for this brand.</p>
                )}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TopBrandProducts;


