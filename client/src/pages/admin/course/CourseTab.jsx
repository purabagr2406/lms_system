import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {

	const [input, setInput] = useState({
		courseTitle: "",
		subTitle: "",
		description: "",
		category: "",
		courseLevel: "",
		coursePrice: "",
		courseThumbnail: "",
	});
	// const isLoading = false;
	const params = useParams();
	const courseId = params.courseId;
	const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

	useEffect(() => {
		console.log(courseByIdData);
		
		if (courseByIdData?.course) {
			const course = courseByIdData.course;
			setInput({
				courseTitle: course.courseTitle || "",
				subTitle: course.subTitle || "",
				description: course.description || "",
				category: course.category || "",
				courseLevel: course.courseLevel || "",
				coursePrice: course.coursePrice || "",
				courseThumbnail: course.courseThumbnail || "",
			});
		}
	}, [courseId, courseByIdData]);
	// const isPublished = true;
	const navigate = useNavigate();
	const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();


	const changeEventHandler = (e) => {
		const { name, value } = e.target;
		setInput({ ...input, [name]: value })
	}
	const selectCategory = (value) => {
		setInput({ ...input, category: value });
	}
	const selectCourseLevel = (value) => {
		setInput({ ...input, courseLevel: value });
	}
	const [previewThumbnail, setPreviewThumbnail] = useState("");
	const selectThumbnail = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			setInput({ ...input, courseThumbnail: file })
			const fileReader = new FileReader();
			fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
			fileReader.readAsDataURL(file);
		}
	}
	const updateCourseHandler = async () => {
		const formData = new FormData();
		formData.append("courseTitle", input.courseTitle);
		formData.append("subTitle", input.subTitle);
		formData.append("description", input.description);
		formData.append("category", input.category);
		formData.append("courseLevel", input.courseLevel);
		formData.append("coursePrice", input.coursePrice);
		formData.append("courseThumbnail", input.courseThumbnail);
		// console.log(input);
		await editCourse({ formData, courseId });
	}
	useEffect(() => {
		if (isSuccess) {
			toast.success(data.message || "Course Updated");
		}
		if (error) {
			toast.error(error.data.message || "Failed to update")
		}
	}, [isSuccess, error]);
	const [publishCourse] = usePublishCourseMutation();
	const publishStatusHandler = async (action) => {
		try {
			const response = await publishCourse({ courseId, query: action });
			if (response.data) {
				refetch();
				toast.success(response.data.message);
			}
		} catch (error) {
			toast.error("Failed to publish or unpublish course");
		}
	}
	if (courseByIdLoading) return <Loader2 className='h-4 w-4 animate-apin' />
	return (
		<Card>
			<CardHeader className="flex flex-row justify-between">
				<div>
					<CardTitle>Basic Course Information</CardTitle>
					<CardDescription>
						Make changes to your courses here. Click save when you are done.
					</CardDescription>
				</div>
				<div className='flex gap-2'>
					<Button
						disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
						{
							courseByIdData?.course.isPublished ? "Unpublish" : "Publish"
						}
					</Button>
					<Button>Remove Course</Button>
				</div>
			</CardHeader>
			<CardContent>
				<div className='space-y-4 mt-5'>
					<div>
						<Label>Title</Label>
						<Input
							type="text"
							name="courseTitle"
							value={input.courseTitle}
							onChange={changeEventHandler}
							placeholder="E.g. Fullstack development"
						/>
					</div>
					<div>
						<Label>Subtitle</Label>
						<Input
							type="text"
							name="subTitle"
							value={input.subTitle}
							onChange={changeEventHandler}
							placeholder="E.g. Become a Fullstack dev from scratch in 2 months"
						/>
					</div>
					<div>
						<Label>Description</Label>
						<RichTextEditor input={input} setInput={setInput} />
					</div>
					<div className='flex items-center gap-5'>
						<div>
							<Label>Category</Label>
							<Select onValueChange={selectCategory} value={input.category}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder={input.category === "" ? ("Select a Category") : (input.category)} />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Category</SelectLabel>
										<SelectItem value="Next JS">Next JS</SelectItem>
										<SelectItem value="Data Science">Data Science</SelectItem>
										<SelectItem value="Frontend Development">
											Frontend Development
										</SelectItem>
										<SelectItem value="Fullstack Development">
											Fullstack Development
										</SelectItem>
										<SelectItem value="MERN Stack Development">
											MERN Stack Development
										</SelectItem>
										<SelectItem value="Javascript">Javascript</SelectItem>
										<SelectItem value="Python">Python</SelectItem>
										<SelectItem value="Docker">Docker</SelectItem>
										<SelectItem value="MongoDB">MongoDB</SelectItem>
										<SelectItem value="HTML">HTML</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Course Level</Label>
							<Select onValueChange={selectCourseLevel} value={input.courseLevel}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select Level" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Level</SelectLabel>
										<SelectItem value="Beginner">Beginner</SelectItem>
										<SelectItem value="Medium">Medium</SelectItem>
										<SelectItem value="Advanced">Advanced</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Price in (INR)</Label>
							<Input
								type="number"
								name="coursePrice"
								value={input.coursePrice}
								onChange={changeEventHandler}
								placeholder="199"
								className="w-fit"
							/>
						</div>
					</div>
					<div>
						<Label>Course Thumbnail</Label>
						<Input
							type="file"
							accept="image/*"
							className="w-fit"
							onChange={selectThumbnail}
						/>
						{
							previewThumbnail && (
								<img src={previewThumbnail} className="w-64 my-2 rounded-sm" alt='Course Thumbnail' />
							)
						}
					</div>
					<div className='flex flex-row gap-2'>
						<Button disabled={isLoading} onClick={updateCourseHandler}>
							{
								isLoading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
									</>
								) : (
									<>
										Save
									</>
								)
							}
						</Button>
						<Button variant="outline" onClick={() => navigate("/admin/course")}>Cancel</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default CourseTab
