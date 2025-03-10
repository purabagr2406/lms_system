import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { build } from "vite";
import { Provider } from "react-redux";

const COURSE_API = "http://localhost:8080/api/v1/course";
export const courseApi = createApi({
	reducerPath: "courseApi",
	tagTypes: ['Refetch_Creator_Course', 'Refetch_Lecture'],
	baseQuery: fetchBaseQuery({
		baseUrl: COURSE_API,
		credentials: 'include'
	}),
	endpoints: (builder) => ({
		createCourse: builder.mutation({
			query: ({ courseTitle, category }) => ({
				url: "",
				method: "POST",
				body: { courseTitle, category }
			}),
			invalidatesTags: ['Refetch_Creator_Course'],
		}),
		getCreatorCourse: builder.query({
			query: () => ({
				url: "/",
				method: "GET",
			}),
			providesTags: ['Refetch_Creator_Course'],
		}),
		getSearchCourses: builder.query({
			query: ({ searchQuery, categories, sortByPrice }) => {
				let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

				if (categories && categories.length > 0) {
					const categoriesString = categories.map(encodeURIComponent).join(",");
					queryString += `&categories=${categoriesString}`;
				}

				if (sortByPrice) {
					queryString += `sortByPrice=${encodeURIComponent(sortByPrice)}`;
				}

				return {
					url: queryString,
					method: "GET",
				}
			}
		}),
		editCourse: builder.mutation({
			query: ({ formData, courseId }) => ({
				url: `/${courseId}`,
				method: "PUT",
				body: formData,
			}),
			invalidatesTags: ['Refetch_Creator_Course'],
		}),
		getCourseById: builder.query({
			query: (courseId) => ({
				url: `/${courseId}`,
				method: "GET",
			})
		}),
		removeCourse: builder.mutation({
			query: (courseId) => ({
				url: `/${courseId}`,
				method: "DELETE",
			}),
			invalidatesTags: ['Refetch_Creator_Course'],
		}),
		createLecture: builder.mutation({
			query: ({ lectureTitle, courseId }) => ({
				url: `/${courseId}/lecture`,
				method: "POST",
				body: { lectureTitle, courseId }
			})
		}),
		getCourseLecture: builder.query({
			query: (courseId) => ({
				url: `/${courseId}/lecture`,
				method: "GET",
			}),
			providesTags: ['Refetch_Lecture'],
		}),

		editLecture: builder.mutation({
			query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
				url: `/${courseId}/lecture/${lectureId}`,
				method: "PUT",
				body: { lectureTitle, videoInfo, isPreviewFree }
			}),
			invalidatesTags: ['Refetch_Lecture'],
		}),
		removeLecture: builder.mutation({
			query: ({ lectureId }) => ({
				url: `/lecture/${lectureId}`,
				method: "DELETE",
			}),
			invalidatesTags: ['Refetch_Lecture'],
		}),
		getLectureById: builder.query({
			query: (lectureId) => ({
				url: `/lecture/${lectureId}`,
				method: "GET"
			})
		}),
		publishCourse: builder.mutation({
			query: ({ courseId, query }) => ({
				url: `/${courseId}?publish=${query}`,
				method: "PATCH",
			}),
		}),
		getPublishedCourse: builder.query({
			query: () => ({
				url: "/published-courses",
				method: "GET",
			}),
		}),
	})
})
export const {
	useCreateCourseMutation, useGetCreatorCourseQuery,
	useEditCourseMutation, useGetCourseByIdQuery,
	useRemoveCourseMutation,
	useCreateLectureMutation, useGetCourseLectureQuery,
	useEditLectureMutation, useRemoveLectureMutation,
	useGetLectureByIdQuery,
	usePublishCourseMutation,
	useGetPublishedCourseQuery,
	useGetSearchCoursesQuery,
} = courseApi;