import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
	const params = useParams();
	const courseId = params.courseId;
	// console.log(courseId);
	const [lectureTitle, setLectureTitle] = useState("");
	// const isLoading = false;
	const navigate = useNavigate();

	const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();
	const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);

	const createLectureHandler = async () => {
		await createLecture({ lectureTitle, courseId });
	}
	console.log(lectureData);
	
	useEffect(() => {
		if (isSuccess) {
			refetch();
			toast.success(data.message);
		}
		if (error) {
			toast.error(error.data.message);
		}
	}, [isSuccess, error])
	return (
		<div className='flex-1 mx-10 my-16'>
			<div className='mb-4'>
				<h1 className='font-bold text-xl'>Let's add a lecture, add some basic course details for your new lecture</h1>
				<p className='text-sm'>davhviesvhsefevghevehsu</p>
			</div>
			<div className='space-y-4'>
				<div>
					<Label>Title</Label>
					<Input type="text"
						name="lectureTitle"
						placeholder="Your Lecture Name"
						value={lectureTitle}
						onChange={(e) => setLectureTitle(e.target.value)}
					/>
				</div>
				<div className='flex items-center gap-2'>
					<Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back to Course</Button>
					<Button disabled={isLoading} onClick={createLectureHandler}>
						{
							isLoading ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
									Please Wait
								</>
							) : "Create Lecture"
						}
					</Button>
				</div>
				<div className='mt-10'>
					{
						lectureLoading ? (
							<p>Loading Lectures...</p>
						) : lectureError ? (
							<p>Failed to load lectures</p>
						) : lectureData?.lectures?.length === 0 ? (
							<p>No lecture available</p>) : (
							lectureData?.lectures?.map((lecture, index) => (
								<Lecture key={lecture._id} lecture={lecture} index={index} />
							))
						)
					}
				</div>
			</div>
		</div>
	)
}

export default CreateLecture
