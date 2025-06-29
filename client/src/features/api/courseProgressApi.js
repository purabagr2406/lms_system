// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const COURSE_PROGRESS_API = "http://localhost:8080/api/v1/progress";

// export const courseProgressApi = createApi({
//   reducerPath: "courseProgressApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: COURSE_PROGRESS_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     getCourseProgress: builder.query({
//       query: (courseId) => ({
//         url: `/${courseId}`,
//         method: "GET",
//       }),
//     }),
//     updateLectureProgress: builder.mutation({
//       query: ({ courseId, lectureId }) => ({
//         url: `/${courseId}/lecture/${lectureId}/view`,
//         method:"POST"
//       }),
//     }),

//     completeCourse: builder.mutation({
//         query:(courseId) => ({
//             url:`/${courseId}/complete`,
//             method:"POST"
//         })
//     }),
//     inCompleteCourse: builder.mutation({
//         query:(courseId) => ({
//             url:`/${courseId}/incomplete`,
//             method:"POST"
//         })
//     }),
    
//   }),
// });
// export const {
// useGetCourseProgressQuery,
// useUpdateLectureProgressMutation,
// useCompleteCourseMutation,
// useInCompleteCourseMutation
// } = courseProgressApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API = "https://zestara-server-kqfw.onrender.com/api/v1/progress";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId, viewed }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
        body: {viewed}, // Add required payload if needed
      }),
    }),
    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
        // body: {}, // Add required payload if needed
      }),
    }),
    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
        body: {}, // Add required payload if needed
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
} = courseProgressApi;

export default courseProgressApi;
