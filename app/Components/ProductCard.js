"use client";

import Image from "next/image";

import Link from "next/link";

const ProductCard = ({ product }) => {
 
  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  // Price calculation
  const discountedPrice =
    product.discount_type === "Percentage"
      ? product?.discount
        ? (
            product.retails_price -
            (product.retails_price * product.discount) / 100
          ).toFixed(2)
        : product.retails_price
      : product.retails_price - (product.discount || 0);

  const formatPrice = (price) =>
    new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
    }).format(price);

  const isNew =
    product?.createdAt &&
    Date.now() - new Date(product.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="relative md:w-[220px] w-[170px] md:h-[350px] h-[250px] bg-white border border-gray-200 md:rounded-2xl rounded-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between p-6 text-left">
      {/* Badge */}
      {isNew && (
        <div className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs font-semibold py-1 px-3 rounded-full">
          New
        </div>
      )}

      {/* Image */}
      <Link href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`} className="w-full md:h-[200px] h-52 flex items-start justify-start">
        <Image
          src={
            product?.image_path
              ? product.image_path
              : product?.images?.[0] || "/no-image.jpg"
          }
          alt={product?.name || "Product"}
          width={220}
          height={220}
          className="object-contain"
        />
      </Link>

      {/* Product Info (All left aligned) */}
      <div className="w-full mt-4 flex flex-col items-start justify-start">
        <h3 className="text-gray-900 poppins font-semibold text-sm leading-snug line-clamp-1">
          {product?.name}
        </h3>

        <p className="text-gray-700 md:text-base mt-2 text-xs">
          From{" "}
          <span className="font-semibold">
            {discountedPrice || product.retails_price}৳
          </span>
        </p>

        <Link
          href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
          className="mt-4 text-blue-600 hover:text-blue-800 text-base font-medium flex items-center gap-1 transition-all duration-300"
        >
          View
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
