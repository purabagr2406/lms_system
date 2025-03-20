import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLoadUserQuery } from "@/features/api/authApi";
import { usePublishCourseMutation } from "@/features/api/courseApi";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);
	const course = data?.course;
	const purchased = data?.purchased;
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = useLoadUserQuery();
  const user = userData?.user;
  // console.log(user);
  // console.log(data.course.creator);
  // console.log(data);
  
	// console.log(course)
  // console.log(purchased);
  // console.log(course);

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };
	const [publishCourse, {publishData, publishLoading, pubLishError}] = usePublishCourseMutation();
	const publishStatusHandler = async () => {
		try {
			const response = await publishCourse({courseId, query:"false"});
			if (response.data) {
				navigate(-1);
				console.log("success");
				toast.success(response.data.message);
			}
			else {
				toast.error(response.data.message);
			}
		}
		catch (error) {
			console.log(error);
			toast.error("Error with Server");
		}
	}
  // console.log(course?.lectures[0]?.videoInfo?.videoUrl);
	if (isLoading || userIsLoading) return <h1>Loading...</h1>;
  if (isError || userError) return <h1>Failed to load course details</h1>;
  return (
    <div className="space-y-5 my-16">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-4 py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          {course?.subTitle ? (
            <>
              <p className="text-base md:text-lg">{course?.subTitle}</p>
            </>
          ) : (
            <></>
          )}
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          {user?.role === "instructor" && user?._id === course.creator._id ? (
            <>
              <p>Students enrolled: {course?.enrolledStudents.length}</p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-4 my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures?.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
					<Card>
						<CardHeader>
							<CardTitle>Instructor Controls</CardTitle>
							<div className="w-full flex flex-col gap-2">
								<Button onClick={() => navigate(`/admin/course/${courseId}`)} className="p-2">Edit Course Details</Button>
								<Button variant="outline" className="p-2" onClick={publishStatusHandler} disabled={publishLoading}>Unpublish Course</Button>
								<Button variant="destructive">Remove Course</Button>
							</div>
						</CardHeader>
					</Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                {course?.lectures[0]?.videoUrl ? (
                  <>
                    <ReactPlayer
                      width="100%"
                      height="300px"
                      url={course?.lectures[0]?.videoUrl}
                      controls={true}
                      className="rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-center justify-center items-center vertical-center bg-gray-400 h-full w-full rounded-md">
                      No preview available
                    </p>
                  </>
                )}
              </div>
              <h1>{course?.lectures[0]?.lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                {course.coursePrice}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
							{
								(user?.role === "instructor" && user?._id === course?.creator._id) ? (<></>)
								:(purchased ? (
									<Button onClick={handleContinueCourse} className="w-full">
										Continue Course
									</Button>
								) : (
									<BuyCourseButton courseId={courseId} />
								))
							}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;