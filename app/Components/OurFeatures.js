import { MessageCircle, MonitorPlay, Settings, Smartphone } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const OurFeatures = () => {
    const services = [
        {
          icon: Smartphone,
          title: "Outfit Finder",
          description: "Find Outfit for Gadgets",
          link : '#'
        },
        {
          icon: MonitorPlay,
          title: "Share Experience",
          description: "We Value your Feedback",
          link : 'https://www.facebook.com/celtelbd'
        },
        {
          icon: MessageCircle,
          title: "Online Support",
          description: "Get Support on WhatsApp",
          link : 'https://wa.me/+8801973075053'
        },
        {
          icon: Settings,
          title: "Cel-Tel Care",
          description: "Repair Your Device",
          link : 'mailto: celtelhelp247@gmail.com '
        },
      ]
    return (
    <section className="py-8 mt-11 w-[95%] mx-auto">
      <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
         <Link 
         href={service.link} 
         target="_blank" 
         key={index}
         className="block group"
       >
         <div className="flex items-center lg:gap-4 gap-3 rounded-lg border bg-[#090909c9] lg:p-6 md:p-5 p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] h-20 lg:min-h-28 md:min-h-24">
           <div className="rounded-full bg-[#ffffff] lg:p-3 p-2 text-[#000000c1] shrink-0 group-hover:bg-[#17c0af] group-hover:text-white transition-colors">
             <service.icon className="lg:h-6 lg:w-6 w-4 h-4" />
           </div>
           <div className="space-y-1 flex-1">
             <h3 className="font-semibold text-gray-100 lg:line-clamp-1 lg:text-base
              text-xs">{service.title}</h3>
             <p className="text-sm text-white line-clamp-2 hidden md:block">{service.description}</p>
           </div>
         </div>
       </Link>
          
        ))}
      </div>
    </section>
    );
};

export default OurFeatures;