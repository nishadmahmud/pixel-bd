"use client"
import React, { useEffect, useState } from "react"
import "react-range-slider-input/dist/style.css"
import useSWR from "swr"
import { useSearchParams } from "next/navigation"
import { IoFilter, IoClose, IoChevronDown, IoSwapVertical } from "react-icons/io5"
import FilterProduct from "@/app/Components/FIlterProduct"
import Pagination from "@/app/Components/pagination"
import ProductCard from "@/app/Components/ProductCard"
import Image from "next/image"

import CardSkeleton from "@/app/Components/CardSkeleton"
import useStore from "@/app/CustomHooks/useStore"
import Link from "next/link"

const fetcher = (url) => fetch(url).then((res) => res.json())

const Page = ({ params }) => {
  const { slug: id } = React.use(params);
  const { categories } = useStore()
  const searchParams = useSearchParams()
  const searchedCategory = searchParams.get("category")
  const searchedTotal = searchParams.get("total")

  const limit = 20
  const totalPage = Math.ceil(Number.parseInt(searchedTotal) / limit)

  const [filteredItems, setFilteredItems] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [sortBy, setSortBy] = useState("default")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)
  const [filterState, setFilterState] = useState({})

  // Function to update filter state and count active filters
  const updateFilters = (newFilterState) => {
    setFilterState(newFilterState)

    // Count active filters
    let count = 0
    Object.values(newFilterState).forEach((filterGroup) => {
      if (Array.isArray(filterGroup) && filterGroup.length > 0) {
        count += filterGroup.length
      } else if (filterGroup?.min !== undefined && filterGroup?.max !== undefined) {
        count += 1
      }
    })

    setActiveFilters(count)
  }

  // Function to reset all filters
  const resetFilters = () => {
    setFilterState({})
    setActiveFilters(0)
    setFilteredItems(products?.data || [])
    setSortBy("default")
  }

  const pages = []
  for (let i = 0; i < totalPage; i++) {
    pages.push(i + 1)
  }

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== "undefined") {
      return Number.parseInt(sessionStorage.getItem(`currentPage-${id}`)) || 1
    }
    return 1
  })

  const currentCategory = categories?.data?.find((category) => category?.category_id == id)

  // console.log(currentCategory);

  const { data: products, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/public/categorywise-products/${id}?page=${currentPage}&limit=${limit}`,
    fetcher,
    {},
  )

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "low-to-high", label: "Price: Low to High" },
    { value: "high-to-low", label: "Price: High to Low" },
    { value: "a-z", label: "Name: A to Z" },
    { value: "z-a", label: "Name: Z to A" },
  ]

  const selectedSortLabel = sortOptions.find((option) => option.value === sortBy)?.label || "Default"

  useEffect(() => {
    if (products) {
      setFilteredItems(products.data)
    }
  }, [products])

  useEffect(() => {
    if (!products?.data) return

    const itemsToSort = [...(filteredItems.length > 0 && activeFilters > 0 ? filteredItems : products.data)]

    if (sortBy === "low-to-high") {
      const lowToHigh = itemsToSort.sort((a, b) => a.retails_price - b.retails_price)
      setFilteredItems(lowToHigh)
    } else if (sortBy === "high-to-low") {
      const highToLow = itemsToSort.sort((a, b) => b.retails_price - a.retails_price)
      setFilteredItems(highToLow)
    } else if (sortBy === "a-z") {
      const letterSort = itemsToSort.sort((a, b) => a.name.localeCompare(b.name))
      setFilteredItems(letterSort)
    } else if (sortBy === "z-a") {
      const letterSort = itemsToSort.sort((a, b) => b.name.localeCompare(a.name))
      setFilteredItems(letterSort)
    } else if (activeFilters === 0) {
      setFilteredItems(products.data)
    }
  }, [sortBy, products, activeFilters])

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`currentPage-${id}`, currentPage)
    }
  }, [currentPage, id])

  useEffect(() => {
    if (products?.data && !filteredItems.length) {
      setFilteredItems(products.data)
    }
  }, [products?.data])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sort-dropdown")) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10">
      {/* Mobile Filter Button */}
      <button
        className="fixed bottom-24 lg:bottom-16 left-4 lg:left-8 bg-[#252525] hover:bg-[#1a1a1a] text-white p-4 rounded-full shadow-lg z-50 transition-all duration-200 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <IoFilter size={20} />
        {activeFilters > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {activeFilters}
          </span>
        )}
      </button>

      {/* Mobile Filter Sidebar */}
      <div
        className={`fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 dark:text-black">
            <IoFilter className="text-[#252525]" />
            Filters
          </h2>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-full pb-20">
          <FilterProduct
            products={products?.data}
            setFilteredItems={setFilteredItems}
            filterState={filterState}
            updateFilters={updateFilters}
          />
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Breadcrumb */}
      {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span>/</span>
        <span className="hover:text-gray-700 cursor-pointer">Categories</span>
        <span>/</span>
        <span className="font-medium text-gray-900">{searchedCategory}</span>
      </div> */}

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="lg:text-3xl text-xl font-bold text-gray-900 mb-2">{searchedCategory}</h1>
          <p className="text-gray-600">
            {searchedTotal ? `${searchedTotal} products available` : "Discover our collection"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Button (Header) */}
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:text-black"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IoFilter size={16} />
            <span className="text-sm font-medium">Filters</span>
            {activeFilters > 0 && (
              <span className="bg-[#252525] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="relative sort-dropdown">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[180px] justify-between dark:text-black"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center gap-2">
                <IoSwapVertical size={16} className="text-gray-500" />
                <span className="text-sm font-medium">{selectedSortLabel}</span>
              </div>
              <IoChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg dark:text-black ${
                      sortBy === option.value ? "bg-gray-100 font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option.value)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      {/* <div className="relative rounded-2xl overflow-hidden mb-10 group">
        <Image
          src={currentCategory ? currentCategory?.banner : "/iphoneBanner.jpg"}
          alt={searchedCategory || "Category banner"}
          width={1020}
          height={500}
          className="w-full h-[32vh] sm:h-[40vh] md:h-[50vh] lg:h-[55vh]] object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
          <div className="flex items-center h-full">
            <div className="p-6 sm:p-10 lg:p-12 max-w-lg">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                {searchedCategory}
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6 leading-relaxed">
                Discover our premium selection of {searchedCategory?.toLowerCase()} products with unmatched quality and
                style
              </p>
              <Link
                href="/"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  <IoFilter className="text-[#252525]" />
                  Filters
                </h3>
                {activeFilters > 0 && (
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={resetFilters}
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="border-t border-gray-200 pt-6">
                <FilterProduct
                  products={products?.data}
                  setFilteredItems={setFilteredItems}
                  filterState={filterState}
                  updateFilters={updateFilters}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Active Filters */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Example Filter
                <IoClose className="h-3 w-3 cursor-pointer hover:text-gray-900" />
              </span>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              Array(12)
                .fill(0)
                .map((_, index) => <CardSkeleton key={index} />)
            ) : filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((product) => <ProductCard product={product} key={product.id} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-full bg-gray-100 p-8 mb-6">
                  <IoClose className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 mb-8 max-w-md">
                  {`We couldn't find any products matching your criteria. Try
                  adjusting your filters or search terms.`}
                </p>
                <button
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pages.length > 0 && (
            <div className="mt-12 bg-gray-50 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                <div className="text-sm text-gray-600">
                  Showing page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPage}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
