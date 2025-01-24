import {createApi} from "@reduxjs/toolkit/query/react";
import { Provider } from "react-redux";


const COURSE_API="http://localhost:8080/api/v1/course";



export const courseApi = createApi({
    reducerPath:"courseApi",
    tagTypes:['Refetch_Creator_Course'],
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_API,
        Credentials:"include"
    }),
    endpoints:(builder) => ({
        createCourse:builder.mutation({
            query:({courseTitl,category}) => ({
                url:"",
                method:"POST",
                body:{courseTitle , category},
            }),
            invalidatesTags:['Refetch_Creator_Course']
        }),
        getCreatorCourse:builder.query({
            query:() => ({
                url:"",
                method:"GET",
            }),
            provideTags:['Refetch_Creator_Course']
        }),
        editCourse:builder.mutation({
            query:(FormData ,courseId ) =>({
                url:'/${courseId}',
                method:"PUT",
                body:FormData
            })
        })
    })
})
export const{
useCreateCourseMutation,
useGetCreatorCourseQuery,
useEditCourseMutation,
} = courseApi;