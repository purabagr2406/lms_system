import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import userImage from '../../assets/default-avatar-profile-icon-of-social-media-user-vector.jpg';

const Profile = () => {
	const { data, isLoading, refetch } = useLoadUserQuery();
	const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError, isSuccess }] = useUpdateUserMutation();
	// const isLoading = true;
	// const enrolledCourses = [3,4];


	const user = data && data.user;
	const [name, setName] = useState("");
	const [profilePhoto, setProfilePhoto] = useState("");

	const onChangeHandler = (e) => {
		const file = e.target.files?.[0];
		setProfilePhoto(file);
		// console.log(profilePhoto);
	}
	const updateUserHandler = async () => {
		const formData = new FormData();
		formData.append("name", name);
		formData.append("photoUrl", profilePhoto);
		// console.log(formData);
		console.log(profilePhoto);
		await updateUser(formData);
	}
	useEffect(() => {
		refetch();
	}, [])
	useEffect(() => {
		if (isSuccess) {
			refetch();
			toast.success(data.message || "Profile Updated.");
		}
		if (isError) {
			toast.error(isError.message || "Error Updating Profile");
		}
	}, [isError, updateUserData, isSuccess])
	// console.log(user);

	const { data: createdCourseData, isLoading: createdCourseLoading, refetch: createdCourseRefetch } = useGetCreatorCourseQuery();

	if (isLoading) return <><h1>Profile is Loading...</h1></>
	return (
		<div className='max-w-4xl mx-4 px-4 my-24'>
			<h1 className='font-bold text-2xl text-center md:text-left'>
				Profile
			</h1>
			<div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-5'>
				<div className='flex flex-col items-center'>
					<Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
						<AvatarImage src={user?.photoUrl || userImage} alt="@shadcn" />
						<AvatarFallback><img className="w-[140%] max-w-xl" src={userImage}></img></AvatarFallback>
					</Avatar>
				</div>
				<div>
					<div className='mb-2'>
						<h1 className='font-semibold text-gray-900 dark:text-gray-100'>
							Name:
							<span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.name}</span>
						</h1>
					</div>
					<div className='mb-2'>
						<h1 className='font-semibold text-gray-900 dark:text-gray-100'>
							Email:
							<span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.email}</span>
						</h1>
					</div>
					<div className='mb-2'>
						<h1 className='font-semibold text-gray-900 dark:text-gray-100'>
							Role:
							<span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user.role.toUpperCase()}</span>
						</h1>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button size="sm" className="mt-2">Edit Profile</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit Profile</DialogTitle>
								<DialogDescription>
									Make Changes to your profile here.
								</DialogDescription>
							</DialogHeader>
							<div className='grid gap-4 py-4'>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label>Name</Label>
									<Input
										type="text"
										placeholder="Name"
										className="col-span-3"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className='grid grid-cols-4 items-center gap-4'>
									<Label>Profile Photo</Label>
									<Input
										onChange={onChangeHandler}
										type="file"
										accept="image/*"
										className="col-span-3"
									/>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={updateUserHandler} disabled={isLoading}>
									{
										updateUserIsLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
											</>
										) : "Save Changes"
									}
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
			<div className='flex flex-col gap-2'>
				<Card>
					<CardHeader className='font-medium text-xl py-2'>Courses you're enrolled in</CardHeader>
					<CardContent className='pb-2'>
						{
							user.enrolledCourses.length === 0 ? (
								<h1>You have not enrolled in any course</h1>
							) : (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
								{
									user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
								}
							</div>
							)
						}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='font-medium text-xl py-2'>
						Courses you've created
					</CardHeader>
					<CardContent className='pb-2'>
						{
							createdCourseLoading ? (<><p>Loading Courses...</p></>) :
								createdCourseData?.courses?.length === 0 ? (
									<h1>You have not created any courses</h1>
								) : (<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-5'>
									{
										createdCourseData?.courses?.map((course) => <Course course={course} key={course._id} />)
									}
								</div>
								)
						}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Profile