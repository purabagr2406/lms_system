import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCourse = () => {
	const [courseTitle, setCourseTitle] = useState("");
	const [category, setCategory] = useState("");

	const navigate = useNavigate();

	const isLoading = false;
	const createCourseHandler = async () => {
		// console.log(courseTitle, category);
		
	}

	const getSelectedCategory = (value) => {
		setCategory(value);
	}
	return (
		<div className='flex-1 mx-10'>
			<div className='mb-4'>
				<h1 className='font-bold text-xl'>Let's add course, add some basic course details for your new course</h1>
				<p className='text-sm'>davhviesvhsefevghevehsu</p>
			</div>
			<div className='space-y-4'>
				<div>
					<Label>Title</Label>
					<Input type="text"
						name="courseTitle"
						placeholder="Your Course Name" 
						value={courseTitle}
						onChange={(e)=> setCourseTitle(e.target.value)}
						/>
				</div>
				<div>
					<Label>Category</Label>
					<Select onValueChange={getSelectedCategory}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select a Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Category</SelectLabel>
								<SelectItem value="Next JS">Next JS</SelectItem>
								<SelectItem value="Data Science">Data Science</SelectItem>
								<SelectItem value="system">System</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center gap-1'>
					<Button variant="outline" onClick={() => navigate("/admin/course")}>Back</Button>
					<Button disabled={isLoading} onClick={createCourseHandler}>
						{
							isLoading ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Please Wait
								</>
							) : "Create"
						}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AddCourse
