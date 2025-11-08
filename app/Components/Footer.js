"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa6";
import companyLogo from "/public/favicon.png";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top grid section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Logo section */}
          <div className="col-span-2 sm:col-span-1 space-y-4">
            <Link href="/">
              <Image
                src='https://www.outletexpense.xyz/uploads/259-Shydul-Amir-Jihad/1761208216.png'
                alt="pixel bd Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>
            <div className="flex gap-3">
              {[
                { icon: FaWhatsapp, href: "https://wa.me/+8801601109872" },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/pixelbdd",
                },
                { icon: Instagram, href: "www.instagram.com/gpixelbd" },
                { icon: FaTiktok, href: "www.tiktok.com/@pixelbdofficial" },
                { icon: Youtube, href: "/youtube" },
              ].map(({ icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded-full hover:bg-gray-100 transition"
                >
                  <Icon className="w-4 h-4 text-gray-700" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link 
              // href="/"
              href="/about-us"
               className="hover:underline">About Us</Link></li>
              <li><Link 
              // href="/" 
              href="/brands" 
              className="hover:underline">Our Brands</Link></li>
              <li><Link 
              href="/order-tracking" 
              className="hover:underline">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Help Center
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="tel:+8801601109872" className="hover:underline">Support Center</Link></li>
              <li><Link href="tel:+8801601109872" className="hover:underline">Feedback</Link></li>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Policies
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link 
              // href="/"
              href="/terms-and-conditions"
               className="hover:underline">Terms & Conditions</Link></li>
              <li><Link 
              // href="/"
              href="/refund-return-policy"
               className="hover:underline">Refund & Return Policy</Link></li>
              <li><Link 
              // href="/"
              href="/privacy-policy"
               className="hover:underline">Privacy Policy</Link></li>
              <li><Link 
              // href="/"
              href="/warranty-policy"
               className="hover:underline">Warranty Policy</Link></li>
              <li><Link 
              // href="/"
              href="/exchange-policy"
               className="hover:underline">Exchange Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Contact
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="tel:+8801601109872" className="hover:underline block flex items-center gap-1">
                <Phone size={16}></Phone>
                  +8801601109872
                </Link>
              </li>
              <li className="text-xs leading-snug flex items-center gap-1">

                <MapPin size={30}></MapPin>
               
 Shop 4A-039B,
Block-A, West court, Level 4, Jamuna Future Park
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10 pt-6 text-center text-xs text-gray-600">
          <p>
            © 2025 <span className="font-medium">Pixel Bd</span>. All rights reserved.
          </p>
          <p className="mt-1">
            Designed & Developed by{" "}
            <Link
              href="https://squadinnovators.com"
              className="text-blue-600 hover:underline font-semibold"
            >
              Squad Innovators
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
