"use client";
import React, { useEffect, useRef, useState } from "react";
import "react-range-slider-input/dist/style.css";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Loader from "@/app/Components/Loader";
import FilterProduct from "@/app/Components/FIlterProduct";
import ProductCard from "@/app/Components/ProductCard";
import { fetcher, userId } from "@/app/utils/constants";
import Pagination from "@/app/Components/Paginatiion";

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const searchedCategory = searchParams.get("brand");
 
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const [totalPage, setTotalPage] = useState(0);
  const { id } = params;
  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/brandwise-products/${id}/${userId}?page=${currentPage}&limit=${limit}`,
    fetcher
  );
  const searchedCategoryId = Number(searchParams?.get("categoryId"));

  const [filteredItems, setFilteredItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sortBy, setSortBy] = useState("");
  // const [selectedBrand,setSelectedBrand] = useState('');
  // const colors = [...new Set(items.map((item) => item.color))];
  // const brands = [...new Set(items.map(item  => item.brand_name))];
  const contentRef = useRef(null);

  // const maxPrice = products?.data ? products.data.filter((item) => {
  //   console.log(item);
  //   return item.retails_price > minPrice;
  // }) : 0;
  // console.log(products);

  useEffect(() => {
    if (products?.data) {
      const total = Math.ceil(products?.data.total / limit);
      setTotalPage(total);
    }
  }, [products?.data]);

  const pages = [];

  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1);
  }

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    if (products?.data?.data) {
      setFilteredItems(products.data?.data);
    }
  }, [products]);

  const handleNextPage = (page) => {
    preload(
      `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=${page}&limit=${limit}`,
      fetcher
    );
  };

  useEffect(() => {
  if (!products?.data?.data) return;

  let items = [...products.data.data];

  // Filter by variant status depending on category ID
  if (searchedCategoryId === 6873) {
    items = items.filter((product) => product.have_variant === 0);
  } else {
    items = items.filter((product) => product.have_variant === 1);
  }

  // Apply sorting
  if (sortBy === "low-to-high") {
    items.sort((a, b) => a.retails_price - b.retails_price);
  } else if (sortBy === "high-to-low") {
    items.sort((a, b) => b.retails_price - a.retails_price);
  } else if (sortBy === "a-z") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "z-a") {
    items.sort((a, b) => b.name.localeCompare(a.name));
  }

  setFilteredItems(items);
}, [sortBy, products?.data?.data, searchedCategoryId]);

console.log(
  "Rendered Products:",
  filteredItems?.filter((product) =>
    searchedCategoryId === 6873
      ? product.have_variant === 0
      : product.have_variant === 1
  )
);



  
  // console.log(filteredItems);

 
const visibleItems =
   filteredItems
    



  return (
    <>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 pt-2 gap-5 w-11/12 mx-auto">
        <FilterProduct
          products={products?.data?.data}
          setFilteredItems={setFilteredItems}
        />

        {/* products */}
        <div className="md:col-span-3 lg:col-span-4">
          <div className="flex flex-1 justify-between bg-white p-2 rounded-xl items-center mb-5">
            <h1 className="font-semibold text-black text-xl ">
              {searchedCategory}
            </h1>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-black">Sort By : </p>
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="outline-none p-1 bg-[#F2F3F7] text-black"
              >
                <option value="">Default</option>
                <option value="low-to-high">Price low to high</option>
                <option value="high-to-low">Price high to low</option>
                <option value="a-z">Alphabetically A-Z</option>
                <option value="z-a">Alphabetically Z-A</option>
                {/* <option value="old-to-new">Oldest First</option>
              <option value="new-to-old">Newest First</option> */}
              </select>
            </div>
          </div>
         <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
  {isLoading ? (
    <Loader />
  ) : filteredItems?.length > 0 ? (
    filteredItems
      .filter((product) =>
        searchedCategoryId === 6873
          ? product.have_variant === 0
          : product.have_variant === 1
      )
      .map((product, idx) => (
        <ProductCard product={product} key={idx} />
      ))
  ) : (
    <p className="font-semibold text-xl text-center pt-10 text-black">
      No products found
    </p>
  )}
</ul>

          {pages.length > 0 && (
            <div className="flex justify-between items-center mt-10 pagination gap-3 bg-[#EFEFEF] text-gray-700 rounded-md p-2">
              <Pagination
                nextPageData={handleNextPage}
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
              <div>
                <p>
                  Showing {currentPage} page of ({totalPage} page)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
