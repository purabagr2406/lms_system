import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const Sidebar = () => {
	const location = useLocation();
	return (
		<div className='flex mt-16'>
			<div className='sticky hidden lg:block w-[250px] sm:w-[200px] space-y-8 border-r border-gray-300 dark:border-gray-700 top-0 h-screen'>
				<div>
					<Link to="dashboard" className={`flex items-center gap-2 p-4 transition-all ${location.pathname.includes("dashboard") ? "bg-gray-300 dark:bg-gray-700 font-semibold" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
						<ChartNoAxesColumn size={22} />
						<h1>Dashboard</h1>
					</Link>
					<Link to="course" className={`flex items-center gap-2 p-4 transition-all ${location.pathname.includes("course") ? "bg-gray-300 dark:bg-gray-700 font-semibold" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}>
						<SquareLibrary size={22} />
						<h1>Course</h1>
					</Link>
				</div>
			</div>
			<div className='flex-1 p-10'>
				<Outlet />
			</div>
		</div>
	)
}

export default Sidebar
