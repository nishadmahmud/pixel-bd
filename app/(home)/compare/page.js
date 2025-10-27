"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import noImg from "/public/no-image.jpg"
import useStore from "@/app/CustomHooks/useStore"
import { Search, X, Plus, ShoppingCart, Star, AlertCircle, GitCompare } from "lucide-react"
import { userId } from "@/app/utils/constants"
import { IoMdGitCompare } from "react-icons/io";

const SearchField = ({
  keyword,
  setKeyword,
  products,
  showResults,
  setShowResults,
  loading,
  setLoading,
  setProducts,
  selectedProduct,
  setSelectedProduct,
  placeholder,
  position = "left",
  handleSearch,
  handleSelectProduct,
}) => (
  <div className="relative">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          handleSearch(e.target.value, setProducts, setShowResults, setLoading)
        }}
        onFocus={() => keyword && setShowResults(true)}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        placeholder={placeholder}
        className="w-full pl-11 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
        </div>
      )}
    </div>

    {showResults && products.length > 0 && (
      <div
        className={`absolute top-full mt-2 w-full max-w-md z-50 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden ${
          position === "right" ? "right-0" : position === "center" ? "left-1/2 transform -translate-x-1/2" : "left-0"
        }`}
      >
        <div className="max-h-80 overflow-y-auto">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                index !== products.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onClick={() => handleSelectProduct(product, setSelectedProduct, setKeyword, setProducts, setShowResults)}
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={product?.images?.[0] || product?.image_path || noImg}
                  fill
                  alt="product"
                  className="object-cover rounded-lg"
                  quality={75}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                {product.price && <p className="text-sm text-gray-500 mt-1">${product.price}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Move ProductCard component outside as well
const ProductCard = ({ product, onRemove, onBuy, placeholder }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
    <div className="p-6 h-full flex flex-col">
      {product ? (
        <>
          <div className="relative mb-6">
            <button
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 z-10 flex items-center justify-center transition-colors duration-200 border border-red-200"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={product?.images?.[0] || product?.image_path || noImg}
                fill
                alt={product.name}
                className="object-cover rounded-lg"
                quality={75}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-900 text-center mb-3 line-clamp-2 min-h-[3rem] text-lg">
              {product.name}
            </h3>

            {product.price && (
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              </div>
            )}

            {product.rating && (
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>
              </div>
            )}

            <div className="mt-auto space-y-3">
              <button
                onClick={onBuy}
                className="w-full bg-[#292929e4] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-center font-medium text-gray-600 mb-2">{placeholder}</p>
          <p className="text-sm text-center text-gray-500">Search and select a product above</p>
        </div>
      )}
    </div>
  </div>
)

const Page = () => {
  const searchParams = useSearchParams()
  const [keyword1, setKeyword1] = useState("")
  const [keyword2, setKeyword2] = useState("")
  const [products1, setProducts1] = useState([])
  const [products2, setProducts2] = useState([])
  const [selectedProduct1, setSelectedProduct1] = useState(null)
  const [selectedProduct2, setSelectedProduct2] = useState(null)
  const [showResults1, setShowResults1] = useState(false)
  const [showResults2, setShowResults2] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [removedProducts, setRemovedProducts] = useState(new Set())

  const { handleBuy, handleCart } = useStore()

  
  useEffect(() => {
    const productId = searchParams.get("productId")
    const productData = searchParams.get("productData")

  
    if (removedProducts.has(productId)) {
      return
    }


    const isAlreadySelected = selectedProduct1?.id === productId || selectedProduct2?.id === productId

    if (isAlreadySelected) {
      return
    }

    if (productId && productData) {
      try {
        const product = JSON.parse(decodeURIComponent(productData))
   
        setSelectedProduct1(product)
      } catch (error) {
        console.error("Error parsing product data:", error)
      }
    } else if (productId && !removedProducts.has(productId)) {
 
      fetchProductById(productId)
    }
  }, [searchParams, selectedProduct1, selectedProduct2, removedProducts])

  const fetchProductById = async (productId) => {
    try {

      if (selectedProduct1?.id === productId) {
        return
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/public/product/${productId}`)
      const product = response.data?.data
      if (product) {
        setSelectedProduct1(product)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    }
  }

  const handleSearch = useCallback((keyword, setProducts, setShowResults, setLoading) => {
    if (keyword.trim()) {
      setLoading(true)
      setShowResults(true)
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/public/search-product`, {
          keyword,
          user_id: userId,
        })
        .then((res) => {
          const fetchedProducts = res.data?.data?.data || []
          setProducts(fetchedProducts)
        })
        .catch(() => setProducts([]))
        .finally(() => setLoading(false))
    } else {
      setProducts([])
      setShowResults(false)
      setLoading(false)
    }
  }, [])


  const handleSelectProduct = useCallback((product, setSelectedProduct, setKeyword, setProducts, setShowResults) => {
    setSelectedProduct(product)
    setKeyword("")
    setProducts([])
    setShowResults(false)
  }, [])

  const handleRemoveProduct = useCallback((setSelectedProduct, productId) => {
    setSelectedProduct(null)


    if (productId) {
      setRemovedProducts((prev) => new Set([...prev, productId]))
    }

    const url = new URL(window.location)
    url.searchParams.delete("productId")
    url.searchParams.delete("productData")
    window.history.replaceState({}, "", url.toString())
  }, [])

  const getAllSpecs = () => {
    const allSpecs = new Set()
    ;[selectedProduct1, selectedProduct2].forEach((product) => {
      if (product?.specifications) {
        product.specifications.forEach((spec) => allSpecs.add(spec.name))
      }
    })
    return Array.from(allSpecs)
  }

  const getSpecValue = (product, specName) => {
    if (!product?.specifications) return null
    const spec = product.specifications.find((s) => s.name === specName)
    return spec?.description || null
  }

  const compareValues = (val1, val2) => {
    const values = [val1, val2].filter((v) => v !== null)
    if (values.length <= 1) return { same: true, different: false }
    return {
      same: values.every((v) => v === values[0]),
      different: !values.every((v) => v === values[0]),
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-2">
        {/* Header */}
        <div className="text-start mb-5 w-11/12 mx-auto pt-2">
          <h1 className="text-3xl flex items-center gap-2 font-semibold text-gray-900 mb-4">
            <IoMdGitCompare></IoMdGitCompare>
            Compare Products</h1>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed">
            Find and compare 2 products side by side to make the best purchasing decision
          </p>
        </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <SearchField
            keyword={keyword1}
            setKeyword={setKeyword1}
            products={products1}
            showResults={showResults1}
            setShowResults={setShowResults1}
            loading={loading1}
            setLoading={setLoading1}
            setProducts={setProducts1}
            selectedProduct={selectedProduct1}
            setSelectedProduct={setSelectedProduct1}
            placeholder="Search for first product..."
            position="left"
            handleSearch={handleSearch}
            handleSelectProduct={handleSelectProduct}
          />

          <SearchField
            keyword={keyword2}
            setKeyword={setKeyword2}
            products={products2}
            showResults={showResults2}
            setShowResults={setShowResults2}
            loading={loading2}
            setLoading={setLoading2}
            setProducts={setProducts2}
            selectedProduct={selectedProduct2}
            setSelectedProduct={setSelectedProduct2}
            placeholder="Search for second product..."
            position="right"
            handleSearch={handleSearch}
            handleSelectProduct={handleSelectProduct}
          />
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ProductCard
            product={selectedProduct1}
            onRemove={() => handleRemoveProduct(setSelectedProduct1, selectedProduct1?.id)}
            onBuy={() => handleCart(selectedProduct1, 1)}
            placeholder="Select First Product"
          />

          <ProductCard
            product={selectedProduct2}
            onRemove={() => handleRemoveProduct(setSelectedProduct2, selectedProduct2?.id)}
            onBuy={() => handleCart(selectedProduct2, 1)}
            placeholder="Select Second Product"
          />
        </div>

        {/* Comparison Table */}
        {(selectedProduct1 || selectedProduct2) && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <div className="px-6 py-6">
              <h2 className="text-2xl font-bold text-[#292929e4] flex items-center">
                <AlertCircle className="h-6 w-6 mr-3" />
                Detailed Comparison
              </h2>
              <p className="text-[#292929e4] mt-2">Compare specifications side by side</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b-2 border-gray-200">
                      Specification
                    </th>
                    {selectedProduct1 && (
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b-2 border-l border-gray-200">
                        Product 1
                      </th>
                    )}
                    {selectedProduct2 && (
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-b-2 border-l border-gray-200">
                        Product 2
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {getAllSpecs().length > 0 ? (
                    getAllSpecs().map((specName, index) => {
                      const val1 = getSpecValue(selectedProduct1, specName)
                      const val2 = getSpecValue(selectedProduct2, specName)
                      const comparison = compareValues(val1, val2)

                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-25">
                            {specName.charAt(0).toUpperCase() + specName.slice(1)}
                          </td>
                          {selectedProduct1 && (
                            <td className="px-6 py-4 text-sm text-gray-700 border-l border-gray-200 text-center">
                              {val1 ? (
                                <div className="flex items-center justify-center">
                                  {comparison.different && val1 && (
                                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                                  )}
                                  <span className="font-medium">{val1}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400 italic">N/A</span>
                              )}
                            </td>
                          )}
                          {selectedProduct2 && (
                            <td className="px-6 py-4 text-sm text-gray-700 border-l border-gray-200 text-center">
                              {val2 ? (
                                <div className="flex items-center justify-center">
                                  {comparison.different && val2 && (
                                    <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
                                  )}
                                  <span className="font-medium">{val2}</span>
                                </div>
                              ) : (
                                <span className="text-gray-400 italic">N/A</span>
                              )}
                            </td>
                          )}
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={[selectedProduct1, selectedProduct2].filter(Boolean).length + 1}
                        className="px-6 py-16 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="font-medium text-lg mb-2">No specifications available</p>
                          <p className="text-sm text-gray-400">
                            Product specifications will appear here when available
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedProduct1 && !selectedProduct2 && (
          <div className="bg-white rounded-xl shadow-lg text-center py-16 px-8 border border-gray-200">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Comparing Products</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Use the search fields above to find and select products you want to compare. You can compare 2 products
                at once to make informed purchasing decisions.
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Search className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Search</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Plus className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Select</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium">Compare</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
