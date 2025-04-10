import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-28 px-4 sm:px-8 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        About Zestara
      </h1>

      <p className="text-lg mb-4">
        <strong>Zestara</strong> is a next-generation Learning Management System
        (LMS) built to empower learners around the globe. Whether you're a
        student, professional, or lifelong learner, Zestara provides a platform
        to grow your knowledge and skills through expertly curated courses and
        interactive content.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">🎯 Our Mission</h2>
      <p className="mb-4">
        Our mission is to make quality education accessible and affordable. We
        strive to bridge the gap between learners and industry-ready skills
        through practical, flexible, and affordable learning paths.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">💼 What We Offer</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Over 500+ curated courses across tech, business, and creative fields
        </li>
        <li>Certification upon course completion</li>
        <li>Interactive quizzes and project-based learning</li>
        <li>Expert instructors with real-world experience</li>
        <li>24/7 learner support and community discussions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">🌐 Who We Serve</h2>
      <p className="mb-4">
        Zestara serves students, working professionals, and teams from all over
        the world. We believe in inclusive learning and aim to create a space
        where everyone has the opportunity to grow.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">🏢 Our Office</h2>
      <p className="mb-4">
        <strong>Head Office:</strong>
        <br />
        Zestara Learning Pvt. Ltd.
        <br />
        45, Innovation Park, Sector 5<br />
        New Delhi, India - 110001
      </p>

      <p className="mb-4">
        <strong>Phone:</strong> +91 98765 43210
        <br />
        <strong>Email:</strong> support@zestara.com
      </p>

      <p className="text-center text-sm mt-12 text-gray-500 dark:text-gray-400">
        Thank you for choosing Zestara. Together, let's learn something new
        every day!
      </p>
    </div>
  );
};

export default AboutUs;
