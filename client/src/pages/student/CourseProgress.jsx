import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
	useCompleteCourseMutation,
	useGetCourseProgressQuery,
	useInCompleteCourseMutation,
	useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {

	const params = useParams();
	const courseId = params.courseId;
	const { data, isLoading, isError, refetch } =
		useGetCourseProgressQuery(courseId);

	const [updateLectureProgress] = useUpdateLectureProgressMutation();
	const [
		completeCourse,
		{
			data: markCompleteData,
			isSuccess: completedSuccess,
			isLoading: completeLoading,
		},
	] = useCompleteCourseMutation();
	const [
		inCompleteCourse,
		{
			data: markInCompleteData,
			isSuccess: inCompletedSuccess,
			isLoading: inCompleteLoading,
		},
	] = useInCompleteCourseMutation();

	useEffect(() => {
		// console.log(markCompleteData);
		if (completedSuccess) {
			toast.success(markCompleteData.message);
			refetch();
			;
		}
	}, [completedSuccess]);
	useEffect(() => {
		if (inCompletedSuccess) {
			toast.success(markInCompleteData.message);
			refetch();
			;
		}
	}, [inCompletedSuccess]);

	const [currentLecture, setCurrentLecture] = useState(null);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Failed to load course details</p>;

	console.log(data);

	const { courseDetails, progress, completed } = data.data;
	const { courseTitle } = courseDetails;
	// const [completedCourses, setCompletedCourses] = useState(progress.filter((lecture) => {
	// initialze the first lecture is not exist
	const initialLecture =
		currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

	const isLectureCompleted = (lectureId) => {
		return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
	};

	const handleLectureProgress = async (lectureId, viewed) => {
		await updateLectureProgress({ courseId, lectureId, viewed });
		refetch();
	};
	// Handle select a specific lecture to watch
	const handleSelectLecture = (lecture) => {
		setCurrentLecture(lecture);
		handleLectureProgress(lecture._id, false);
		// ;
	};
	const handleMarkLecture = (lecture) => {
		handleLectureProgress(lecture._id, progress.some((prog) => prog.lectureId === lecture._id && prog.viewed));
	}
	const handleCompleteCourse = async () => {
		await completeCourse(courseId);
		;
	};
	const handleInCompleteCourse = async () => {
		await inCompleteCourse(courseId);
		;
	};
	return (
		<div className="max-w-7xl p-4 my-20">
			{/* Display course name  */}
			<div className="flex justify-between mb-4">
				<div className="flex flex-row gap-2">
					<h1 className="text-2xl font-bold">{courseTitle}</h1>
					<Badge className={`bg-${completed ? "green" : "yellow"}-600 text-white`}>
						{progress.filter((lecture) => lecture.viewed).length} / {progress.length}
					</Badge>
				</div>

				<Button
					onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
					variant={completed ? "outline" : "default"}
				>
					{completed ? (
						<div className="flex items-center">
							<span>Reset Progress</span>{" "}
						</div>
					) : (
						"Mark all as completed"
					)}
				</Button>
			</div>
			<div className="flex flex-col md:flex-row gap-6">
				{/* Video section  */}
				<div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg">
					<div>
						<video
							src={currentLecture?.videoUrl || initialLecture.videoUrl}
							controls
							className="w-full h-auto md:rounded-lg"
							onPlay={() =>
								handleLectureProgress(currentLecture?._id || initialLecture._id)
							}
						/>
					</div>
					{/* Display current watching lecture title */}
					<div className="mt-2 ">
						<h3 className="font-medium text-lg">
							{`Lecture ${courseDetails.lectures.findIndex(
								(lec) =>
									lec._id === (currentLecture?._id || initialLecture._id)
							) + 1
								} : ${currentLecture?.lectureTitle || initialLecture.lectureTitle
								}`}
						</h3>
					</div>
				</div>
				{/* Lecture Sidebar  */}
				<div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
					<h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
					<div className="flex flex-col overflow-y-auto gap-2">
						{courseDetails?.lectures.map((lecture) => (
							<div className="flex flex-row items-center">
								<div className="cursor-pointer p-4" onClick={() => handleMarkLecture(lecture)}>
									{isLectureCompleted(lecture._id) ? (
										<CheckCircle2 size={24} className="text-green-500" />
									) : (
										<CirclePlay size={24} className="text-blue-500" />
									)}
								</div>

								<Card
									key={lecture._id}
									className={`hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id
										? "bg-gray-200 dark:dark:bg-gray-800"
										: ""
										} w-full `}
									onClick={() => handleSelectLecture(lecture)}
								>
									<CardContent className="flex items-center justify-between p-4">
										<div className="flex items-center">

											<div>
												<CardTitle className="text-lg font-medium">
													{lecture.lectureTitle}
												</CardTitle>
											</div>
										</div>
										{isLectureCompleted(lecture._id) && (
											<Badge
												variant={"outline"}
												className="bg-green-200 text-green-600"
											>
												Completed
											</Badge>
										)}
									</CardContent>
								</Card>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseProgress;
