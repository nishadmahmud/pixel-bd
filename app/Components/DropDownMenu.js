"use client"

import Link from "next/link"
import Image from "next/image"

export default function DropdownMenu({ data, uniqueBrands, isActiveLink, noImg,categoryId,setCategoryId }) {

  const handleMouseEnter = (itemCategoryId) => {
    setCategoryId(itemCategoryId)
  }

  const handleMouseLeave = () => {
    setCategoryId(null)
  }

  // Filter brands for the currently hovered category
  const getBrandsForCategory = (currentCategoryId) => {
    // You might need to adjust this logic based on how your brands relate to categories
    // For now, showing all uniqueBrands when hovering over any category
    return uniqueBrands || []
  }

  console.log(data.data);

  return (
    <div className="flex items-center justify-center relative">
      <div className="flex items-center gap-5">
        {data?.data.slice(0, 6).map((item, idx) => {
          const categoryHref = `/category/${encodeURIComponent(item?.category_id)}?category=${encodeURIComponent(item?.name)}&total=${encodeURIComponent(item?.product_count)}`
          const isHovered = categoryId === item?.category_id

         
          const brandsToShow = getBrandsForCategory(item?.category_id)

          // console.log(brandsToShow);

          return (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item?.category_id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={categoryHref}
                className={`relative text-sm text-nowrap font-semibold flex items-center gap-1 hover:text-[#139e90] transition-all ease-in-out ${idx === 0 ? "pl-1" : ""} ${isActiveLink(`/category/${item?.category_id}`) ? "text-[#139e90]" : "text-[#555555]"}`}
              >
                <Image
                  className="bg-gray-100 p-[5px] rounded-full border border-gray-300"
                  width={28}
                  height={28}
                  src={item?.image_url || noImg}
                  alt="category"
                />
                {item.name}
              </Link>

              {/* Subcategories Dropdown */}
              {isHovered && brandsToShow.length > 0 && (
                <div className="absolute top-full left-0 pt-1 z-[100]">
                  <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out">
                    <div className="py-2">
                      <div className="grid grid-cols-2 min-w-40 w-80 gap-1">
                        {brandsToShow.map((brand) => (
                          <Link
                            key={brand.brand_id}
                            href={`/brands/${brand.id}?brand=${encodeURIComponent(brand.name)}&categoryId=${encodeURIComponent(categoryId)}`}

                            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#139e90] transition-colors duration-150 ease-in-out text-start rounded"
                          >
                            {brand.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
