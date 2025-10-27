import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Search = ({searchedItem,setSearchText, searchText, setSearchedItem,searchBarRef, allProducts}) => {

const sanitizeSlug = (str) => {
    return str
      ?.toLowerCase()
      .replace(/\s+/g, '-') 
      .replace(/[^a-z0-9-]/g, ''); 
  };


  useEffect(() => {
    if (!searchText) {
      setSearchedItem([]);
      return;
    }

    const filtered = allProducts?.filter((item) =>
      item.name?.toLowerCase().startsWith(searchText.toLowerCase()) ||
      item.brand_name?.toLowerCase().startsWith(searchText.toLowerCase())
    );

    setSearchedItem(filtered);
  }, [searchText, setSearchedItem]);

  const updateRecentViews = (product) => {
    if (!product?.id) return;

    let recentViews = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    // Remove existing entry if present
    recentViews = recentViews.filter((p) => p.id !== product.id);

    // Add new entry to beginning
    recentViews.unshift({
      id: product.id,
      name: product.name,
      image: product.image_path || product.images?.[0] || noImg.src,
      price: product.retails_price,
      discount: product.discount || 0,
    });

    // Keep only last 6 items
    if (recentViews.length > 6) recentViews.pop();

    localStorage.setItem('recentlyViewed', JSON.stringify(recentViews));
  };
    return (
        <>
        {   searchedItem && searchedItem.length > 0 ? 
            <div ref={searchBarRef} className='bg-white text-black md:w-[35rem] w-[22rem] p-5 absolute lg:top-[4rem] top-[5rem] lg:z-50 left-1/2 transform -translate-x-1/2 rounded-md md:left-[35rem] z-[999999]'>
            <h5 className='text-right'>Products</h5>
            <div className='flex flex-col gap-3'>
                {
                    searchedItem.slice(0,5).map((item,idx) => {
                        return <Link onClick={() => {
                setSearchText('');
                setSearchedItem([]);
                updateRecentViews(item);
              }} href={`/products/${sanitizeSlug(item?.brand_name || item?.name)}/${item?.id}`} key={idx} className='flex gap-2 items-center z-50 hover:bg-gray-200'>
                            {
                                item?.images?.length > 0 ? 
                                <Image
                                    src={item?.images[0]}
                                    height={50} 
                                    width={50} 
                                    alt="mobile-phone"
                                    quality={75}
                                />  : 
                                item?.image_path ? 
                                <Image 
                                src={item.image_path}
                                height={50}
                                width={50}
                                alt='product'
                                />
                                :
                                <Image
                                    src={'https://i.postimg.cc/QNvVWR5r/Whats-App-Image-2025-02-05-at-14-10-04-beb2026f.webp'}
                                    height={50} 
                                    width={50} 
                                    alt="mobile-phone"
                                    quality={75}
                                />
                            }
                            <h3 className='text-black text-sm font-medium z-50'>{item.name}</h3>
                        </Link>
                    })
                }
            </div>
            
        </div>
        : <p>No Products</p>

        }
        </>
    );
};

export default Search;