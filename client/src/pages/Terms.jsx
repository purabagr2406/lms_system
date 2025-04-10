import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-28 px-4 sm:px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Terms & Conditions
      </h1>

      <p className="mb-4 text-lg">
        Welcome to <strong>Zestara</strong>. These Terms and Conditions outline
        the rules and regulations for the use of Zestara's Learning Management
        System (LMS).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing or using our platform, you agree to be bound by these
        terms. If you do not agree with any part of the terms, you may not
        access the service.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        2. Use of the Platform
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>You must be at least 13 years old to use our services.</li>
        <li>
          You are responsible for maintaining the confidentiality of your
          account information.
        </li>
        <li>
          Any unauthorized use of your account must be reported immediately.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        3. Intellectual Property
      </h2>
      <p className="mb-4">
        All content available on Zestara, including courses, materials, videos,
        and logos, are the property of Zestara or its licensors and protected by
        copyright laws. You may not reproduce, distribute, or modify any content
        without explicit permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        4. Payments & Refunds
      </h2>
      <p className="mb-4">
        Payments made on Zestara are non-refundable unless explicitly stated
        otherwise. Subscription plans and individual course fees are subject to
        change.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        5. Prohibited Activities
      </h2>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Sharing or reselling course content</li>
        <li>Engaging in harassment or hate speech</li>
        <li>Uploading malicious software or viruses</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        Zestara shall not be liable for any indirect, incidental, or
        consequential damages arising from the use or inability to use our
        platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Modifications</h2>
      <p className="mb-4">
        Zestara reserves the right to update these terms at any time. Changes
        will be notified through the platform. Continued use after changes
        implies acceptance.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-4">
        For any questions about our terms, reach out at:
        <br />
        📧{" "}
        <a
          href="mailto:support@zestara.com"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          support@zestara.com
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

export default Terms;
