"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { User, Menu, Search, ShoppingCart, X } from "lucide-react"
import { ToastContainer } from "react-toastify"
import useStore from "../CustomHooks/useStore"
import CartItems from "./CartItems"
import LoginForm from "./LoginForm"
import Modal from "./Modal"
import RegisterForm from "./RegisterForm"
import "animate.css"
import { userId } from "../utils/constants"

const Header = ({ data }) => {
  const {
    getCartItems,
    refetch,
    setRefetch,
    setOpenCart,
    openCart,
    getWishList,
    isLoginModal,
    setIsLoginModal,
    setToken,
    setHasToken,
  } = useStore()

  const [keyword, setKeyword] = useState("")
  const [searchedItem, setSearchedItem] = useState([])
  const [isRegistered, setIsRegistered] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [navigationData, setNavigationData] = useState([])
  const [navLoading, setNavLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)
  const [reload, setReload] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const searchInputRef = useRef(null)
  const searchResultsRef = useRef(null)
  const debounceRef = useRef(null)
  const pathname = useSearchParams()

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setNavLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/public/categories`)
        if (response.data?.data) {
          setNavigationData(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching navigation data:", error)
        setNavigationData(data?.data || [])
      } finally {
        setNavLoading(false)
      }
    }

    fetchNavigationData()
  }, [data?.data])

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "null")
    if (userInfo) {
      setUser(userInfo)
      setEmail(userInfo?.email)
    }
  }, [reload])

  useEffect(() => {
    getCartItems()
    if (refetch) {
      getCartItems()
      setRefetch(false)
    }
  }, [refetch, getCartItems, setRefetch])

  useEffect(() => {
    getWishList()
    if (refetch) {
      setRefetch(false)
      getWishList()
    }
  }, [refetch, getWishList, setRefetch])

  useEffect(() => {
    if (pathname.get("login") === "false") {
      setIsLoginModal(true)
    }
  }, [pathname, setIsLoginModal])

  const items = getCartItems()
  const total = items?.reduce((acc, curr) => (acc += curr.quantity), 0) || 0
  const users = typeof window !== "undefined" ? localStorage.getItem("user") : null

  const searchedItems = (value) => {
    if (value) {
      setShowBar(true)
      setLoading(true)
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/public/search-product`, {
          keyword: value,
          user_id: userId,
        })
        .then((res) => {
          setSearchedItem(res.data.data.data || [])
          setLoading(false)
        })
        .catch((err) => {
          console.error("Search error:", err)
          setLoading(false)
        })
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setKeyword(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (value.trim() === "") {
      setShowBar(false)
      setSearchedItem([])
      return
    }

    debounceRef.current = setTimeout(() => {
      searchedItems(value)
    }, 500)
  }

  const handleClose = useCallback(
    (e) => {
      if (
        searchInputRef.current &&
        searchResultsRef.current &&
        (searchInputRef.current.contains(e.target) || searchResultsRef.current.contains(e.target))
      ) {
        return
      }
      setShowBar(false)
    },
    [searchInputRef, searchResultsRef],
  )

  useEffect(() => {
    document.addEventListener("click", handleClose)
    return () => document.removeEventListener("click", handleClose)
  }, [handleClose])

  const handleLogout = () => {
    setShowUserInfo(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setHasToken(false)
    setEmail(null)
  }

  const handleModalClose = () => setIsLoginModal(false)

  const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
  }

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    } else {
      setKeyword("")
      setShowBar(false)
    }
  }

  return (
    <div>
      {/* Main Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div>
          <div className="flex items-center justify-between h-16 w-11/12 mx-auto">
            {/* Left: Logo and Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo - Desktop */}
              <Link href="/" className="flex-shrink-0 hidden md:block">
                <Image
                  src="https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1763909864_692320e8c8265.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-7 w-auto"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {navLoading ? (
                  <span className="text-sm text-gray-500">Loading...</span>
                ) : navigationData.length > 0 ? (
                  navigationData.slice(0,5).map((item) => (
                    <Link
                      key={item.id || item.category_id}
                    
                      href={`/category/${encodeURIComponent(item?.category_id || item?.id)}?category=${encodeURIComponent(
                        item?.name,
                      )}&total=${encodeURIComponent(item?.product_count || 0)}`}
                      className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">No categories</span>
                )}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>

            {/* Center: Logo - Mobile */}
            <Link href="/" className="flex-shrink-0 md:hidden absolute left-32 -translate-x-1/2">
              <Image
                src="https://www.outletexpense.xyz/uploads/215-Rifat-Hasan/1763909864_692320e8c8265.png"
                alt="logo"
                width={200}
                height={200}
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </Link>

          
            <div className="flex items-center md:gap-4 gap-2">
              {/* Search Bar - Desktop with Animation */}
              <div className="hidden lg:flex items-center relative">
                <div className="relative flex items-center">
                  <div
                    className={`absolute right-12 transition-all duration-300 ease-in-out overflow-hidden ${
                      isSearchOpen ? "w-96 opacity-100" : "w-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="relative w-full rounded-full">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search a products..."
                        value={keyword}
                        onChange={handleSearchChange}
                        onFocus={() => {
                          if (keyword.trim() !== "") {
                            setShowBar(true)
                          }
                        }}
                        className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none border text-sm"
                      />
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {showBar && keyword && isSearchOpen && (
                    <div
                      ref={searchResultsRef}
                      className="absolute top-full mt-8 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto w-[30rem]"
                    >
                      {loading ? (
                        <div className="p-8 text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        </div>
                      ) : searchedItem.length > 0 ? (
                        <div className="p-4 space-y-2">
                          {searchedItem.slice(0, 8).map((item) => (
                            <Link
                              key={item.id}
                              href={`/products/${sanitizeSlug(item?.name)}/${item?.id}`}
                              onClick={() => {
                                setShowBar(false)
                                setKeyword("")
                                setIsSearchOpen(false)
                              }}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                <Image
                                  src={item?.images?.[0] || item?.image_path || "/placeholder.svg"}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                <p className="text-xs text-gray-500">৳ {item.retails_price?.toLocaleString()}</p>
                              </div>
                            </Link>
                          ))}
                          {searchedItem.length > 8 && (
                            <Link
                              href={`/all-search-result?q=${encodeURIComponent(keyword)}`}
                              onClick={() => {
                                setShowBar(false)
                                setIsSearchOpen(false)
                              }}
                              className="block w-full text-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border-t border-gray-200 mt-2"
                            >
                              View all {searchedItem.length} results
                            </Link>
                          )}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">No products found</div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={handleSearchIconClick}
                    className="transition-colors"
                  >
                    {isSearchOpen ? (
                      <X size={20} className="text-gray-700" />
                    ) : (
                      <Search size={20} className="text-gray-700" />
                    )}
                  </button>
                </div>
              </div>

              {/* Search Icon - Mobile */}
              {/* <button onClick={handleSearchIconClick} className="md:hidden rounded-lg">
                {isSearchOpen ? (
                  <X size={20} className="text-gray-700" />
                ) : (
                  <Search size={20} className="text-gray-700" />
                )}
              </button> */}

               {/* Account Icon */}
              <div className="relative">
                {users ? (
                  <Link
                   href="/profileDashboard"
                   
                    className="pt-2 rounded-lg transition-colors"
                  >
                    <Image
                      src="/user_02.png"
                      alt="user"
                      width={24}
                      height={24}
                      className="rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </Link>
                ) : (
                  <Link 
                  // href="/"
                  href="/login"
                   className="p-2 rounded-lg transition-colors">
                    <User size={20} className="text-gray-700" />
                  </Link>
                )}

               
              </div>

              {/* Cart Icon */}
              <Link 
              href="/cart" 
         
              className="relative p-2 border-gray-500 transition-colors md:border-none border rounded-full">
                <ShoppingCart size={19} className="text-gray-700" />
                {total > 0 && (
                  <span className="absolute top-1 right-1 bg-gray-900 text-white font-semibold rounded-full w-3 h-3 flex items-center justify-center text-[9px]">
                    {total}
                  </span>
                )}
              </Link>

             
            </div>
          </div>

  
{/* Mobile Navigation Sidebar */}
<div className="md:hidden">
  {/* Overlay (always rendered, animates in/out) */}
  <div
    className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300 ${
      isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
    onClick={() => setIsMobileMenuOpen(false)}
  />

  {/* Sidebar */}
  <div
    className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
      isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    {/* Header with Close Button */}
    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
      <div>
              <Image
                src='https://www.outletexpense.xyz/uploads/259-Shydul-Amir-Jihad/1761208216.png'
                alt="pixel bd Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
      <button
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    {/* Navigation Links */}
    <div className="py-3 space-y-1 overflow-y-auto">
      {navLoading ? (
        <p className="text-sm text-gray-500 px-4">Loading...</p>
      ) : navigationData.length > 0 ? (
        navigationData.map((item) => (
          <Link
            key={item.id || item.category_id}
            href={`/category/${encodeURIComponent(item?.category_id || item?.id)}?category=${encodeURIComponent(
              item?.name
            )}&total=${encodeURIComponent(item?.product_count || 0)}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500 px-4">No categories</p>
      )}
    </div>
  </div>
</div>


          {/* Mobile Search Bar - Animated */}
          {!isSearchOpen && (
            <div className="md:hidden   animate-in bg-gray-300 px-4 w-full slide-in-from-top-2 duration-300">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search a products..."
                  value={keyword}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (keyword.trim() !== "") {
                      setShowBar(true)
                    }
                  }}
                  className="w-full px-4 py-2 pl-10 pr-4 text-[16px] rounded-full bg-white my-2 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                {/* Mobile Search Results */}
                {showBar && keyword && (
                  <div
                    ref={searchResultsRef}
                    className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
                  >
                    {loading ? (
                      <div className="p-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                      </div>
                    ) : searchedItem.length > 0 ? (
                      <div className="p-4 space-y-2">
                        {searchedItem.slice(0, 8).map((item) => (
                          <Link
                            key={item.id}
                            href={`/products/${sanitizeSlug(item?.name)}/${item?.id}`}
                            onClick={() => {
                              setShowBar(false)
                              setKeyword("")
                              setIsSearchOpen(false)
                            }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                              <Image
                                src={item?.images?.[0] || item?.image_path || "/placeholder.svg"}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-xs text-gray-500">৳ {item.retails_price?.toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                        {searchedItem.length > 8 && (
                          <Link
                            href={`/all-search-result?q=${encodeURIComponent(keyword)}`}
                            onClick={() => {
                              setShowBar(false)
                              setIsSearchOpen(false)
                            }}
                            className="block w-full text-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border-t border-gray-200 mt-2"
                          >
                            View all {searchedItem.length} results
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500 text-sm">No products found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      {openCart && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40">
          <CartItems />
        </div>
      )}

      {/* Login/Register Modal */}
      {isLoginModal ? (
        <Modal
          content={
            isRegistered ? (
              <LoginForm
                isLoginModal={isLoginModal}
                onClose={handleModalClose}
                setIsRegistered={setIsRegistered}
                setReload={setReload}
                isRegistered={isRegistered}
              />
            ) : (
              <RegisterForm setIsRegistered={setIsRegistered} isLoginModal={isLoginModal} isRegistered={isRegistered} />
            )
          }
          onClose={handleModalClose}
          setReload={setReload}
          title={isRegistered ? "Sign In" : "Sign Up"}
        />
      ) : null}

      <ToastContainer style={{ zIndex: 99999000 }} />
    </div>
  )
}

export default Header
