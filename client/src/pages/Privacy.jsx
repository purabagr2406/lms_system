import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-28 px-4 sm:px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="mb-4 text-lg">
        At <strong>Zestara</strong>, we are committed to protecting your
        privacy. This policy explains how we collect, use, and protect your
        personal information when you use our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>
          Personal details such as name, email address, and contact number
        </li>
        <li>Account login credentials</li>
        <li>Payment and billing information</li>
        <li>Usage data (pages visited, time spent, interactions)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>To provide and improve our services</li>
        <li>To personalize your learning experience</li>
        <li>To process transactions and send notifications</li>
        <li>
          To send newsletters or promotional emails (you can opt-out anytime)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        3. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell your personal data. We may share your data with:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            Service providers who help operate our platform (e.g., payment
            processors)
          </li>
          <li>Government authorities if required by law</li>
        </ul>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We implement strict security measures to protect your data from
        unauthorized access, disclosure, or loss. However, no method of
        transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your experience. You can control cookie
        preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Your Rights</h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>You can access and update your personal information at any time</li>
        <li>You may request deletion of your data by contacting us</li>
        <li>
          You can unsubscribe from our marketing emails via the provided link
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        7. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update our privacy policy occasionally. Changes will be reflected
        on this page with an updated date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions regarding this privacy policy, contact us at:
        <br />
        📧{" "}
        <a
          href="mailto:privacy@zestara.com"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          privacy@zestara.com
        </a>
        <br />
        📞 +91 98765 43210
      </p>

      <p className="text-center text-sm mt-12 text-gray-500 dark:text-gray-400">
        Last updated: April 2025
      </p>
    </div>
  );
};

export default Privacy;
