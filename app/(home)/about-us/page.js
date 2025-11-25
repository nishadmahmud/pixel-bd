import Image from "next/image";
import { noImage } from "@/app/utils/constants";


export default function Home() {

  return (
    <main className="min-h-screen text-black bg-white mt-5">
      {/* Who We Are Section */}
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex gap-10">

          <Image
            src={'https://www.outletexpense.xyz/uploads/243-MD-Akter-Hossain/1762613907.jpg' || noImage}
            alt="PixelBD Store Interior"
            width={600}
            height={400}
            className="w-full rounded-lg"
          />

        <div>
            <h2 className="text-2xl font-semibold mb-4 text-nowrap text-black">Who We Are</h2>
          <div>
            <p className="text-gray-600">
                PixelBD is a one-stop tech shop that offers tech enthusiasts authentic smartphones, gadgets, and
                devices at the best prices. We have been serving our customers, and we have never failed to
                achieve the highest customer satisfaction by ensuring top-notch service through multichannel shopping
                stores, online store, EMI facility, exchange offers, free home delivery, dedicated service centers, and many
                more.
            </p>
            <p className="text-gray-600 mt-4">
                We trust our business on client&apos;s trust, and we are committed to doing so as long as we exists are with a
                clear vision to be Bangladesh&apos;s largest tech smartphones, gadgets, and accessories retailer. In PixelBD, we are continuously growing ourselves to meet the challenge of a new age and a new client base. We
                know that client satisfaction is a never-ending journey. Also, we have a dedicated team that thrives us
                towards perfection and quality service.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-8 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* EMI Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">EMI with 31 Banks</h3>
            <p className="text-gray-600 mb-4">
              Now you can buy your favorite devices and gadgets from us with easy monthly payments through EMI. We offer
              this service in collaboration with 31 banks, and you can spread payments over up to 36 months for your
              large purchase.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>

          {/* Exchange Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Exchange and Upgrade</h3>
            <p className="text-gray-600 mb-4">
              Upgrade to a new device with PixelBD&apos;s simple exchange system. Just swap your old device for a new
              one.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>

          {/* Pre-Order Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Pre-Order Anything</h3>
            <p className="text-gray-600 mb-4">
              You can pre-order any device or accessory from PixelBD by providing the product URL. Once you do,
              we&apos;ll confirm your order and make sure you get what you want.
            </p>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Store Image Section */}
      <section className="flex gap-3 px-4 py-8 w-11/12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <Image
            src={'https://www.outletexpense.xyz/uploads/243-MD-Akter-Hossain/1762613789.jpg' || noImage}
            alt="PixelBD Store Interior"
            width={1200}
            height={600}
            className="w-full rounded-lg"
          />
        </div>
        <div className="max-w-6xl mx-auto">
          <Image
            src={'https://www.outletexpense.xyz/uploads/243-MD-Akter-Hossain/1762613837.jpg' || noImage}
            alt="PixelBD Store Interior"
            width={1200}
            height={600}
            className="w-full rounded-lg"
          />
        </div>
        <div className="max-w-6xl mx-auto">
          <Image
            src={'https://www.outletexpense.xyz/uploads/243-MD-Akter-Hossain/1762613818.jpg' || noImage}
            alt="PixelBD Store Interior"
            width={1200}
            height={600}
            className="w-full rounded-lg"
          />
        </div>
      </section>

      {/* Free Shop Pickup Section */}
      <section className="px-4 py-8 bg-gray-50 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Free Shop Pickup : Discover Convenience with Free Shop Pickup at PixelBD in Dhaka City.
          </h2>
          <p className="text-gray-600">
            We are delighted to offer you a seamless and cost-free option for product pickup at PixelBD. Make the
            most of this convenient service by visiting our outlet situated in one of the most prominent locations in
            Dhaka city. Our outlet not only provides a diverse array of Apple products but also ensures a pleasant
            shopping experience. To help you make an informed decision and enhance your understanding of our outlets,
            please take a moment to peruse the additional information available.
          </p>
        </div>
      </section>

    </main>
  )
}

