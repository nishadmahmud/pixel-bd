'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductCard from '@/app/Components/ProductCard';
import { fetcher, userId } from '@/app/utils/constants';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]); // Min and Max price
  const [filteredData, setFilteredData] = useState([]);

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`,
    fetcher
  );

 

  const itemsPerPage = 12;

  useEffect(() => {
    if (data?.data) {
     const filtered = data?.data?.filter((product) => {
  const discountPrice = Number(product.discounted_price || product?.retails_price);
  const inPriceRange = discountPrice >= priceRange[0] && discountPrice <= priceRange[1];
  const brandName = product.brands?.name?.toLowerCase();
  const brandMatch = !selectedBrand || brandName === selectedBrand.toLowerCase();
  return inPriceRange && brandMatch;
});

      setFilteredData(filtered);
    }
  }, [data, selectedBrand, priceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedProducts = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


useEffect(() => {
  setCurrentPage(1);
}, [selectedBrand, priceRange]);

  // Get unique brands
  const brands = [...new Set(data?.data?.map((p) => p?.brands?.name).filter(Boolean))];


  return (
    <div className="w-11/12 mx-auto py-10 text-black">
      <h1 className="text-2xl font-semibold md:mb-0 mb-4 text-center">Best Selling</h1>

      {/* Filters */}
      <div className="flex flex-row md:flex-row justify-between gap-4 mb-6">
        {/* Brand Filter */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border dark:bg-white px-4 py-2 rounded w-full md:w-auto"
        >
          <option value="">All Brands</option>
          {brands.map((brand, idx) => (
            <option key={idx} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Price Filter */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            className="border p-2 dark:bg-white border-gray-200 w-24 rounded"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <span>to</span>
          <input
            type="number"
            className="border dark:bg-white border-gray-200 p-2 w-24 rounded"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === idx + 1
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
