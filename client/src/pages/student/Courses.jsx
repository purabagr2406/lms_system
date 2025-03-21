import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import lightBg from "../../assets/bg1.jpg";
import darkBg from "../../assets/bg2.jpg";
import { Badge } from "@/components/ui/badge";
const courses = [1, 2, 3, 4, 5, 6];

const Courses = (course) => {
  const { data, isLoading, isSuccess, isError, refetch } =
    useGetPublishedCourseQuery();
  // data?.courses && data.courses.forEach(course => {
  // 	console.log(course._id);
  // });
  if (isError) return <h1>Some Error occured while loading course...</h1>;
  return (
    <div>
      <div
        className={`relative bg-lightBg dark:bg-darkBg inset-0 bg-cover bg-center h-full`}
        // style={
		// 	document.documentElement.classList.contains("dark")
        //     ? { backgroundImage: `url(${darkBg})` }
        //     : { backgroundImage: `url(${lightBg})` }
        // }
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center">
            <Badge className="relative z-10 font-bold text-3xl text-center mb-10 rounded-xl p-4">
              Our Courses
            </Badge>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CourseSkeleton key={index} />
                ))
              : data?.courses &&
                data.courses.map((course, index) => (
                  <Course key={index} course={course} />
                ))}
          </div>
        </div>
      </div>
      {/* <div
        className="hidden dark:block absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${darkBg})` }}
      ></div> */}
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden my-24">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
