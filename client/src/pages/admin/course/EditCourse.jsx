import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './Coursetab'

const EditCourse = () => {
	return (
		<div className='flex-1 my-16'>
			<div className='flex items-center justify-between mb-5'>
				<h1 className='font-bold text-xl'>Add Detailed Information regarding Course </h1>
				<Link to="lecture">
					<Button className="hover:text-blue-600" variant="link">Go to lectures page</Button>
				</Link>
			</div>
			<CourseTab />
		</div>
	)
}

export default EditCourse
