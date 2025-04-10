import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
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
						onClick={() => handleScrollToTop()}
					>
						About Us
					</Link>
					<Link
						to="/contact"
						className="hover:text-white transition duration-200"
						onClick={() => handleScrollToTop()}
					>
						Contact Us
					</Link>
					<Link to="/qna" className="hover:text-white transition duration-200" onClick={() => handleScrollToTop()}>
						FAQs
					</Link>
					<Link
						to="/terms"
						className="hover:text-white transition duration-200"
						onClick={() => handleScrollToTop()}
					>
						Terms
					</Link>
					<Link
						to="/privacy"
						className="hover:text-white transition duration-200"
						onClick={() => handleScrollToTop()}
					>
						Privacy
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
