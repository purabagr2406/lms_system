import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery, useRemoveCourseMutation } from '@/features/api/courseApi';
import { Delete, Edit, Trash } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];



const CourseTable = () => {
	const { data, isLoading, refetch } = useGetCreatorCourseQuery();
	const navigate = useNavigate();
	// console.log(data);
	
	// console.log("data -> ", data);
	const [removeCourse, { data: removeCourseData, isLoading: removeCourseLoading, isSuccess: removeCourseSuccess, error: removeCourseError }] = useRemoveCourseMutation();
	const removeCourseHandler = async (courseId) => {
		await removeCourse(courseId);
	}
	useEffect(() => {
		if (removeCourseSuccess) {
			toast.success(removeCourseData?.message || "Course Removed");
			refetch();
		}
		if (removeCourseError) {
			toast.error(removeCourseError.data.message || "Failed to remove course");
		}
	}, [removeCourseData, removeCourseSuccess, removeCourseError]);
	// const isLoading = false;
	if (isLoading) return <h1>Loading...</h1>
	return (
		<div>
			<Button onClick={() => navigate(`/admin/course/create`)}>Create New Course</Button>
			<Table className="my-5 rounded-full">
				<TableCaption>A list of your recent Courses.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{
						isLoading ? <TableCaption>Loading</TableCaption> : (
							data?.courses?.map((course) => (
								<TableRow key={course._id}>
									<TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
									<TableCell><Badge className={course?.isPublished ? ("bg-green-500") : ("bg-yellow-500")}>{course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
									<TableCell>{course?.courseTitle}</TableCell>
									<TableCell className="text-right">
										<Button size='sm' variant='ghost' className="font-bold" onClick={() => navigate(`${course?._id}`)}><Edit /></Button>
										<Button size="sm" variant='ghost' className="font-bold" onClick={() => removeCourseHandler(course?._id)}><Trash /></Button>
									</TableCell>
								</TableRow>
							))
						)
					}
				</TableBody>
			</Table>

		</div>
	)
}

export default CourseTable
