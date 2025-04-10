import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Have questions, feedback, or need support? We’d love to hear from you!
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 text-left">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              📍 Office Address
            </h2>
            <p>
              2nd Floor, Zestara HQ, Tech Park Road,
              <br />
              Sector 5, Bengaluru, Karnataka - 560102, India
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              📞 Phone
            </h2>
            <p>+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              📧 Email
            </h2>
            <p>support@zestara.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
