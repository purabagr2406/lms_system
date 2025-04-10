import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      {" "}
      {/* Reduced py-6 to py-4 */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-3">
        {" "}
        {/* Reduced space-y */}
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Zestara</span>. All rights
          reserved.
        </p>
        <div className="w-full flex flex-wrap justify-center gap-3 text-sm sm:text-base">
          {" "}
          {/* Reduced gap */}
          <Link
            to="/about"
            className="hover:text-white transition duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition duration-200"
          >
            Contact Us
          </Link>
          <Link to="/qna" className="hover:text-white transition duration-200">
            QnA
          </Link>
          <Link
            to="/terms"
            className="hover:text-white transition duration-200"
          >
            Terms
          </Link>
          <Link
            to="/privacy"
            className="hover:text-white transition duration-200"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
