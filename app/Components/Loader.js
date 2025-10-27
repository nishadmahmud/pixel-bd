"use client"

import { Bars } from "react-loader-spinner";
export default function Loader() {
  return <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
    {/* <Bars
  height="70"
  width="70"
  color="#119a8c"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /> */}

  <div className="h-screen justify-center flex flex-col items-center justify-items-center w-full">
    <svg className="loaderSvg" viewBox="0 0 1320 300">
        <text className="loaderText" x="50%" y="50%" dy=".35em" text-anchor="middle">
           PixelBD
        </text>
    </svg>
</div>
</div>
}