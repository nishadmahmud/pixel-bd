"use client";

import { motion } from "framer-motion";

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        🔁 Refund & Return Policy
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6 text-gray-700 leading-relaxed"
      >
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Overview
          </h2>
          <p>
            Thank you for shopping with <strong>GadgetZone</strong>!  
            We want you to be completely satisfied with your purchase.  
            If you are not fully happy with your order, we’re here to help with
            a straightforward return and refund process.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Return Eligibility
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Returns are accepted within <strong>7 days</strong> of delivery.</li>
            <li>
              The item must be <strong>unused, unopened, and in its original packaging</strong>.
            </li>
            <li>
              Products showing signs of wear, damage, or activation are not eligible for return.
            </li>
            <li>
              A valid <strong>purchase receipt or order number</strong> is required.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Non-Returnable Items
          </h2>
          <p>
            The following items are not eligible for returns or refunds:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Opened or activated smartphones and smartwatches</li>
            <li>Gift cards or promotional vouchers</li>
            <li>Accessories such as screen protectors and cables once opened</li>
            <li>Software or digital downloads</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Refund Process
          </h2>
          <p>
            Once your return is received and inspected, we will notify you of
            the approval or rejection of your refund.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>
              Approved refunds will be processed within <strong>5–10 business days</strong>.
            </li>
            <li>
              Refunds will be credited to your original payment method.
            </li>
            <li>
              Shipping fees are <strong>non-refundable</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Exchange Policy
          </h2>
          <p>
            If you received a defective or damaged product, please contact us
            within <strong>48 hours</strong> of delivery.  
            We’ll arrange a replacement or exchange based on availability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Cancellations
          </h2>
          <p>
            Orders can be canceled before shipment. Once your order has been
            dispatched, it cannot be canceled but may be eligible for a return
            after delivery.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p>
            If you have questions about your order or need help with a return,  
            contact our support team at{" "}
            <a
              href="mailto:support@gadgetzone.com"
              className="text-orange-600 font-medium hover:underline"
            >
              support@appledady.com
            </a>{" "}
            or call us at <strong>+8801345755216</strong>.
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-4">
          Last updated: October 2025
        </p>
      </motion.div>
    </div>
  );
}
