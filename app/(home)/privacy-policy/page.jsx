"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        🔒 Privacy Policy
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
            Welcome to <strong>Pixel bd</strong>. We value your privacy and are committed 
            to protecting your personal data. This Privacy Policy explains how 
            we collect, use, and safeguard your information when you visit or 
            make a purchase from our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, billing and shipping address.
            </li>
            <li>
              <strong>Payment Details:</strong> Securely processed via third-party
              payment gateways. We do not store your card information.
            </li>
            <li>
              <strong>Device Information:</strong> Browser type, IP address,
              and usage patterns collected via cookies to enhance your
              experience.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process orders and deliver your products.</li>
            <li>To communicate updates, order confirmations, and support responses.</li>
            <li>To improve our products, services, and website performance.</li>
            <li>To send exclusive offers and promotions (only if you’ve subscribed).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Data Protection & Security
          </h2>
          <p>
            We implement strong security measures to protect your personal
            information from unauthorized access, alteration, or disclosure.
            Your sensitive data (like payment info) is encrypted and transmitted
            securely using SSL technology.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Sharing Your Information
          </h2>
          <p>
            We do not sell, trade, or rent user information to others.  
            We may share limited data with trusted third parties (such as
            courier and payment providers) to complete your orders.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Cookies
          </h2>
          <p>
            Our website uses cookies to personalize your browsing experience and
            analyze site performance. You can choose to disable cookies in your
            browser settings, but some site features may not function properly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. To make a request, please contact our support team.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy periodically. Updates will be 
            posted on this page with a revised “Last Updated” date. We encourage 
            you to review this policy regularly to stay informed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p>
            For questions, feedback, or privacy concerns, please reach out to us at{" "}
            
            or call <strong>++8801601109872</strong>.
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-4">
          Last updated: October 2025
        </p>
      </motion.div>
    </div>
  );
}
