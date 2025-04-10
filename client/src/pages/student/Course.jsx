import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
// import nextJSCourseImage from '../../assets/nextjscourseimg.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import userImage from '../../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';
const Course = ({ course }) => {
	return (
		<Link to={`/course-detail/${course._id}`}>
			<Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
				<div className='relative'>
					<img src={course.courseThumbnail}
						className='w-full h-36 object-cover rounded-t-lg' />
				</div>
				<CardContent className="px-5 py-4 space-y-3">
					<h1 className='hover:underline font-bold text-lg truncate'>{course.courseTitle}</h1>
					<div className='flex items-center gap-2'>
						<Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
							{course.category}
						</Badge>
						<Badge className={`${course.courseLevel === "Beginner" ? ("bg-green-600") : (course.courseLevel === "Medium" ? ("bg-yellow-600") : ("bg-red-600"))} text-white px-2 py-1 text-xs rounded-full`}>
							{course.courseLevel}
						</Badge>
					</div>
					<div className='text-lg font-bold'>
						<span>{course.coursePrice}</span>
					</div>
					<div className='flex items-center gap-3'>
						<Avatar className="h-8 w-8">
							<AvatarImage src={course.creator?.photoUrl} alt="@shadcn" />
							<AvatarFallback><img className="w-[140%] max-w-xl" src={userImage}></img></AvatarFallback>
						</Avatar>
						<h1 className='font-medium text-sm'>{course.creator?.name}</h1>
					</div>
				</CardContent>
			</Card>
		</Link>

	)
}

export default Course
