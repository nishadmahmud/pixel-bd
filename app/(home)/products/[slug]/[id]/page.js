// // "use client";

// // import { useEffect, useMemo, useRef, useState } from "react";
// // import Image from "next/image";
// // import useStore from "@/app/CustomHooks/useStore";
// // import { FaWhatsapp } from "react-icons/fa6";
// // import { ShoppingCart, ShoppingBag, Heart } from "lucide-react";
// // import Link from "next/link";
// // import useSWR from "swr";
// // import noImg from "/public/no-image.jpg";
// // import MagnifiedImage from "@/app/Components/MagnifiedImage";
// // import Breadcrumbs from "@/app/Components/Breadcrumbs";
// // import { GrTechnology } from "react-icons/gr";
// // import axios from "axios";
// // import { fetcher, userId } from "@/app/utils/constants";
// // import { htmlToText } from "html-to-text";
// // import ShareModal from "@/app/Components/ShareModal";
// // import ProductSkeleton from "@/app/Components/ProductDetailsSkeleton";
// // import { toast } from "react-toastify";

// // const Page = ({ params }) => {
// //   const { handleCart, getCartItems, refetch, setRefetch, handleBuy } =
// //     useStore();
// //   const [scroll, setScroll] = useState(0);
// //   const [cartItems, setCartItems] = useState([]);
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeTab, setActiveTab] = useState("Specification");
// //   const [imageIndex, setImageIndex] = useState(0);
// //   const [colors, setColors] = useState([]);
// //   const [region, setRegion] = useState([]);
// //   const [relatedProducts, setRelatedProducts] = useState([]);
// //   const [viewerCount, setViewerCount] = useState(42);
// //   const [allImages, setAllImages] = useState([]);

// //   useEffect(() => {
// //     setCartItems(getCartItems());
// //     if (refetch) {
// //       setCartItems(getCartItems());
// //       setRefetch(false);
// //     }
// //   }, [refetch, setRefetch, getCartItems]);

// //   const { id } = params;
// //   const {
// //     data: product,
// //     error,
// //     isLoading,
// //   } = useSWR(
// //     id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null,
// //     fetcher
// //   );

// //   useEffect(() => {
// //     if (product?.data?.imeis && product?.data?.imeis.length > 0) {
// //       // Extract all images with their associated colors
// //       const imageData = product.data.imeis
// //         .filter((imei) => imei.image_path) // Only include imeis with images
// //         .map((imei) => ({
// //           path: imei.image_path,
// //           color: imei.color,
// //         }));

// //       // Remove duplicates (same image path)
// //       const uniqueImages = [];
// //       const paths = new Set();

// //       imageData.forEach((item) => {
// //         if (!paths.has(item.path)) {
// //           paths.add(item.path);
// //           uniqueImages.push(item);
// //         }
// //       });

// //       setAllImages(uniqueImages);
// //     }
// //   }, [product?.data]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.post(
// //           `${process.env.NEXT_PUBLIC_API}/public/get-related-products`,
// //           {
// //             product_id: id,
// //             user_id: userId,
// //           }
// //         );
// //         if (response.data) {
// //           setRelatedProducts(response.data);
// //         }
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //     fetchData();
// //   }, [id]);

// //   const [selectedStorage, setSelectedStorage] = useState("");
// //   const [storages, setStorages] = useState("");
// //   const isCartItem = cartItems.find(
// //     (item) => item?.id === product?.data.id || undefined
// //   );

// //   useMemo(() => {
// //     if (product && product?.data.imeis && product?.data.imeis.length > 0) {
// //       const uniqueStorage = [
// //         ...new Set(product.data.imeis.map((item) => item.storage)),
// //       ];
// //       setStorages(uniqueStorage);
// //     }
// //   }, [product]);

// //   const [recentProducts, setRecentProducts] = useState([]);
// //   useEffect(() => {
// //     const storedProducts =
// //       JSON.parse(localStorage.getItem("recentlyViewed")) || [];
// //     setRecentProducts(storedProducts);
// //   }, []);

// //   const [selectedSalePrice, setSelectedSalePrice] = useState(
// //     product?.data.imeis && product?.data.imeis.length
// //       ? product?.data.imeis[0].sale_price
// //       : product?.data.retails_price
// //   );
// //   const [selectedColor, setSelectedColor] = useState("");
// //   const [selectedRegion, setSelectedRegion] = useState([]);

// //   // Get images for the currently selected color (for main image display)
// //   function getImagesForColor() {
// //     // If a color is selected, filter images for that color for main display
// //     if (selectedColor && allImages.length > 0) {
// //       const colorImages = allImages
// //         .filter((img) => img.color === selectedColor)
// //         .map((img) => img.path);
// //       if (colorImages.length > 0) {
// //         return colorImages;
// //       }
// //     }

// //     // Fallback to existing logic
// //     if (
// //       product?.data.color_images &&
// //       product?.data.color_images[selectedColor]
// //     ) {
// //       return product.data.color_images[selectedColor];
// //     }

// //     if (product?.data.variants) {
// //       const colorVariant = product.data.variants.find(
// //         (variant) => variant.color === selectedColor
// //       );
// //       if (colorVariant && colorVariant.images) {
// //         return colorVariant.images;
// //       }
// //     }

// //     // Fallback to all images or default images
// //     if (allImages.length > 0) {
// //       return allImages.map((img) => img.path);
// //     }

// //     return product?.data.images || [product?.data.image_path] || [noImg];
// //   }

// //   // Always get all thumbnail images regardless of color selection
// //   function getAllThumbnailImages() {
// //     if (allImages.length > 0) {
// //       return allImages;
// //     }

// //     // Fallback to default images
// //     const defaultImages = product?.data.images || [
// //         product?.data.image_path,
// //       ] || [noImg];
// //     return defaultImages.map((img, index) => ({ path: img, color: null }));
// //   }

// //   const handleColorChange = (colorCode) => {
// //     setSelectedColor(colorCode);
// //     setImageIndex(0); // Reset to first image when color changes

// //     // Find the imei with the selected color
// //     const imeiWithSelectedColor = product?.data.imeis.find(
// //       (imei) => imei.color === colorCode
// //     );

// //     if (imeiWithSelectedColor) {
// //       setSelectedStorage(imeiWithSelectedColor.storage);
// //       setSelectedRegion(imeiWithSelectedColor.region);
// //       setSelectedSalePrice(imeiWithSelectedColor.sale_price);
// //     }
// //   };

// //   const handleRegionChange = (rgn) => {
// //     const findImei =
// //       product?.data.imeis && product?.data.imeis.length
// //         ? product?.data.imeis.find(
// //             (item) =>
// //               item.region === rgn &&
// //               item.color === selectedColor &&
// //               item.storage === selectedStorage
// //           )
// //         : null;
// //     if (!findImei) {
// //       toast.error("This variant is not available");
// //       return;
// //     }
// //     setSelectedRegion(rgn);
// //     setSelectedSalePrice(findImei.sale_price);
// //   };

// //   useEffect(() => {
// //     const imeis = product?.data?.imeis;
// //     if (imeis && imeis.length) {
// //       // Don't set selectedColor initially - let it show all images first
// //       // setSelectedColor(imeis[0].color)
// //       setSelectedStorage(imeis[0].storage);
// //       setSelectedRegion(imeis[0].region);
// //     }
// //   }, [product]);

// //   useEffect(() => {
// //     if (product?.data.color && typeof product?.data.color === "object") {
// //       const colors = Object.values(product.data.color);
// //       const uniqueColors = [...new Set(colors)];
// //       setColors(uniqueColors);
// //     } else if (product?.data.color && product?.data.color.length) {
// //       const uniqueColors = [...new Set(product.data.color)];
// //       setColors(uniqueColors);
// //     }
// //   }, [product?.data]);

// //   useEffect(() => {
// //     if (product?.data?.imeis && product?.data?.imeis.length) {
// //       const regions = product?.data.imeis.flatMap((imei) => imei.region);
// //       const uniqueRegions = [...new Set(regions)];
// //       setRegion(uniqueRegions);
// //     }
// //   }, [product?.data]);

// //   const sanitizeSlug = (str) => {
// //     return str
// //       ?.toLowerCase()
// //       .replace(/\s+/g, "-")
// //       .replace(/[^a-z0-9-]/g, "");
// //   };

// //   const handleStorageChange = (storage) => {
// //     const findImei =
// //       product?.data?.imeis && product?.data?.imeis?.length
// //         ? product?.data?.imeis.find(
// //             (item) =>
// //               item.storage === storage &&
// //               item.color === selectedColor &&
// //               item.region === selectedRegion
// //           )
// //         : null;
// //     if (!findImei) {
// //       toast.error("This variant is not available");
// //       return;
// //     }
// //     setSelectedStorage(storage);
// //     setSelectedSalePrice(findImei.sale_price);
// //   };

// //   const descriptionText = product?.data?.description
// //     ? htmlToText(product?.data?.description, {
// //         wordwrap: false,
// //         selectors: [{ selector: "a", options: { ignoreHref: true } }],
// //       })
// //     : null;

// //   const discountedPrice =
// //     product?.data.discount_type === "Percentage"
// //       ? product?.data.discount
// //         ? (selectedSalePrice
// //             ? selectedSalePrice
// //             : product?.data.retails_price -
// //               (selectedSalePrice
// //                 ? selectedSalePrice
// //                 : product?.data.retails_price * product.discount) /
// //                 100
// //           ).toFixed(0)
// //         : null
// //       : selectedSalePrice
// //       ? selectedSalePrice
// //       : product?.data.retails_price - product?.data.discount;

// //   const fixedDiscount = product?.data.discount_type === "Fixed" ? "Tk" : null;
// //   const percentageDiscount =
// //     product?.data.discount_type === "Percentage" ? "%" : null;

// //   const [isFixed, setIsFixed] = useState(false);
// //   const imageWrapperRef = useRef(null);
// //   const stopSectionRef = useRef(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const scrollY = window.scrollY;
// //       const startFix = 200;

// //       const stopRect = stopSectionRef.current?.getBoundingClientRect();
// //       const stopReached = stopRect && stopRect.top <= window.innerHeight * 0.8;

// //       if (scrollY >= startFix && !stopReached) {
// //         setIsFixed(true);
// //       } else {
// //         setIsFixed(false);
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const formatPriceBD = (price) => {
// //     return new Intl.NumberFormat("en-IN").format(price);
// //   };

// //   if (isLoading)
// //     return (
// //       <div>
// //         <ProductSkeleton></ProductSkeleton>
// //       </div>
// //     );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
// //       {isFixed && (
// //         <style jsx>{`
// //           .product-details-offset {
// //             margin-left: 50%;
// //           }
// //           .sticky-image-container {
// //             max-height: calc(100vh - 2rem);
// //             overflow-y: auto;
// //           }
// //           @media (max-width: 1024px) {
// //             .product-details-offset {
// //               margin-left: 0;
// //             }
// //           }
// //         `}</style>
// //       )}

// //       <div className="w-11/12 mx-auto py-6">
// //         {/* Breadcrumb */}
// //         <div className="mb-8">
// //           <Breadcrumbs />
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
// //           {/* Left Side - Image Gallery */}
// //           <div className="relative">
// //             {product?.data.discount ? (
// //               <div className="absolute top-6 right-32 z-20 bg-gradient-to-r from-gray-500 to-gray-800 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
// //                 {product?.data?.discount}
// //                 {fixedDiscount || percentageDiscount} OFF
// //               </div>
// //             ) : (
// //               ""
// //             )}

// //             <div
// //               className={`flex  flex-col-reverse transition-all justify-start items-center duration-300 md:sticky top-24 gap-2`}
// //             >
// //               {/* Thumbnail Column */}
// //               <div className="mt-4 lg:mt-4">
// //                 <div className="flex  justify-center items-center lg:space-y-3 space-x-3 lg:space-x-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 bg-white px-10 rounded-sm py-1 gap-7">
// //                   {getAllThumbnailImages().length > 0 ? (
// //                     getAllThumbnailImages().map((imageObj, idx) => {
// //                       const isCurrentColorImage = selectedColor
// //                         ? imageObj.color === selectedColor
// //                         : true;
// //                       const isActiveImage =
// //                         getImagesForColor()[imageIndex] === imageObj.path;

// //                       return (
// //                         <div
// //                           key={idx}
// //                           className={`flex-shrink-0 w-20 h-20 border-3 rounded-sm bg-white cursor-pointer overflow-hidden relative transition-all duration-200 hover:scale-105 ${
// //                             isActiveImage
// //                               ? "border-gray-500 shadow-lg ring-2 ring-gray-500"
// //                               : "border-slate-200 hover:border-slate-300"
// //                           } ${
// //                             !isCurrentColorImage ? "opacity-50" : "opacity-100"
// //                           }`}
// //                           onClick={() => {
// //                             // Find the index of this image in the current color's images
// //                             const currentImages = getImagesForColor();
// //                             const newIndex = currentImages.findIndex(
// //                               (img) => img === imageObj.path
// //                             );
// //                             if (newIndex !== -1) {
// //                               setImageIndex(newIndex);
// //                             } else {
// //                               if (
// //                                 imageObj.color &&
// //                                 imageObj.color !== selectedColor
// //                               ) {
// //                                 handleColorChange(imageObj.color);
// //                                 setImageIndex(0);
// //                               }
// //                             }
// //                           }}
// //                         >
// //                           <Image
// //                             src={imageObj.path || noImg}
// //                             alt={`${product?.data.name} ${idx + 1}`}
// //                             width={72}
// //                             height={72}
// //                             className="w-full h-full object-cover"
// //                           />
// //                           {/* Color indicator dot */}
// //                           {imageObj.color && (
// //                             <div
// //                               className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-md"
// //                               style={{
// //                                 backgroundColor:
// //                                   imageObj.color === "Desert Titanium"
// //                                     ? "#e7d4c6"
// //                                     : imageObj.color === "Black Titanium"
// //                                     ? "#5b5b5b"
// //                                     : imageObj.color === "Blue Titanium"
// //                                     ? "#2a2e54"
// //                                     : imageObj.color === "White Titanium"
// //                                     ? "#e4e4e4"
// //                                     : imageObj.color === "Natural Titanium"
// //                                     ? "#aba5a0"
// //                                     : imageObj.color,
// //                               }}
// //                             />
// //                           )}
// //                         </div>
// //                       );
// //                     })
// //                   ) : (
// //                     <div className="w-18 h-18 border-2 border-slate-200 rounded-xl">
// //                       <Image
// //                         src={noImg || "/placeholder.svg"}
// //                         alt="No image"
// //                         width={72}
// //                         height={72}
// //                         className="w-full h-full object-cover rounded-xl"
// //                       />
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Main Image */}
// //               <div className="flex justify-start">
// //                 <div
// //                   className={`max-w-lg w-full transition-all duration-300 hidden lg:block bg-white rounded-md shadow-md p-6 sticky top-3`}
// //                 >
// //                   <MagnifiedImage
// //                     image_path={getImagesForColor()[imageIndex]}
// //                     alt={product?.data.name}
// //                   />
// //                 </div>
// //                 {/* Mobile Image */}
// //                 <div className="lg:hidden bg-white rounded-2xl shadow-xl p-6">
// //                   <Image
// //                     unoptimized
// //                     src={
// //                       getImagesForColor()[imageIndex] ||
// //                       product?.data.image_path ||
// //                       noImg ||
// //                       "/placeholder.svg"
// //                     }
// //                     alt={product?.data.name || "Product"}
// //                     width={400}
// //                     height={400}
// //                     className="w-full h-auto object-contain rounded-xl"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side - Product Details */}
// //           <div
// //             className={`space-y-8 ${
// //               isFixed ? "product-details-offset lg:pl-8" : ""
// //             }`}
// //           >
// //             <div className="bg-white rounded-md shadow-xs p-8 border border-slate-300">
// //               <div className="flex justify-between items-center mb-3">
// //                 <h4 className="text-gray-600 text-xs px-5 py-1 bg-gray-100 w-fit rounded-full font-semibold poppins">
// //                   {product.data.brand_name}
// //                 </h4>

// //                 <div>
// //                   <ShareModal></ShareModal>
// //                 </div>
// //               </div>

// //               {/* Product Title & Price */}
// //               <div className="mb-6">
// //                 <h1 className="text-xl lg:text-2xl font-semibold text-slate-900 mb-4 leading-tight roboto">
// //                   {product?.data.name}
// //                 </h1>

// //                 <div className="flex items-center justify-between mb-6">
// //                   <div className="flex items-baseline space-x-3">
// //                     <div className="text-3xl font-bold text-slate-800">
// //                       ৳{formatPriceBD(discountedPrice)}
// //                     </div>
// //                     {product?.data?.discount && (
// //                       <div className="md:text-lg text-slate-500 line-through">
// //                         ৳
// //                         {selectedSalePrice
// //                           ? formatPriceBD(selectedSalePrice)
// //                           : product?.data?.retails_price
// //                           ? formatPriceBD(product.data.retails_price)
// //                           : null}
// //                       </div>
// //                     )}
// //                   </div>

// //                   {(selectedColor || selectedStorage) && (
// //                     <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
// //                       {selectedStorage && (
// //                         <span className="text-sm font-medium text-slate-700">
// //                           {selectedStorage}
// //                         </span>
// //                       )}
// //                       {selectedStorage && selectedColor && (
// //                         <span className="text-slate-400">•</span>
// //                       )}
// //                       {selectedColor && (
// //                         <span className="text-sm font-medium text-slate-700">
// //                           {selectedColor}
// //                         </span>
// //                       )}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Key Features */}
// //               {/* <div className="space-y-3 mb-8">
// //                 <h3 className="text-base font-semibold flex items-center gap-1 text-slate-900 mb-4"><GrTechnology></GrTechnology> Key Features: </h3>
// //                 {product?.data.specifications  ? (
// //                   <div className="grid grid-cols-1 gap-3">
// //                     {product?.data.specifications.map((item, index) => (
// //                       <div
// //                         key={index}
// //                         className="flex items-center justify-between py-3 rounded-lg border-b border-slate-200 text-sm"
// //                       >
// //                         <span className="font-medium text-slate-700">{item.name}</span>
// //                         <span className="text-slate-600 text-right">{item.description}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-slate-500 text-center py-8">No specifications available</div>
// //                 )}
// //               </div> */}
// //             </div>

// //             {/* Color Selection */}
// //             {colors.length > 0 && (
// //               <div className="bg-white rounded-md shadow-xs p-6 border border-slate-300">
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
// //                   Color:{" "}
// //                   <span className="text-gray-700 text-sm">
// //                     {selectedColor || "Select a color"}
// //                   </span>
// //                 </h3>
// //                 <div className="flex flex-wrap gap-3">
// //                   {colors.map((color) => (
// //                     <div
// //                       key={color}
// //                       className={`relative w-16 h-16 border-3 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
// //                         selectedColor === color
// //                           ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
// //                           : "border-slate-200 hover:border-slate-300"
// //                       }`}
// //                       onClick={() => handleColorChange(color)}
// //                     >
// //                       <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
// //                         <div
// //                           className="w-10 h-10 rounded-sm border border-white shadow-md"
// //                           style={{
// //                             backgroundColor:
// //                               color === "Desert Titanium"
// //                                 ? "#e7d4c6"
// //                                 : color === "Black Titanium"
// //                                 ? "#5b5b5b"
// //                                 : color === "Blue Titanium"
// //                                 ? "#2a2e54"
// //                                 : color === "White Titanium"
// //                                 ? "#e4e4e4"
// //                                 : color === "Natural Titanium"
// //                                 ? "#aba5a0"
// //                                 : color,
// //                           }}
// //                         />
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Storage Selection */}
// //             {storages && (
// //               <div className="bg-white rounded-md shadow-xs p-6 border border-slate-300">
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
// //                   Storage:{" "}
// //                   <span className="text-slate-500 text-sm">
// //                     {selectedStorage || "256GB"}
// //                   </span>
// //                 </h3>
// //                 <div className="flex flex-wrap gap-3">
// //                   {storages?.map((storage) => (
// //                     <button
// //                       key={storage}
// //                       onClick={() => handleStorageChange(storage)}
// //                       className={`px-5 text-sm py-1 border-2 rounded-sm font-semibold transition-all duration-200 hover:scale-105 ${
// //                         selectedStorage === storage
// //                           ? "border-slate-600 bg-slate-50 text-slate-700 shadow-lg"
// //                           : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
// //                       }`}
// //                     >
// //                       {storage}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Region Selection */}
// //             {region.length > 0 && (
// //               <div className="bg-white rounded-md shadow-xs p-6 border border-slate-300">
// //                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
// //                   Region:{" "}
// //                   <span className="text-slate-500 text-sm">
// //                     {selectedRegion || "Select region"}
// //                   </span>
// //                 </h3>
// //                 <div className="flex flex-wrap gap-2">
// //                   {region.map((rgn) =>
// //                     rgn ? (
// //                       <button
// //                         key={rgn}
// //                         className={`px-4 py-1 rounded-sm font-medium roboto text-sm transition-all duration-200 hover:scale-105 ${
// //                           selectedRegion === rgn
// //                             ? "bg-slate-700 text-white shadow-lg"
// //                             : "bg-slate-100 text-slate-700 hover:bg-slate-200"
// //                         }`}
// //                         onClick={() => handleRegionChange(rgn)}
// //                       >
// //                         {rgn}
// //                       </button>
// //                     ) : null
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Action Buttons */}
// //             <div className="space-y-4">
// //               <div className="flex gap-4">
// //                 <button
// //                   onClick={() =>
// //                     handleCart(
// //                       {
// //                         ...product?.data,
// //                         storage: selectedStorage,
// //                         color: selectedColor,
// //                         price: selectedSalePrice,
// //                       },
// //                       quantity
// //                     )
// //                   }
// //                   disabled={isCartItem !== undefined}
// //                   className={`flex items-center justify-center gap-3 py-3 px-6 flex-1 border-2 rounded-md font-semibold transition-all duration-200 hover:scale-105 ${
// //                     isCartItem !== undefined
// //                       ? "bg-slate-200 text-slate-500 cursor-not-allowed border-slate-300"
// //                       : "bg-white text-slate-800 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-lg"
// //                   }`}
// //                 >
// //                   <ShoppingCart size={20} />
// //                   {isCartItem !== undefined ? "Added to Cart" : "Add to Cart"}
// //                 </button>

// //                 <button
// //                   onClick={() => handleBuy(product?.data, quantity)}
// //                   className="flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-r from-slate-700 to-gray-900 text-white rounded-md font-semibold hover:from-slate-600 hover:to-gray-800 transition-all duration-200 hover:scale-105 shadow-sm flex-1"
// //                 >
// //                   <ShoppingBag size={20} />
// //                   Buy Now
// //                 </button>
// //               </div>

// //               <Link
// //                 href="https://wa.me/+8801888888888"
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex items-center justify-center space-x-2 w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:scale-105 shadow-lg"
// //               >
// //                 <FaWhatsapp className="text-2xl" />
// //                 <span>Message on WhatsApp</span>
// //               </Link>
// //             </div>

// //             {/* Tabs for Additional Info */}
// //             <div className="bg-white rounded-md shadow-xs border border-slate-300 overflow-hidden">
// //               <div className="flex bg-slate-50 border-b border-slate-200">
// //                 {["Specification", "Description", "Warranty"].map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 ${
// //                       activeTab === tab
// //                         ? "bg-white text-gray-600 border-b-2 border-gray-600 -mb-px"
// //                         : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
// //                     }`}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>

// //               <div className="p-6 min-h-[300px]">
// //                 {activeTab === "Specification" && (
// //                   <div className="space-y-4">
// //                     {product?.data.specifications &&
// //                     product?.data.specifications.length > 0 ? (
// //                       product?.data.specifications.map((item, index) => (
// //                         <div
// //                           key={index}
// //                           className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg border border-slate-100"
// //                         >
// //                           <span className="font-semibold text-slate-700">
// //                             {item.name}
// //                           </span>
// //                           <span className="text-slate-600 text-right max-w-xs">
// //                             {item.description}
// //                           </span>
// //                         </div>
// //                       ))
// //                     ) : (
// //                       <div className="text-slate-500 text-center py-12">
// //                         No specifications available
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeTab === "Description" && (
// //                   <div className="prose prose-slate max-w-none">
// //                     {descriptionText ? (
// //                       <p className="text-slate-600 leading-relaxed text-lg">
// //                         {descriptionText}
// //                       </p>
// //                     ) : (
// //                       <p className="text-slate-500 text-center py-12">
// //                         No description available
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {activeTab === "Warranty" && (
// //                   <div className="text-slate-600 leading-relaxed text-lg">
// //                     <p>
// //                       Explore our{" "}
// //                       <Link
// //                         href="/warranty-policy"
// //                         className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
// //                       >
// //                         Warranty Policy
// //                       </Link>{" "}
// //                       page for detailed information about our comprehensive
// //                       warranty coverage and support services.
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Related Products */}
// //         {relatedProducts.length > 0 && (
// //           <div ref={stopSectionRef} id="stop-section" className="mt-20">
// //             <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
// //               You Might Also Like
// //             </h2>
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
// //               {relatedProducts.slice(0, 6).map((product) => (
// //                 <Link
// //                   key={product.id}
// //                   href={`/products/${sanitizeSlug(
// //                     product?.brand_name || product?.name
// //                   )}/${product?.id}`}
// //                   className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-xl transition-all duration-200 hover:scale-105 group"
// //                 >
// //                   <div className="aspect-square flex justify-center items-center mb-4 bg-slate-50 rounded-lg overflow-hidden">
// //                     <Image
// //                       src={product.image_path || noImg}
// //                       alt={product.name}
// //                       width={120}
// //                       height={120}
// //                       className="object-contain max-h-full group-hover:scale-110 transition-transform duration-200"
// //                     />
// //                   </div>
// //                   <h3 className="text-sm font-semibold line-clamp-2 mb-3 text-slate-800 group-hover:text-blue-600 transition-colors">
// //                     {product.name}
// //                   </h3>
// //                   <p className="text-emerald-600 font-bold text-lg">
// //                     ৳{product.retails_price?.toLocaleString()}
// //                   </p>
// //                 </Link>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Page;

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import Image from "next/image";
// import useStore from "@/app/CustomHooks/useStore";
// import { FaWhatsapp } from "react-icons/fa6";
// import { ShoppingCart, ShoppingBag } from "lucide-react";
// import Link from "next/link";
// import useSWR from "swr";
// import noImg from "/public/no-image.jpg";
// import MagnifiedImage from "@/app/Components/MagnifiedImage";
// import Breadcrumbs from "@/app/Components/Breadcrumbs";
// import axios from "axios";
// import { fetcher, userId } from "@/app/utils/constants";
// import { htmlToText } from "html-to-text";
// import ShareModal from "@/app/Components/ShareModal";
// import ProductSkeleton from "@/app/Components/ProductDetailsSkeleton";
// import { toast } from "react-toastify";
// import { GrTechnology } from "react-icons/gr";
// import { Plus } from "lucide-react";
// import { Minus } from "lucide-react";

// const Page = ({ params }) => {
//   const { handleCart, getCartItems, refetch, setRefetch, handleBuy } =
//     useStore();
//   const [scroll, setScroll] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState("Specification");
//   const [imageIndex, setImageIndex] = useState(0);
//   const [colors, setColors] = useState([]);

//   const [region, setRegion] = useState([]);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [viewerCount, setViewerCount] = useState(42);
//   const [allImages, setAllImages] = useState([]);

//   useEffect(() => {
//     setCartItems(getCartItems());
//     if (refetch) {
//       setCartItems(getCartItems());
//       setRefetch(false);
//     }
//   }, [refetch, setRefetch, getCartItems]);

//   const { id } = params;
//   const {
//     data: product,
//     error,
//     isLoading,
//   } = useSWR(
//     id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null,
//     fetcher
//   );

//   useEffect(() => {
//     if (product?.data?.imeis && product?.data?.imeis.length > 0) {
//       // Extract all images with their associated colors
//       const imageData = product.data.imeis
//         .filter((imei) => imei.image_path) // Only include imeis with images
//         .map((imei) => ({
//           path: imei.image_path,
//           color: imei.color,
//         }));

//       // Remove duplicates (same image path)
//       const uniqueImages = [];
//       const paths = new Set();

//       imageData.forEach((item) => {
//         if (!paths.has(item.path)) {
//           paths.add(item.path);
//           uniqueImages.push(item);
//         }
//       });

//       setAllImages(uniqueImages);
//     }
//   }, [product?.data]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API}/public/get-related-products`,
//           {
//             product_id: id,
//             user_id: userId,
//           }
//         );
//         if (response.data) {
//           setRelatedProducts(response.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const [selectedStorage, setSelectedStorage] = useState("");
//   const [storages, setStorages] = useState("");
//   const isCartItem = cartItems.find(
//     (item) => item?.id === product?.data.id || undefined
//   );

//   useMemo(() => {
//     if (product && product?.data.imeis && product?.data.imeis.length > 0) {
//       const uniqueStorage = [
//         ...new Set(product.data.imeis.map((item) => item.storage)),
//       ];
//       setStorages(uniqueStorage);
//     }
//   }, [product]);

//   const [recentProducts, setRecentProducts] = useState([]);
//   useEffect(() => {
//     const storedProducts =
//       JSON.parse(localStorage.getItem("recentlyViewed")) || [];
//     setRecentProducts(storedProducts);
//   }, []);

//   const [selectedSalePrice, setSelectedSalePrice] = useState(
//     product?.data.imeis && product?.data.imeis.length
//       ? product?.data.imeis[0].sale_price
//       : product?.data.retails_price
//   );
//   const [selectedColor, setSelectedColor] = useState("");
//   console.log(selectedColor);

//   const [selectedRegion, setSelectedRegion] = useState("");

//   const incQuantity = () => {
//     // Check if increasing quantity would exceed available stock
//     if (
//       product?.data &&
//       (product.data.current_stock !== undefined || product.data.status)
//     ) {
//       if (quantity + 1 > product.data.current_stock) {
//         toast.error("Cannot add more items. Stock limit reached!");
//         return;
//       }

//       if (product.data.status === "Stock out") {
//         toast.error("This item is out of stock!");
//         return;
//       }
//     }

//     setQuantity((prev) => prev + 1);
//   };

//   const dncQuantity = () => {
//     if (quantity <= 1) {
//       toast.info("Minimum quantity is 1");
//       return;
//     }
//     setQuantity((prev) => prev - 1);
//   };

//   // Get images for the currently selected color (for main image display)
//   function getImagesForColor() {
//     // If a color is selected, filter images for that color for main display
//     if (selectedColor && allImages.length > 0) {
//       const colorImages = allImages
//         .filter((img) => img.color === selectedColor)
//         .map((img) => img.path);
//       if (colorImages.length > 0) {
//         return colorImages;
//       }
//     }

//     // Fallback to existing logic
//     if (
//       product?.data.color_images &&
//       product?.data.color_images[selectedColor]
//     ) {
//       return product.data.color_images[selectedColor];
//     }

//     if (product?.data.variants) {
//       const colorVariant = product.data.variants.find(
//         (variant) => variant.color === selectedColor
//       );
//       if (colorVariant && colorVariant.images) {
//         return colorVariant.images;
//       }
//     }

//     // Fallback to all images or default images
//     if (allImages.length > 0) {
//       return allImages.map((img) => img.path);
//     }

//     return product?.data.images || [product?.data.image_path] || ['https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'];
//   }

//   // Always get all thumbnail images regardless of color selection
//   function getAllThumbnailImages() {
//     if (allImages.length > 0) {
//       return allImages;
//     }

//     // Fallback to default images
//     const defaultImages = product?.data.images || [
//         product?.data.image_path,
//       ] || ['https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'];
//     return defaultImages.map((img, index) => ({ path: img, color: null }));
//   }

//   const [dynamicPrice, setDynamicPrice] = useState(null)

//   const handlePriceChange = (price) => {
//     setDynamicPrice(price)
//     setImageIndex(0)
//   }

//   const handleColorChange = (colorCode) => {
//     setSelectedColor(colorCode);
//     setImageIndex(0);

//     // Find the imei with the selected color
//     const imeiWithSelectedColor = product?.data.imeis.find(
//       (imei) => imei.color === colorCode
//     );

//     if (imeiWithSelectedColor) {
//       setSelectedStorage(imeiWithSelectedColor.storage);
//       setSelectedRegion(imeiWithSelectedColor.region);
//       setSelectedSalePrice(imeiWithSelectedColor.sale_price);
//     }
//   };

//   const handleRegionChange = (rgn) => {
//     const findImei =
//       product?.data.imeis && product?.data.imeis.length
//         ? product?.data.imeis.find(
//             (item) =>
//               item.region === rgn &&
//               item.color === selectedColor &&
//               item.storage === selectedStorage
//           )
//         : null;
//     if (!findImei) {
//       toast.error("This variant is not available");
//       return;
//     }
//     setSelectedRegion(rgn);
//     setSelectedSalePrice(findImei.sale_price);
//   };
// console.log(selectedSalePrice);
//   useEffect(() => {
//   const imeis = product?.data?.imeis;
//   if (imeis && imeis.length) {
//     // <CHANGE> Initialize all variant selections with first IMEI
//     setSelectedColor(imeis[0].color);
//     setSelectedStorage(imeis[0].storage);
//     setSelectedRegion(imeis[0].region);
//     setSelectedSalePrice(imeis[0].sale_price);
//   }
// }, [product]);

//   useEffect(() => {
//     if (product?.data.color && typeof product?.data.color === "object") {
//       const colors = Object.values(product?.data?.color);
//       const uniqueColors = [...new Set(colors)];
//       setColors(uniqueColors);
//     } else if (product?.data.color && product?.data.color.length) {
//       const uniqueColors = [...new Set(product.data.color)];
//       setColors(uniqueColors);
//     }
//   }, [product?.data]);

//   useEffect(() => {
//     if (product?.data?.imeis && product?.data?.imeis.length) {
//       const regions = product?.data.imeis.flatMap((imei) => imei.region);
//       const uniqueRegions = [...new Set(regions)];
//       setRegion(uniqueRegions);
//     }
//   }, [product?.data]);

//   const sanitizeSlug = (str) => {
//     return str
//       ?.toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");
//   };

 
//   const handleStorageChange = (storage) => {
//     const findImei =
//       product?.data?.imeis && product?.data?.imeis?.length
//         ? product?.data?.imeis.find(
//             (item) =>
//              item?.storage === storage || selectedColor ?
//     item?.color === selectedColor : null ||
//     item?.region === selectedRegion
//           )
//         : null;

//         console.log('find imei', findImei);

        
//     if (!findImei) {
//       toast.error("This variant is not available");
//       return;
//     }
//     setSelectedStorage(storage);
//     setSelectedSalePrice(findImei.sale_price);
//   };

//   const descriptionText = product?.data?.description
//     ? htmlToText(product?.data?.description, {
//         wordwrap: false,
//         selectors: [{ selector: "a", options: { ignoreHref: true } }],
//       })
//     : null;

//   const discountedPrice =
//     product?.data.discount_type === "Percentage"
//       ? product?.data.discount
//         ? (selectedSalePrice
//             ? selectedSalePrice
//             : product?.data.retails_price -
//               (selectedSalePrice
//                 ? selectedSalePrice
//                 : product?.data.retails_price * product.discount) /
//                 100
//           ).toFixed(0)
//         : null
//       : selectedSalePrice
//       ? selectedSalePrice
//       : product?.data.retails_price - product?.data.discount;

//   const fixedDiscount = product?.data.discount_type === "Fixed" ? "Tk" : null;
//   const percentageDiscount =
//     product?.data.discount_type === "Percentage" ? "%" : null;

//   const [isFixed, setIsFixed] = useState(false);
//   const imageWrapperRef = useRef(null);
//   const stopSectionRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const startFix = 200;

//       const stopRect = stopSectionRef.current?.getBoundingClientRect();
//       const stopReached = stopRect && stopRect.top <= window.innerHeight * 0.8;

//       if (scrollY >= startFix && !stopReached) {
//         setIsFixed(true);
//       } else {
//         setIsFixed(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const formatPriceBD = (price) => {
//     return new Intl.NumberFormat("en-IN").format(price);
//   };

//   if (isLoading)
//     return (
//       <div className="md:w-10/12 w-11/12">
//         <ProductSkeleton></ProductSkeleton>
//       </div>
//     );

//     console.log(product);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
//       {isFixed && (
//         <style jsx>{`
//           .product-details-offset {
//             margin-left: 50%;
//           }
//           .sticky-image-container {
//             max-height: calc(100vh - 2rem);
//             overflow-y: auto;
//           }
//           @media (max-width: 1024px) {
//             .product-details-offset {
//               margin-left: 0;
//             }
//           }
//         `}</style>
//       )}

//       <div className="md:w-10/12 w-11/12 mx-auto pb-6 pt-2">
//         {/* Breadcrumb */}
//         <div className="mb-2">
//           <Breadcrumbs />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 md:gap-5 gap-5">
//           {/* Left Side - Image Gallery */}
//         <div className="md:col-span-2 ">
//             <div className="relative md:sticky md:top-24">
//             {product?.data.discount ? (
//               <div className="absolute top-6 right-3 z-20 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
//                 {product?.data?.discount}
//                 {fixedDiscount || percentageDiscount} OFF
//               </div>
//             ) : (
//               ""
//             )}

//             <div
//               className={`flex  flex-col-reverse transition-all justify-start items-center duration-300 gap-2 md:w-auto h-auto w-9/12 mx-auto`}
//             >
//               {/* Thumbnail Column */}
//               <div className="mt-4 lg:mt-4">
//                 <div className="flex  justify-center items-center lg:space-y-3 space-x-3 lg:space-x-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 bg-white px-10 rounded-sm py-1 gap-7">
//                   {getAllThumbnailImages().length > 0 ? (
//                     getAllThumbnailImages().map((imageObj, idx) => {
//                       const isCurrentColorImage = selectedColor
//                         ? imageObj.color === selectedColor
//                         : true;
//                       const isActiveImage =
//                         getImagesForColor()[imageIndex] === imageObj.path;

//                       return (
//                         <div
//                           key={idx}
//                           className={`flex-shrink-0 md:w-20 md:h-20 w-16 h-16 border-3 rounded-sm bg-white cursor-pointer overflow-hidden relative transition-all duration-200 hover:scale-105 ${
//                             isActiveImage
//                               ? "border-gray-500 shadow-sm ring-2 ring-gray-500"
//                               : "border-slate-200 hover:border-slate-300"
//                           } ${
//                             !isCurrentColorImage ? "opacity-50" : "opacity-100"
//                           }`}
//                           onClick={() => {
//                             // Find the index of this image in the current color's images
//                             const currentImages = getImagesForColor();
//                             const newIndex = currentImages.findIndex(
//                               (img) => img === imageObj.path
//                             );
//                             if (newIndex !== -1) {
//                               setImageIndex(newIndex);
//                             } else {
//                               if (
//                                 imageObj.color &&
//                                 imageObj.color !== selectedColor
//                               ) {
//                                 handleColorChange(imageObj.color);
//                                 setImageIndex(0);
//                               }
//                             }
//                           }}
//                         >
//                           <Image
//                             src={imageObj.path || 'https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'}
//                             alt={`${product?.data.name} ${idx + 1}`}
//                             width={72}
//                             height={72}
//                             className="w-full h-full object-cover"
//                           />
//                           {/* Color indicator dot */}
//                           {imageObj.color && (
//                             <div
//                               className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
//                               style={{
//                                 backgroundColor:
//                                   imageObj.color === "Desert Titanium"
//                                     ? "#e7d4c6"
//                                     : imageObj.color === "Black Titanium"
//                                     ? "#5b5b5b"
//                                     : imageObj.color === "Blue Titanium"
//                                     ? "#2a2e54"
//                                     : imageObj.color === "White Titanium"
//                                     ? "#e4e4e4"
//                                     : imageObj.color === "Natural Titanium"
//                                     ? "#aba5a0"
//                                     : imageObj.color,
//                               }}
//                             />
//                           )}
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <div className="w-18 h-18 border-2 border-slate-200 rounded-xl">
//                       <Image
//                         src='https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'
//                         alt="No image"
//                         width={72}
//                         height={72}
//                         className="w-full h-full object-cover rounded-xl"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Main Image */}
//               <div className="flex md:justify-start justify-center">
//                 <div
//                   className={`w-full transition-all duration-300 hidden lg:block bg-white rounded-md shadow-sm sticky top-3`}
//                 >
//                   <MagnifiedImage
//                     image_path={getImagesForColor()[imageIndex]}
//                     alt={product?.data.name}
//                   />
//                 </div>
//                 {/* Mobile Image */}
//                 <div className="lg:hidden bg-white rounded-2xl shadow-sm p-6">
//                   <Image
//                     unoptimized
//                     src={
//                       getImagesForColor()[imageIndex] ||
//                       product?.data.image_path ||
//                       'https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'
//                     }
//                     alt={product?.data.name || "Product"}
//                     width={400}
//                     height={400}
//                     className="w-full h-auto object-contain rounded-xl"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//           {/* Right Side - Product Details */}
//           <div
//             className={`md:col-span-3 space-y-8 ${
//               isFixed ? "product-details-offset" : ""
//             }`}
//           >
            
//               <div className="flex justify-between items-center mb-3">
//                 {product?.data?.brand_image ? ( <div>
//                   <Image alt="brandLogo" src={product?.data?.brand_image || 'https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'} width={400} height={400} className="w-12"></Image>
                 
//                 </div>): <h1 className="font-semibold text-xs bg-gray-100 text-black border border-gray-300 px-5 py-1 rounded-full">{product?.data?.brand_name}</h1>}
               

//                 <div>
//                   <ShareModal></ShareModal>
//                 </div>
//               </div>

//               {/* Product Title & Price */}
//               <div className="mb-6">
//                 <h1 className="text-lg lg:text-xl font-semibold text-slate-900 mb-4 leading-tight roboto">
//                   {product?.data.name}
//                 </h1>

//                 <div className="flex md:flex-row flex-col md:items-center gap-5 md:gap-0 justify-between mb-6">
//                  <div className="flex items-center space-x-4">
//   {/* Price */}
//   <div className="flex items-baseline space-x-3">
//     <div className="text-3xl md:text-4xl font-bold text-slate-800">
//       ৳{formatPriceBD(selectedSalePrice? selectedSalePrice : discountedPrice)}
//     </div>

//     {product?.data?.discount ? (
//       <div className="md:text-lg text-slate-500 line-through">
//         ৳
//         { product?.data?.retails_price
//           ? formatPriceBD(product.data.retails_price)
//           : null}
//       </div>
//     ) : null}
//   </div>

//   {/* Vertical divider */}
//   <div className="h-6 border-l border-slate-300"></div>

//   {/* Stock information */}
  
//     <div className="flex items-center gap-2">
//       <span className="font-semibold text-sm md:text-base text-black">Availability:</span>
//       {product?.data?.current_stock > 0 ? ( <p className="text-xs text-green-500 font-semibold">In Stock</p>) : ( <p className="text-xs text-red-500 font-semibold">Stock Out</p>)}
     
//     </div>
  
// </div>


//                   {(selectedColor || selectedStorage) && (
//                     <div className="flex items-center space-x-2 bg-slate-50 px-4 py-1 rounded-full border justify-center border-slate-300 ">
//                       {selectedStorage ? (
//                         <span className="text-xs font-semibold text-center text-slate-700">
//                           {selectedStorage}
//                         </span>
//                       ) : (
//                         ""
//                       )}
//                       {selectedStorage && selectedColor ? (
//                         <span className="text-slate-400">•</span>
//                       ) : (
//                         ""
//                       )}
//                       {selectedColor ? (
//                         <span className="text-xs font-semibold text-slate-700">
//                           {selectedColor}
//                         </span>
//                       ) : (
//                         ""
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

             
           

//             {/* Color Selection */}
// {colors.length > 0 && colors === null && (
//   <div className="bg-white rounded-md shadow-xs p-6 border border-slate-200">
//     <h3 className="text-lg font-semibold text-slate-900 mb-4">
//       Color:{" "}
      
//     </h3>
//     <div className="flex flex-wrap gap-3">
//       {colors.map((color) => (
//         <button
//           key={color}
//           className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
//             selectedColor === color
//               ? "border-gray-500 border-2 text-gray-700"
//               : "border-gray-300 text-gray-700 hover:border-gray-400"
//           }`}
//           onClick={() => handleColorChange(color)}
//         >
//           {/* Color Circle */}
//           <span
//             className="w-4 h-4 rounded-full border border-gray-300"
//             style={{
//               backgroundColor:
//                 color === "Icy Blue"
//                   ? "#d9e4f6"
//                   : color === "Mint"
//                   ? "#d8e9dc"
//                   : color === "Navy"
//                   ? "#2c3e75"
//                   : color === "Silver Shadow"
//                   ? "#b3b3b3"
//                   : color,
//             }}
//           />
//           <span className="text-xs font-semibold">{color}</span>
//         </button>
//       ))}
//     </div>
//   </div>
// )}


//            {storages && region ? (<div className="grid md:grid-cols-2 grid-cols-1 items-center gap-5">
//  {/* Storage Selection */}
//             {storages && (
//               <div className="bg-white rounded-md shadow-xs p-6 border border-slate-200">
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
//                   Storage:{" "}
                  
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {storages?.map((storage) => (
//                     <button
//                       key={storage}
//                       onClick={() => handleStorageChange(storage)}
//                       className={`px-5 text-sm py-1 border-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 ${
//                         selectedStorage === storage
//                           ? "border-slate-600 bg-slate-50 text-slate-700 shadow-lg"
//                           : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
//                       }`}
//                     >
//                       {storage}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Region Selection */}
//             {region  && (
//               <div className="bg-white rounded-md shadow-xs p-6 border border-slate-200">
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4">
//                   Region:{" "}
                  
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {region.map((rgn) =>
//                     rgn ? (
//                       <button
//                         key={rgn}
//                         className={`px-4 py-1 rounded-full font-medium roboto text-sm transition-all duration-200 hover:scale-105 ${
//                           selectedRegion === rgn
//                             ? "bg-slate-800 text-white shadow-lg"
//                             : "bg-slate-100 text-slate-700 hover:bg-slate-200"
//                         }`}
//                         onClick={() => handleRegionChange(rgn)}
//                       >
//                         {rgn}
//                       </button>
//                     ) : null
//                   )}
//                 </div>
//               </div>
//             )}
//            </div>) : ""}

//             <div>
//               <h3 className="text-lg font-semibold text-slate-900 mb-4">
//                 Quantity:{" "}
                
//               </h3>
//               <div className="flex items-center justify-start">
//                <div className="flex items-center px-2 bg-white rounded-full shadow-sm py-1 w-fit border border-slate-200">
//       {/* Decrease button */}
//       <button
//         onClick={dncQuantity}
//         className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
//         disabled={quantity <= 1}
//       >
//         <Minus className="w-4 h-4" />
//       </button>

//       {/* Quantity display */}
//       <div className="px-8 text-slate-800 font-medium">{quantity}</div>

//       {/* Increase button */}
//       <button
//         onClick={incQuantity}
//         className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
//       >
//         <Plus className="w-4 h-4" />
//       </button>
//     </div>

              
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-4">
//               <div className="flex gap-4">
//                 <button
//                   onClick={() =>
//                     handleCart(
//                       {
//                         ...product?.data,
//                         storage: selectedStorage,
//                         color: selectedColor,
//                         price: selectedSalePrice,
//                       },
//                       quantity
//                     )
//                   }
//                   disabled={isCartItem !== undefined}
//                   className={`flex items-center justify-center md:gap-3 gap-1.5 md:py-3 py-2 md:px-6 px-3 flex-1 border-2 md:text-base text-xs rounded-md font-semibold transition-all duration-200 hover:scale-105 ${
//                     isCartItem !== undefined
//                       ? "bg-slate-200 text-slate-500 cursor-not-allowed border-slate-300"
//                       : "bg-white text-slate-800 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-lg"
//                   }`}
//                 >
//                   <ShoppingCart className="md:w-4 md:h-4 w-5 h-5" />
//                   {isCartItem !== undefined ? "Added to Cart" : "Add to Cart"}
//                 </button>

//                 <button
//                   onClick={() => handleBuy(product?.data, quantity)}
//                   className="flex items-center justify-center md:gap-3 gap-1.5 md:py-3 py-2 md:px-6 px-3  bg-gray-900 md:text-base text-xs text-white rounded-md font-semibold hover:from-slate-600 hover:to-gray-800 transition-all duration-200 hover:scale-105 shadow-sm flex-1"
//                 >
//                   <ShoppingBag className="md:w-4 md:h-4 w-5 h-5" />
//                   Buy Now
//                 </button>
//               </div>

//               <Link
//                 href="https://wa.me/+8801888888888"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center  w-full md:gap-3 gap-1.5 md:py-3 py-2 md:px-6 px-3  bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 md:text-base text-sm"
//               >
//                 <FaWhatsapp className="text-2xl" />
//                 <span>Message on WhatsApp</span>
//               </Link>
//             </div>

//             {/* Tabs for Additional Info */}
//             <div className="bg-white rounded-md shadow-xs border border-slate-200 overflow-hidden">
//               <div className="flex bg-slate-50 border-b border-slate-200">
//                 {["Specification", "Description", "Warranty"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 ${
//                       activeTab === tab
//                         ? "bg-white text-gray-600 border-b-2 border-gray-600 -mb-px"
//                         : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               <div className="p-6 min-h-[300px]">
//                 {activeTab === "Specification" && (
//                   <div className="space-y-4">
//                     {product?.data.specifications &&
//                     product?.data.specifications.length > 0 ? (
//                       product?.data.specifications.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg border border-slate-100"
//                         >
//                           <span className="font-semibold text-slate-700">
//                             {item.name}
//                           </span>
//                           <span className="text-slate-600 text-right max-w-xs">
//                             {item.description}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-slate-500 text-center py-12">
//                         No specifications available
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "Description" && (
//                   <div className="prose prose-slate max-w-none">
//                     {descriptionText ? (
//                       <p className="text-slate-600 leading-relaxed text-lg">
//                         {descriptionText}
//                       </p>
//                     ) : (
//                       <p className="text-slate-500 text-center py-12">
//                         No description available
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {activeTab === "Warranty" && (
//                   <div className="text-slate-600 leading-relaxed text-lg">
//                     <p>
//                       Explore our{" "}
//                       <Link
//                         href="/warranty-policy"
//                         className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
//                       >
//                         Warranty Policy
//                       </Link>{" "}
//                       page for detailed information about our comprehensive
//                       warranty coverage and support services.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div ref={stopSectionRef} id="stop-section" className="md:mt-40 mt-10">
//             <h2 className="md:text-3xl text-2xl font-bold text-slate-900 md:mb-8 mb-5 text-center">
//               You Might Also Like
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//               {relatedProducts.slice(0, 6).map((product) => (
//                 <Link
//                   key={product.id}
//                   href={`/products/${sanitizeSlug(
//                     product?.brand_name || product?.name
//                   )}/${product?.id}`}
//                   className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-xl transition-all duration-200 hover:scale-105 group"
//                 >
//                   <div className="aspect-square flex justify-center items-center mb-4 bg-slate-50 rounded-lg overflow-hidden">
//                     <Image
//                       src={product.image_path || 'https://www.outletexpense.xyz/uploads/228-Khalid-Hasan-Sifat/1759132968.jpg'}
//                       alt={product.name}
//                       width={120}
//                       height={120}
//                       className="object-contain max-h-full group-hover:scale-110 transition-transform duration-200"
//                     />
//                   </div>
//                   <h3 className="text-sm font-semibold line-clamp-2 mb-2 text-slate-800 group-hover:text-gray-700 transition-colors">
//                     {product.name}
//                   </h3>
//                   <p className="text-gray-900 font-bold text-lg">
//                     ৳{product.retails_price?.toLocaleString()}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;


"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import useStore from "@/app/CustomHooks/useStore"
import { FaWhatsapp } from "react-icons/fa6"
import { ShoppingCart, ShoppingBag, Plus, Minus } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
import noImg from "/public/no-image.jpg"
import MagnifiedImage from "@/app/Components/MagnifiedImage"
import Breadcrumbs from "@/app/Components/Breadcrumbs"
import axios from "axios"
import { fetcher, userId } from "@/app/utils/constants"
import { htmlToText } from "html-to-text"
import ShareModal from "@/app/Components/ShareModal"
import ProductSkeleton from "@/app/Components/ProductDetailsSkeleton"
import { toast } from "react-toastify"

const Page = ({ params }) => {
  const { handleCart, getCartItems, refetch, setRefetch, handleBuy } = useStore()
  const [cartItems, setCartItems] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("Specification")
  const [imageIndex, setImageIndex] = useState(0)
  const [colors, setColors] = useState([])
  const [region, setRegion] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [allImages, setAllImages] = useState([])
  const [selectedStorage, setSelectedStorage] = useState("")
  const [storages, setStorages] = useState([])
  const [selectedSalePrice, setSelectedSalePrice] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [isFixed, setIsFixed] = useState(false)
  const stopSectionRef = useRef(null)

  const { id } = params
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(id ? `${process.env.NEXT_PUBLIC_API}/public/products-detail/${id}` : null, fetcher)

  useEffect(() => {
    if (product?.data?.imeis && product?.data?.imeis.length > 0) {
      const uniqueColors = [...new Set(product.data.imeis.map((imei) => imei.color).filter(Boolean))]
      setColors(uniqueColors)
    }
  }, [product?.data])

  useEffect(() => {
    if (product?.data?.imeis && product?.data?.imeis.length > 0) {
      const uniqueStorages = [...new Set(product.data.imeis.map((imei) => imei.storage).filter(Boolean))]
      setStorages(uniqueStorages)
    }
  }, [product?.data])

  useEffect(() => {
    if (product?.data?.imeis && product?.data?.imeis.length > 0) {
      const uniqueRegions = [...new Set(product.data.imeis.map((imei) => imei.region).filter(Boolean))]
      setRegion(uniqueRegions)
    }
  }, [product?.data])

  useEffect(() => {
    if (product?.data?.imeis && product?.data?.imeis.length > 0) {
      const imageData = product.data.imeis
        .filter((imei) => imei.image_path)
        .map((imei) => ({
          path: imei.image_path,
          color: imei.color,
        }))

      const uniqueImages = []
      const paths = new Set()

      imageData.forEach((item) => {
        if (!paths.has(item.path)) {
          paths.add(item.path)
          uniqueImages.push(item)
        }
      })

      setAllImages(uniqueImages)
    }
  }, [product?.data])

  useEffect(() => {
    const imeis = product?.data?.imeis
    if (imeis && imeis.length > 0) {
      const firstImei = imeis[0]
      setSelectedColor(firstImei.color || "")
      setSelectedStorage(firstImei.storage || "")
      setSelectedRegion(firstImei.region || "")
      setSelectedSalePrice(firstImei.sale_price || product?.data?.retails_price || 0)
    } else if (product?.data) {
      setSelectedSalePrice(product.data.retails_price || 0)
    }
  }, [product?.data])

  const findMatchingImei = (color, storage, region) => {
    if (!product?.data?.imeis || product.data.imeis.length === 0) return null

    return product.data.imeis.find((imei) => imei.color === color && imei.storage === storage && imei.region === region)
  }

  const handleColorChange = (colorCode) => {
    setSelectedColor(colorCode)
    setImageIndex(0)

    // Find IMEI with selected color, keeping current storage and region if possible
    let matchingImei = findMatchingImei(colorCode, selectedStorage, selectedRegion)

    // If no exact match, find any IMEI with this color
    if (!matchingImei) {
      matchingImei = product?.data?.imeis.find((imei) => imei.color === colorCode)
    }

    if (matchingImei) {
      setSelectedStorage(matchingImei.storage)
      setSelectedRegion(matchingImei.region)
      setSelectedSalePrice(matchingImei.sale_price)
    } else {
      toast.error("This color variant is not available")
    }
  }

  const handleStorageChange = (storage) => {
    let matchingImei = findMatchingImei(selectedColor, storage, selectedRegion)

    // If no exact match, find IMEI with this storage and current color
    if (!matchingImei && selectedColor) {
      matchingImei = product?.data?.imeis.find((imei) => imei.storage === storage && imei.color === selectedColor)
    }

    // If still no match, find any IMEI with this storage
    if (!matchingImei) {
      matchingImei = product?.data?.imeis.find((imei) => imei.storage === storage)
    }

    if (matchingImei) {
      setSelectedStorage(storage)
      setSelectedRegion(matchingImei.region)
      setSelectedSalePrice(matchingImei.sale_price)
      if (matchingImei.color !== selectedColor) {
        setSelectedColor(matchingImei.color)
      }
    } else {
      toast.error("This storage variant is not available")
    }
  }

  const handleRegionChange = (rgn) => {
    const matchingImei = findMatchingImei(selectedColor, selectedStorage, rgn)

    if (matchingImei) {
      setSelectedRegion(rgn)
      setSelectedSalePrice(matchingImei.sale_price)
    } else {
      toast.error("This region variant is not available")
    }
  }

  // Get images for currently selected color
  function getImagesForColor() {
    if (selectedColor && allImages.length > 0) {
      const colorImages = allImages.filter((img) => img.color === selectedColor).map((img) => img.path)
      if (colorImages.length > 0) {
        return colorImages
      }
    }

    if (allImages.length > 0) {
      return allImages.map((img) => img.path)
    }

    return product?.data?.images || [product?.data?.image_path] || [noImg]
  }

  // Get all thumbnail images
  function getAllThumbnailImages() {
    if (allImages.length > 0) {
      return allImages
    }

    const defaultImages = product?.data?.images || [product?.data?.image_path] || [noImg]
    return defaultImages.map((img) => ({ path: img, color: null }))
  }

  const incQuantity = () => {
    if (product?.data?.current_stock !== undefined) {
      if (quantity + 1 > product.data.current_stock) {
        toast.error("Cannot add more items. Stock limit reached!")
        return
      }
    }

    if (product?.data?.status === "Stock out") {
      toast.error("This item is out of stock!")
      return
    }

    setQuantity((prev) => prev + 1)
  }

  const dncQuantity = () => {
    if (quantity <= 1) {
      toast.info("Minimum quantity is 1")
      return
    }
    setQuantity((prev) => prev - 1)
  }

  // Cart items management
  useEffect(() => {
    setCartItems(getCartItems())
    if (refetch) {
      setCartItems(getCartItems())
      setRefetch(false)
    }
  }, [refetch, setRefetch, getCartItems])

  // Fetch related products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/public/get-related-products`, {
          product_id: id,
          user_id: userId,
        })
        if (response.data) {
          setRelatedProducts(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])

  // Sticky scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const startFix = 200

      const stopRect = stopSectionRef.current?.getBoundingClientRect()
      const stopReached = stopRect && stopRect.top <= window.innerHeight * 0.8

      if (scrollY >= startFix && !stopReached) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isCartItem = cartItems.find((item) => item?.id === product?.data?.id)

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  const descriptionText = product?.data?.description
    ? htmlToText(product?.data?.description, {
        wordwrap: false,
        selectors: [{ selector: "a", options: { ignoreHref: true } }],
      })
    : null

  const discountedPrice =
    product?.data?.discount_type === "Percentage" && product?.data?.discount
      ? (selectedSalePrice - (selectedSalePrice * product.data.discount) / 100).toFixed(0)
      : product?.data?.discount_type === "Fixed" && product?.data?.discount
        ? selectedSalePrice - product.data.discount
        : selectedSalePrice

  const fixedDiscount = product?.data?.discount_type === "Fixed" ? "Tk" : null
  const percentageDiscount = product?.data?.discount_type === "Percentage" ? "%" : null

  const formatPriceBD = (price) => {
    return new Intl.NumberFormat("en-IN").format(price)
  }

  if (isLoading) {
    return (
      <div className="md:w-10/12 w-11/12 mx-auto">
        <ProductSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {isFixed && (
        <style jsx>{`
          .product-details-offset {
            margin-left: 50%;
          }
          @media (max-width: 1024px) {
            .product-details-offset {
              margin-left: 0;
            }
          }
        `}</style>
      )}

      <div className="md:w-10/12 w-11/12 mx-auto pb-6 pt-2">
        <div className="mb-2">
          <Breadcrumbs />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 md:gap-5 gap-5">
          {/* Left Side - Image Gallery */}
          <div className="md:col-span-2">
            <div className="relative md:sticky md:top-24">
              {product?.data?.discount ? (
                <div className="absolute top-6 right-3 z-20 bg-gradient-to-r from-gray-700 to-gray-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
                  {product.data.discount}
                  {fixedDiscount || percentageDiscount} OFF
                </div>
              ) : null}

              <div className="flex flex-col-reverse transition-all justify-start items-center duration-300 gap-2 md:w-auto h-auto w-9/12 mx-auto">
                {/* Thumbnail Column */}
                <div className="mt-4 lg:mt-4">
                  <div className="flex justify-center items-center lg:space-y-3 space-x-3 lg:space-x-0 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 bg-white px-10 rounded-sm py-1 gap-7">
                    {getAllThumbnailImages().length > 0 ? (
                      getAllThumbnailImages().map((imageObj, idx) => {
                        const isCurrentColorImage = selectedColor ? imageObj.color === selectedColor : true
                        const isActiveImage = getImagesForColor()[imageIndex] === imageObj.path

                        return (
                          <div
                            key={idx}
                            className={`flex-shrink-0 md:w-20 md:h-20 w-16 h-16 border-3 rounded-sm bg-white cursor-pointer overflow-hidden relative transition-all duration-200 hover:scale-105 ${
                              isActiveImage
                                ? "border-gray-500 shadow-sm ring-2 ring-gray-500"
                                : "border-slate-200 hover:border-slate-300"
                            } ${!isCurrentColorImage ? "opacity-50" : "opacity-100"}`}
                            onClick={() => {
                              const currentImages = getImagesForColor()
                              const newIndex = currentImages.findIndex((img) => img === imageObj.path)
                              if (newIndex !== -1) {
                                setImageIndex(newIndex)
                              } else {
                                if (imageObj.color && imageObj.color !== selectedColor) {
                                  handleColorChange(imageObj.color)
                                  setImageIndex(0)
                                }
                              }
                            }}
                          >
                            <Image
                              src={imageObj.path || noImg}
                              alt={`${product?.data?.name} ${idx + 1}`}
                              width={72}
                              height={72}
                              className="w-full h-full object-cover"
                            />
                            {imageObj.color && (
                              <div
                                className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                                style={{
                                  backgroundColor:
                                    imageObj.color === "Desert Titanium"
                                      ? "#e7d4c6"
                                      : imageObj.color === "Black Titanium"
                                        ? "#5b5b5b"
                                        : imageObj.color === "Blue Titanium"
                                          ? "#2a2e54"
                                          : imageObj.color === "White Titanium"
                                            ? "#e4e4e4"
                                            : imageObj.color === "Natural Titanium"
                                              ? "#aba5a0"
                                              : imageObj.color,
                                }}
                              />
                            )}
                          </div>
                        )
                      })
                    ) : (
                      <div className="w-18 h-18 border-2 border-slate-200 rounded-xl">
                        <Image
                          src={noImg || "/placeholder.svg"}
                          alt="No image"
                          width={72}
                          height={72}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Image */}
                <div className="flex md:justify-start justify-center">
                  <div className="w-full transition-all duration-300 hidden lg:block bg-white rounded-md shadow-sm sticky top-3 z-50">
                    <MagnifiedImage image_path={getImagesForColor()[imageIndex]} alt={product?.data?.name} />
                  </div>
                  <div className="lg:hidden bg-white rounded-2xl shadow-sm p-6">
                    <Image
                      unoptimized
                      src={getImagesForColor()[imageIndex] || product?.data?.image_path || noImg || "/placeholder.svg"}
                      alt={product?.data?.name || "Product"}
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className={`md:col-span-3 space-y-8 ${isFixed ? "product-details-offset" : ""}`}>
            <div className="flex justify-between items-center mb-3">
              {product?.data?.brand_image ? (
                <div>
                  <Image
                    alt="brandLogo"
                    src={product.data.brand_image || "/placeholder.svg"}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              ) : (
                <h1 className="font-semibold text-xs bg-gray-100 text-black border border-gray-300 px-5 py-1 rounded-full">
                  {product?.data?.brand_name}
                </h1>
              )}

              <div>
                <ShareModal />
              </div>
            </div>

            {/* Product Title & Price */}
            <div className="mb-6">
              <h1 className="text-lg lg:text-xl font-semibold text-slate-900 mb-4 leading-tight roboto">
                {product?.data?.name}
              </h1>

              <div className="flex md:flex-row flex-col md:items-center gap-5 md:gap-0 justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-baseline space-x-3">
                    <div className="text-3xl md:text-4xl font-bold text-slate-800">
                      ৳{formatPriceBD(discountedPrice)}
                    </div>

                    {product?.data?.discount && (
                      <div className="md:text-lg text-slate-500 line-through">৳{formatPriceBD(selectedSalePrice)}</div>
                    )}
                  </div>

                  <div className="h-6 border-l border-slate-300"></div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm md:text-base text-black">Availability:</span>
                    {product?.data?.current_stock > 0 ? (
                      <p className="text-xs text-green-500 font-semibold">In Stock</p>
                    ) : (
                      <p className="text-xs text-red-500 font-semibold">Stock Out</p>
                    )}
                  </div>
                </div>

                {(selectedColor || selectedStorage) && (
                  <div className="flex items-center space-x-2 bg-slate-50 px-4 py-1 rounded-full border justify-center border-slate-300">
                    {selectedStorage && (
                      <span className="text-xs font-semibold text-center text-slate-700">{selectedStorage}</span>
                    )}
                    {selectedStorage && selectedColor && <span className="text-slate-400">•</span>}
                    {selectedColor && <span className="text-xs font-semibold text-slate-700">{selectedColor}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="bg-white rounded-md shadow-xs p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Color: <span className="text-gray-700 text-sm">{selectedColor || "Select"}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                        selectedColor === color
                          ? "border-gray-500 border-2 text-gray-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{
                          backgroundColor:
                            color === "Icy Blue"
                              ? "#d9e4f6"
                              : color === "Mint"
                                ? "#d8e9dc"
                                : color === "Navy"
                                  ? "#2c3e75"
                                  : color === "Silver Shadow"
                                    ? "#b3b3b3"
                                    : color === "Desert Titanium"
                                      ? "#e7d4c6"
                                      : color === "Black Titanium"
                                        ? "#5b5b5b"
                                        : color === "Blue Titanium"
                                          ? "#2a2e54"
                                          : color === "White Titanium"
                                            ? "#e4e4e4"
                                            : color === "Natural Titanium"
                                              ? "#aba5a0"
                                              : color,
                        }}
                      />
                      <span className="text-xs font-semibold">{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage and Region Selection */}
            {(storages.length > 0 || region.length > 0) && (
              <div className="grid md:grid-cols-2 grid-cols-1 items-start gap-5">
                {/* Storage Selection */}
                {storages.length > 0 && (
                  <div className="bg-white rounded-md shadow-xs p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Storage: <span className="text-slate-500 text-sm">{selectedStorage || "Select"}</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {storages.map((storage) => (
                        <button
                          key={storage}
                          onClick={() => handleStorageChange(storage)}
                          className={`px-5 text-sm py-1 border-2 rounded-full font-semibold transition-all duration-200 hover:scale-105 ${
                            selectedStorage === storage
                              ? "border-slate-600 bg-slate-50 text-slate-700 shadow-lg"
                              : "border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {storage}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Region Selection */}
                {region.length > 0 && (
                  <div className="bg-white rounded-md shadow-xs p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Region: <span className="text-slate-500 text-sm">{selectedRegion || "Select"}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {region.map((rgn) =>
                        rgn ? (
                          <button
                            key={rgn}
                            className={`px-4 py-1 rounded-full font-medium roboto text-sm transition-all duration-200 hover:scale-105 ${
                              selectedRegion === rgn
                                ? "bg-slate-800 text-white shadow-lg"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                            onClick={() => handleRegionChange(rgn)}
                          >
                            {rgn}
                          </button>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quantity:</h3>
              <div className="flex items-center justify-start">
                <div className="flex items-center px-2 bg-white rounded-full shadow-sm py-1 w-fit border border-slate-200">
                  <button
                    onClick={dncQuantity}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="px-8 text-slate-800 font-medium">{quantity}</div>

                  <button
                    onClick={incQuantity}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleCart(
                      {
                        ...product?.data,
                        storage: selectedStorage,
                        color: selectedColor,
                        region: selectedRegion,
                        price: selectedSalePrice,
                      },
                      quantity,
                    )
                  }
                  disabled={isCartItem !== undefined}
                  className={`flex items-center justify-center md:gap-3 gap-1.5 md:py-3 py-2 md:px-6 px-3 flex-1 border-2 md:text-base text-xs rounded-md font-semibold transition-all duration-200 hover:scale-105 ${
                    isCartItem !== undefined
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed border-slate-300"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-lg"
                  }`}
                >
                  <ShoppingCart className="md:w-4 md:h-4 w-5 h-5" />
                  {isCartItem !== undefined ? "Added to Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={() =>
                    handleBuy(
                      {
                        ...product?.data,
                        storage: selectedStorage,
                        color: selectedColor,
                        region: selectedRegion,
                        price: selectedSalePrice,
                      },
                      quantity,
                    )
                  }
                  className="flex items-center justify-center md:gap-3 gap-1.5 md:py-3 py-2 md:px-6 px-3 bg-gray-900 md:text-base text-xs text-white rounded-md font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-sm flex-1"
                >
                  <ShoppingBag className="md:w-4 md:h-4 w-5 h-5" />
                  Buy Now
                </button>
              </div>

              <Link
                href="https://wa.me/+8801888888888"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full md:gap-3 gap-1.5 md:py-3 py-2 md:px-6 px-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 md:text-base text-sm"
              >
                <FaWhatsapp className="text-2xl" />
                <span>Message on WhatsApp</span>
              </Link>
            </div>

            {/* Tabs for Additional Info */}
            <div className="bg-white rounded-md shadow-xs border border-slate-200 overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-200">
                {["Specification", "Description", "Warranty"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-white text-gray-600 border-b-2 border-gray-600 -mb-px"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6 min-h-[300px]">
                {activeTab === "Specification" && (
                  <div className="space-y-4">
                    {product?.data?.specifications && product.data.specifications.length > 0 ? (
                      product.data.specifications.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-lg border border-slate-100"
                        >
                          <span className="font-semibold text-slate-700">{item.name}</span>
                          <span className="text-slate-600 text-right max-w-xs">{item.description}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 text-center py-12">No specifications available</div>
                    )}
                  </div>
                )}

                {activeTab === "Description" && (
                  <div className="prose prose-slate max-w-none">
                    {descriptionText ? (
                      <p className="text-slate-600 leading-relaxed text-lg">{descriptionText}</p>
                    ) : (
                      <p className="text-slate-500 text-center py-12">No description available</p>
                    )}
                  </div>
                )}

                {activeTab === "Warranty" && (
                  <div className="text-slate-600 leading-relaxed text-lg">
                    <p>
                      Explore our{" "}
                      <Link
                        href="/warranty-policy"
                        className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                      >
                        Warranty Policy
                      </Link>{" "}
                      page for detailed information about our comprehensive warranty coverage and support services.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div ref={stopSectionRef} id="stop-section" className="md:mt-40 mt-10">
            <h2 className="md:text-3xl text-2xl font-bold text-slate-900 md:mb-8 mb-5 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {relatedProducts.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${sanitizeSlug(product?.brand_name || product?.name)}/${product?.id}`}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-xl transition-all duration-200 hover:scale-105 group"
                >
                  <div className="aspect-square flex justify-center items-center mb-4 bg-slate-50 rounded-lg overflow-hidden">
                    <Image
                      src={product.image_path || noImg}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="object-contain max-h-full group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-sm font-semibold line-clamp-2 mb-2 text-slate-800 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-900 font-bold text-lg">৳{product.retails_price?.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page

