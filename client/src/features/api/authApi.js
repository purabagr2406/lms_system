import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";

const USER_API = "http://localhost:8080/api/v1/user" // some base user api from postman
export const authApi = createApi({
	reducerPath:"authApi",
	baseQuery:fetchBaseQuery({
		baseUrl: USER_API,  // end point of api
		credentials:'include'
	}),
	endpoints: (builder) => ({
		// used to fetch and post data
		registerUser: builder.mutation({// to post
			query: (inputData) => ({
				url:"register", // 
				method:"POST",
				body:inputData
			})
		}),
		loginUser: builder.mutation({// to post
			query: (inputData) => ({
				url:"login", // 
				method:"POST",
				body:inputData
			}),
			async onQueryStarted(args, {queryFulfilled, dispatch}) {
				try {
					const result = await queryFulfilled;
					dispatch(userLoggedIn({user: result.data.user}))
				} catch (error) {
					console.log(error);
					
				}
			} // this is called when individula muthation starts
		})
	})
})
export const  {
	useRegisterUserMutation,
	useLoginUserMutation
} = authApi;