"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageCircle, GitCompare } from "lucide-react"; // icons
import Link from "next/link";

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-4 right-2 flex flex-col items-end space-y-3 z-[9999]">
      {/* Compare Product Vertical Button */}
      <Link href={`compare`}>
        <div className="flex flex-col items-center md:justify-between justify-center bg-white border border-gray-900 rounded-full md:px-2 px-1.5 md:py-4 py-2 md:h-44 h-36 cursor-pointer md:mr-2 mr-1">
          <span className="text-gray-900 text-[10px] md:text-xs font-semibold writing-vertical">
            Compare Product
          </span>
          <GitCompare className="text-gray-900 md:w-5 md:h-5 w-4 h-4 mt-2" />
        </div>
      </Link>

      {/* Message Icon */}
      {/* <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-900 bg-white cursor-pointer">
        <MessageCircle className="text-gray-900 w-6 h-6" />
      </div> */}

      {/* Chat bubble + avatar */}
      <div className="flex items-end space-x-2">
        {/* Chat bubble */}
        {open && (
          <div className="bg-gray-100 px-4 py-2 rounded-xl shadow text-sm font-medium max-w-xs text-black">
            Sir, How can I help?
          </div>
        )}

        {/* Avatar */}
        <div
          // onClick={() => setOpen(!open)}
          onClick={() => window.open("https://wa.me/+8801345755216", "_blank")}
          className="md:w-12 md:h-12 w-10 h-10 rounded-full overflow-hidden border-2 border-gray-900 bg-white p-1.5 cursor-pointer"
        >
          <Image
            width={100}
            height={100}
            src="/customer-service (1).png"
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
