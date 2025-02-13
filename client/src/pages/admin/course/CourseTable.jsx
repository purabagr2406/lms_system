import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi';
import { Badge, Edit } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

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
	const {data, isLoading} = useGetCreatorCourseQuery();
	const navigate = useNavigate();

	if(isLoading) return <h1>Loading...</h1>
	console.log("data -> ", data);
	
	// const isLoading = false;
	return (
		<div className='my-20'>
			<Button onClick={() => navigate(`/admin/course/create`)}>Create New Course</Button>
			<Table>
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
					{/* {data.courses.map((invoices) => (
						<TableRow key={course._id}>
							<TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
							<TableCell> <Badge>{course.isPublished ? "Published" : "Draft"}</Badge> </TableCell>
							<TableCell>{course.courseTitle}</TableCell>
							<TableCell className="text-right">
								<Button size='sm' variant='ghost' onClick={() => navigate(`${course._id}`)}><Edit /></Button>
							</TableCell>
						</TableRow>
					))} */}
					{
						isLoading ? <TableCaption>Loading</TableCaption> : (
							data?.courses?.map((course) => (
								<TableRow key={course._id}>
									<TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
									<TableCell><Badge>{course.isPublished? "Published":"Draft"}</Badge></TableCell>
									<TableCell>{course.courseTitle}</TableCell>
									<TableCell className="text-right">
										<Button size='sm' variant='ghost' className="font-bold" onClick={() => navigate(`${course._id}`)}><Edit /></Button>
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
