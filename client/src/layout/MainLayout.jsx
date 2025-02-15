import Navbar from '@/components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
	return (
		<div>
			<Navbar />
			<div className='flex flex-col min-h-screen'>
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout