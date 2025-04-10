import React from "react";

const QnA = () => {
	const faqs = [
		{
			question: "What is Zestara?",
			answer:
				"Zestara is a Learning Management System (LMS) that offers a wide range of curated courses to help learners upgrade their skills and advance their careers.",
		},
		{
			question: "How do I purchase a course?",
			answer:
				"You can purchase a course by signing in, browsing the course catalog, and clicking on the ‘Enroll Now’ button. Payments can be made securely via card, UPI, or net banking.",
		},
		{
			question: "Can I access courses after purchase?",
			answer:
				"Yes, once you've purchased a course, you get lifetime access to the content unless stated otherwise.",
		},
		{
			question: "Do I get a certificate after completing a course?",
			answer:
				"Absolutely! You’ll receive a certificate of completion once you successfully finish the course.",
		},
		{
			question: "Are there free courses available?",
			answer:
				"Yes, we do offer some free courses. You can explore them by applying the 'Free' filter on the course listing page.",
		},
		{
			question: "Can I access courses on mobile devices?",
			answer:
				"Yes, Zestara is fully responsive and works seamlessly across desktops, tablets, and smartphones.",
		},
		{
			question: "What if I face issues during a lecture?",
			answer:
				"You can report an issue directly from the lecture page or reach out to our support team for help.",
		},
		{
			question: "Can I download course materials?",
			answer:
				"Download options are available for selected resources like PDFs or project files. Video content is accessible online only.",
		},
		{
			question: "Do you offer refunds?",
			answer:
				"Refunds are available under specific conditions. Please review our refund policy on the Terms page for more information.",
		},
		{
			question: "Are there any prerequisites for courses?",
			answer:
				"Some advanced courses might have prerequisites, which will be clearly mentioned in the course description.",
		},
		{
			question: "How is my progress tracked?",
			answer:
				"Your progress is automatically saved as you complete lectures, quizzes, and assignments.",
		},
		{
			question: "Can I interact with instructors?",
			answer:
				"You can post questions in the Q&A section of each course, and instructors or teaching assistants will respond.",
		},
		{
			question: "Do you provide career guidance?",
			answer:
				"Yes! Some of our courses include career guidance modules, resume building tips, and interview preparation.",
		},
		{
			question: "Is group or enterprise training available?",
			answer:
				"Yes, we offer customized training solutions for teams and organizations. Contact us to learn more.",
		},
		{
			question: "How do I contact support?",
			answer:
				"You can reach out to our support team anytime at support@zestara.in or via the Contact Us page.",
		},
	];

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4pb-10 mt-16 pt-5">
			<div className="max-w-4xl mx-auto space-y-10">
				<h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
					Frequently Asked Questions
				</h1>
				<div className="flex flex-col justify-center gap-4">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md"
						>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								{faq.question}
							</h2>
							<p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
						</div>
					))}
				</div>

			</div>
		</div>
	);
};

export default QnA;
