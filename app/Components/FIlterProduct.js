import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterProduct = ({ products, setFilteredItems, updateFilters }) => {
  const [range, setRange] = useState([0, 0]);
  const [max, setMax] = useState(100);
  const [isInStock, setIsInStock] = useState(false);
  const [storage, setStorage] = useState("");
  const [ram, setRam] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [isExpanded, setIsExpanded] = useState(true);
  const [isStorageExpanded, setIsStorageExpanded] = useState(true);
  const [isRamExpanded, setIsRamExpanded] = useState(true);
  const [isBrandExpanded, setIsBrandExpanded] = useState(true);
  const [isWarrantyExpanded, setIsWarrantyExpanded] = useState(true);
  const searchParams = useSearchParams()
  const searchedCategory = searchParams.get("category")
  const availabilityRef = useRef(null);
  const storageRef = useRef(null);
  const ramRef = useRef(null);
  const brandRef = useRef(null);
  const warrantyRef = useRef(null);
console.log(searchedCategory);
  useEffect(() => {
    if (products && products.length > 0) {
      const maximum = Math.max(...products.map(item => item.retails_price || 0), 0);
      setRange([0, maximum]);
      setMax(maximum);
    }
  }, [products]);

  const uniqueStorageList = products
    ? [...new Set(products.map(item => item?.storage).filter(Boolean))]
    : [];

  const uniqueRamList = products
    ? [...new Set(products.map(item => item?.ram).filter(Boolean))]
    : [];

  const uniqueBrandList = products
  ? [...new Set(
      products.flatMap(item =>
        (Array.isArray(item.brands) ? item.brands : [item.brands])
          .filter(Boolean)
          .map(b => b?.name)
      ).filter(Boolean)
    )]
  : [];

  // console.log(products);


  const applyAllFilters = () => {
    if (!products) return;

    let filteredProducts = [...products];

    // Price filter
    filteredProducts = filteredProducts.filter(
      item => item.retails_price >= range[0] && item.retails_price <= range[1]
    );

    // In-stock
    if (isInStock) {
      filteredProducts = filteredProducts.filter(item => item.status !== "Stock out");
    }

    // Storage
    if (storage) {
      filteredProducts = filteredProducts.filter(item => item.storage === storage);
    }

    // RAM
    if (ram) {
      filteredProducts = filteredProducts.filter(item => item.ram === ram);
    }

    // Brand
   if (selectedBrand) {
  filteredProducts = filteredProducts.filter(item => {
    const brandsArray = Array.isArray(item.brands) ? item.brands : [item.brands];
    return brandsArray.some(b => b?.name === selectedBrand);
  });
}


    setFilteredItems(filteredProducts);

    if (updateFilters) {
      updateFilters({
        priceRange: range[0] !== 0 || range[1] !== max ? { min: range[0], max: range[1] } : null,
        inStock: isInStock,
        storage: storage || null,
        ram: ram || null,
        brand: selectedBrand || null,
      });
    }
  };

  useEffect(() => {
    applyAllFilters();
  }, [range, isInStock, storage, ram, selectedBrand, products]);

  const handleStorageChange = (selected) => {
    setStorage(storage === selected ? "" : selected);
  };

  const handleRamChange = (selected) => {
    setRam(ram === selected ? "" : selected);
  };

  const handleBrandChange = (selected) => {
    setSelectedBrand(selectedBrand === selected ? "" : selected);
  };

  return (
    <div className="col-span-1 border border-gray-300 rounded-xl text-black space-y-5">
      
      {/* Price Range */}
      <div className="bg-white p-3 rounded-xl">
        <h4 className="mb-3">Price Range</h4>
        <RangeSlider min={0} max={max} value={range} onInput={setRange} />
        <div className="flex justify-between gap-2 mt-5">
          <input type="text" value={range[0]} readOnly className="w-1/2 outline-none bg-[#F2F3F7] p-2 rounded" />
          <input type="text" value={range[1]} readOnly className="w-1/2 outline-none bg-[#F2F3F7] p-2 rounded" />
        </div>
      </div>

      {/* Availability */}
      <div className="p-3 bg-white rounded-lg border mx-2">
        <button onClick={() => setIsExpanded(!isExpanded)} className="flex w-full justify-between">
          <span className="font-medium text-gray-900">Availability</span>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div
          ref={availabilityRef}
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxHeight: isExpanded ? availabilityRef.current?.scrollHeight : 0 }}
        >
          <div>
            <input type="checkbox" id="in-stock" checked={isInStock} onChange={() => setIsInStock(!isInStock)} />
            <label htmlFor="in-stock" className="ml-2">In Stock</label>
          </div>
        </div>
      </div>

     {
  (searchedCategory === "Andriod" ||
   searchedCategory === "iphone" ||
   searchedCategory === "Macbook" ||
   searchedCategory === "ipad" ||
   searchedCategory === "Tab") ? (
    <>
      {/* Your JSX here */}
     <div>
         {/* Storage */}
      <div className="p-3 bg-white rounded-lg border mx-2">
        <button onClick={() => setIsStorageExpanded(!isStorageExpanded)} className="flex w-full justify-between">
          <span className="font-medium text-gray-900">Storage</span>
          {isStorageExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div
          ref={storageRef}
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${isStorageExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxHeight: isStorageExpanded ? storageRef.current?.scrollHeight : 0 }}
        >
          {uniqueStorageList.length > 0 ? uniqueStorageList.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`storage-${item}`}
                checked={storage === item}
                onChange={() => handleStorageChange(item)}
              />
              <label htmlFor={`storage-${item}`} className="ml-2">{item}</label>
            </div>
          )) : <p className="text-black">N/A</p>}
        </div>
      </div>

      {/* RAM */}
      <div className="p-3 bg-white rounded-lg border mx-2">
        <button onClick={() => setIsRamExpanded(!isRamExpanded)} className="flex w-full justify-between">
          <span className="font-medium text-gray-900">RAM</span>
          {isRamExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div
          ref={ramRef}
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${isRamExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxHeight: isRamExpanded ? ramRef.current?.scrollHeight : 0 }}
        >
          {uniqueRamList.length > 0 ? uniqueRamList.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`ram-${item}`}
                checked={ram === item}
                onChange={() => handleRamChange(item)}
              />
              <label htmlFor={`ram-${item}`} className="ml-2">{item}</label>
            </div>
          )) : <p className="text-black">N/A</p>}
        </div>
      </div>
     </div>
    </>
  ) : ""
}


    

      {/* Brand */}
      <div className="p-3 bg-white rounded-lg border mx-2">
        <button onClick={() => setIsBrandExpanded(!isBrandExpanded)} className="flex w-full justify-between">
          <span className="font-medium text-gray-900">Brand</span>
          {isBrandExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div
          ref={brandRef}
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${isBrandExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxHeight: isBrandExpanded ? brandRef.current?.scrollHeight : 0 }}
        >
          {uniqueBrandList.length > 0 ? uniqueBrandList.map((brand, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrand === brand}
                onChange={() => handleBrandChange(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="ml-2">{brand}</label>
            </div>
          )) : <p className="text-black">N/A</p>}
        </div>
      </div>

      {/* Warranty (Placeholder) */}
      <div className="p-3 bg-white rounded-lg border mx-2">
        <button onClick={() => setIsWarrantyExpanded(!isWarrantyExpanded)} className="flex w-full justify-between">
          <span className="font-medium text-gray-900">Warranty</span>
          {isWarrantyExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        <div
          ref={warrantyRef}
          className={`mt-3 overflow-hidden transition-all duration-300 ease-in-out ${isWarrantyExpanded ? 'opacity-100' : 'opacity-0'}`}
          style={{ maxHeight: isWarrantyExpanded ? warrantyRef.current?.scrollHeight : 0 }}
        >
          <div>
            <input type="checkbox" id="official" />
            <label htmlFor="official" className="ml-2">Official</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
