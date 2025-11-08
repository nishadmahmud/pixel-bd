"use client";

import { motion } from "framer-motion";

export default function ExchangePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        🔁 Exchange & Return Policy
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6 text-gray-700 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Introduction
          </h2>
          <p>
            At <strong>Pixel bd</strong>, customer satisfaction is our top priority. 
            If you are not fully satisfied with your purchase, you may be eligible 
            to exchange or return your product under the terms outlined below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Eligibility for Exchange or Return
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Products can be exchanged or returned within <strong>7 days</strong> of delivery.
            </li>
            <li>
              Items must be <strong>unused</strong>, in their <strong>original packaging</strong>, 
              and with all accessories and labels intact.
            </li>
            <li>
              Digital products, software licenses, and personal-use items are 
              <strong> non-refundable</strong>.
            </li>
            <li>
              Proof of purchase (invoice or order ID) is required for all requests.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Conditions for Exchange
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Exchange is possible only for the same product model or similar value.</li>
            <li>If the desired product is out of stock, you may choose a replacement or receive store credit.</li>
            <li>Price differences (if any) must be settled during the exchange process.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Damaged or Defective Items
          </h2>
          <p>
            If you receive a damaged or defective product, please contact us 
            within <strong>48 hours</strong> of delivery. We will verify your claim 
            and arrange for a replacement or exchange at no extra cost. 
            Products damaged due to misuse or negligence are not eligible for replacement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How to Request an Exchange or Return
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Contact our support team via phone or email with your order details.</li>
            <li>Provide a brief reason and attach product photos if applicable.</li>
            <li>Our team will review your request and provide next steps within 24–48 hours.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Refund Policy
          </h2>
          <p>
            Refunds are processed only in cases where replacement or exchange is not possible. 
            Approved refunds will be issued to your original payment method within 
            <strong> 5–10 business days</strong>, depending on your bank or payment provider.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Shipping Costs
          </h2>
          <p>
            Customers are responsible for shipping costs associated with returning or 
            exchanging items unless the product was damaged or incorrectly delivered.  
            We recommend using a trackable courier service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Exceptions
          </h2>
          <p>
            The following items are not eligible for exchange or return:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Opened or used electronic accessories</li>
            <li>Software or digital downloads</li>
            <li>Gift cards and promotional items</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p>
            For any questions or exchange requests, please contact our support team at <strong>+8801601109872</strong>.
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-4">
          Last updated: October 2025
        </p>
      </motion.div>
    </div>
  );
}
