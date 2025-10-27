"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { House } from "lucide-react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);
  const isProductDetailPage = pathArray.includes("product");

  const [product, setProduct] = useState(null);

  // Extract the product ID from the path
 const productId =  pathArray[pathArray.length - 1];



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://www.outletexpense.xyz/api/public/products-detail/${productId}`);
        const data = await res.json();
        setProduct(data?.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  return (
    <nav className="text-gray-800 text-sm my-4 font-medium mt-3 md:mt-4">
      <ul className="flex items-center flex-wrap space-x-2">
        <li>
          <Link href="/">
            <span className="text-gray-800 hover:underline text-xs"><House size={13} /></span>
          </Link>
        </li>

        {/* {pathArray.slice(0, isProductDetailPage ? -2 : -1).map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const formattedPath = path.replace(/-/g, " ");
          console.log(formattedPath);
          return (
            <li key={index} className="flex items-center text-xs">
              <span className="mx-2">/</span>
              <Link href={href}>
                <span className="text-gray-800 hover:underline capitalize">{formattedPath}</span>
              </Link>
            </li>
          );
        })} */}

        { product && (
          <>
            <li className="flex items-center text-xs text-black">
              <span className="mx-2">/</span>
              <Link href={`/brands/${product.brand_id}?brand=${encodeURIComponent(product.brand_name)}`}>
                <span className="text-gray-900 hover:underline capitalize font-semibold">{product.brand_name}</span>
              </Link>
            </li>
            <li className="flex items-center text-xs">
              <span className="mx-2">/</span>
              <span className="text-gray-700 capitalize">{product.name}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
