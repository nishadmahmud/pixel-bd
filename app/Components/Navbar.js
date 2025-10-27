// "use client";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import { FaChevronDown } from "react-icons/fa6";
// import { Menu } from "lucide-react";
// import { Truck } from "lucide-react";

// const Navbar = ({ data }) => {
//   const [showCategory, setShowCategory] = useState(false);
//   const categoryRef = useRef(null);
//   const pathname = usePathname();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryRef.current && !categoryRef.current.contains(event.target)) {
//         setShowCategory(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const isActiveLink = (href) => pathname === href;

//   const categories = data?.data || [];
//   const centerCategories = categories.slice(0, 10); // ✅ only show first 10 in center

//   return (
//     <div className="bg-white border-b border-gray-100 hidden md:block">
//       <div className="w-11/12 mx-auto flex items-center justify-between gap-3 gap-x-5 py-2">
        
//         <div className="flex items-center gap-2">
//           {/* ✅ Left: All Categories Dropdown */}
//         <div
//           ref={categoryRef}
//           className="relative"
//           onMouseEnter={() => setShowCategory(true)}
//           onMouseLeave={() => setShowCategory(false)}
//         >
//           <button className="flex items-center gap-2 font-bold open-sans text-gray-800 hover:text-black transition text-sm">
//             All Categories
//             <FaChevronDown
//               className={`transition-transform duration-300 ${
//                 showCategory ? "rotate-180" : ""
//               }`}
//               size={12}
//             />
//           </button>

//           {/* Dropdown */}
//           <div
//             className={`absolute h-80 overflow-y-auto top-full left-0 bg-white shadow-lg rounded-lg mt-2 z-[99999999] w-[250px] border border-gray-100 transform transition-all duration-200 ease-in-out ${
//               showCategory
//                 ? "opacity-100 translate-y-0 visible"
//                 : "opacity-0 -translate-y-2 invisible"
//             }`}
//           >
//             {categories.map((category) => (
//               <div key={category.category_id} className="group relative">
//                 <Link
//                   href={`/category/${encodeURIComponent(
//                     category.category_id
//                   )}?category=${encodeURIComponent(
//                     category.name
//                   )}&total=${encodeURIComponent(category.product_count)}`}
//                   className="flex open-sans justify-between items-center px-4 py-2 hover:bg-gray-100 text-gray-800 text-sm"
//                 >
//                   {category.name}
//                   {category.subcategories?.length > 0 && (
//                     <FaChevronDown
//                       size={10}
//                       className="group-hover:rotate-90 transition-transform"
//                     />
//                   )}
//                 </Link>

//                 {/* Subcategories */}
//                 {category.subcategories?.length > 0 && (
//                   <div className="absolute top-0 left-full bg-white border border-gray-100 shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 w-[220px]">
//                     {category.subcategories.map((sub, i) => (
//                       <Link
//                         key={i}
//                         href={`/subcategory/${encodeURIComponent(
//                           sub?.id
//                         )}?name=${encodeURIComponent(sub?.name)}`}
//                         className="block px-4 open-sans py-2 text-gray-700 hover:bg-gray-100 text-sm"
//                       >
//                         {sub.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ✅ Center: 10 Categories */}
//         <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
//           {centerCategories.map((category, index) => (
//             <Link
//               key={index}
//               href={`/category/${encodeURIComponent(
//                 category.category_id
//               )}?category=${encodeURIComponent(category.name)}`}
//               className={`font-medium text-sm whitespace-nowrap hover:text-[#5f5f5f] ${
//                 isActiveLink(`/category/${category.category_id}`)
//                   ? "text-[#717171]"
//                   : "text-gray-800"
//               }`}
//             >
//               {category.name}
//             </Link>
//           ))}
//         </div>
//         </div>

//         <Link href='/order-tracking'>
//           <h1 className="flex items-center text-black gap-1 text-sm font-semibold">
//             <Truck size={20}></Truck>
//             Order Tracking
//           </h1>
//         </Link>


//       </div>
//     </div>
//   );
// };

// export default Navbar;
