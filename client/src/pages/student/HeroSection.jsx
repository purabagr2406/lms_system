import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const searchHandler = (e) => {
		e.preventDefault();
		if (searchQuery.trim() !== "") {
			// navigate(`/course/search?query=${searchQuery}`);
			navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
		}
		setSearchQuery("");
	}
	return (
		<div className='relative z-10 bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 p-4 text-center rounded-sm mt-16'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-white text-4xl font-bold mb-4'>Find the Best Courses for you</h1>
				<p className='text-gray-200 dark:text-gray-400 mb-6'>Discover, Learn, and Upskill with our wide range of Courses</p>
				<form onSubmit={searchHandler} className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6'>
					<Input type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search from a vast selection of Courses"
						className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
					<Button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
				</form>
				<Button onClick={() => navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
			</div>
		</div>
	)
}

export default HeroSection
