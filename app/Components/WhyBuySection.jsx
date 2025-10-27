import React from "react";
import { Truck, Tag, RotateCcw } from "lucide-react";
import Heading from "../CustomHooks/heading";

export default function WhyBuySection() {
  const items = [
    {
      icon: <Truck className="w-10 h-10 text-[#fbbc05]" />,
      title: "Free shipping.",
      button: "Learn more",
    },
    {
      icon: <Tag className="w-10 h-10 text-[#34a853]" />,
      title: "Get our price match promise.",
      button: "Learn more",
    },
    {
      icon: <RotateCcw className="w-10 h-10 text-[#fbbc05]" />,
      title: "Free and easy returns.",
      button: "Learn more",
    },
  ];

  return (
    <section className="w-full py-16 bg-white flex flex-col items-center text-center">
     

      <Heading title={`Why buy on the PixelBD.`}></Heading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 md:w-9/12">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border bg-[#f8f9fa] rounded-3xl py-14 px-6 transition hover:shadow-sm"
          >
            <div className="mb-6">{item.icon}</div>
            <h3 className="text-lg font-medium mb-6 text-black">{item.title}</h3>
            <button className="px-5 py-2 border border-gray-900 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white text-black transition">
              {item.button}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-xs text-gray-500 max-w-6xl px-8 leading-relaxed text-left">
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Google Fi Wireless is not subject to data traffic deprioritization
            during times of high network usage.
          </li>
          <li>
            Based on Ookla® Speedtest Intelligence® data, 1H 2025. All rights
            reserved.
          </li>
          <li>
            5G service not available in all areas; speed and performance depend
            on factors like device configuration and capabilities, network
            traffic location, signal strength and signal obstruction. Actual
            results may vary.
          </li>
          <li>
            Get a 50% line discount for 15 months via monthly bill credits,
            applicable per line for each person that brings a phone and joins
            the Unlimited Essentials or Unlimited Standard plan (new users
            only). See full terms at fi.google.com.
          </li>
          <li>
            
Get a 50% line discount for 15 months via monthly bill credits, applicable per line for each person that brings a phone and joins the Unlimited Essentials or Unlimited Standard plan (new users only) at fi.google.com, ending 11/4/25 at 9:59am PT, or while supplies last. On Unlimited Essentials, pay $17.50/mo for 1 line, $30/mo for 2 lines, $40/mo for 3 lines, $45/mo for 4 lines, $56.50/mo for 5 lines, or $67.50/mo for 6 lines for 12 months. On Unlimited Standard, pay $25/mo for 1 line, $40/mo for 2 lines, $45/mo for 3 lines, $50/mo for 4 lines, $62.50/mo for 5 lines, or $75/mo for 6 lines for 15 months. Bill credits are applied to plan charges (e.g., data, calls, texts) and taxes and fees on the newly activated line, and exclude financing costs, device protection and international charges. While this offer cannot be combined with other device promotions, it will remain valid when purchasing a new device (without any promotion) or switching to a new device before 15 months. Changing, or suspending the account before 15 months will void promotion and credits will stop. Promotions are non-transferable, not valid for cash or cash equivalent. US residents with US shipping addresses only. Must be 18 years or older, with Google Pay and Google Fi Wireless accounts. Limit 1 per customer or group plan member. Taxes payable at checkout. Void where prohibited.
          </li>
        </ol>
      </div>
    </section>
  );
}
