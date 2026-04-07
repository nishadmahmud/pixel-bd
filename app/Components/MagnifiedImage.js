"use client"

import  NextImage from "next/image";
import { useState } from "react"



const MagnifiedImage= ({ image_path,alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [isZooming, setIsZooming] = useState(false);
  const handleMouseMove = (e) => {
    setIsZooming(true)
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPosition({ x, y })
  }


  return (
    <div className="flex relative rounded-xl items-center gap-5 hover:cursor-zoom-in md:w-[450px] w-80 h-80 md:h-[450px] z-50">
      {/* Image Container */}
      <div className="relative w-full h-full border rounded-xl" onMouseLeave={() => setIsZooming(false)} onMouseMove={handleMouseMove} onMouseUp={() => setIsZooming(true)}>
        <NextImage 
        unoptimized
          src={image_path || "/no-image.jpg"}
        alt={alt}
        fill={true}
        style={{objectFit : 'contain'}}
        className="rounded-xl"
        priority={true}
        />
      </div>

      {/* Magnifier Container */}
      {
        isZooming && <div className="w-[350px] absolute -right-[349px] top-0 h-[350px] overflow-hidden border bg-white z-[9999999999]">
        <div
          className="w-[400px] h-[400px]"
        >
        <div
          className="w-[900px] h-[900px] relative"
          style={{
            transform: `translate(-${zoomPosition.x }%, -${zoomPosition.y }%)`,
          }}
        >
        <NextImage 
        unoptimized
          src={image_path || noImg}
          alt={alt}
          style={{objectFit : 'cover'}}
          fill={true}
          quality={100}
          />
        </div>
        </div>
      </div>
      }
      
    </div>
  )
}

export default MagnifiedImage

