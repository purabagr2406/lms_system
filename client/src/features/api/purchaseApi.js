import {createApi} from "@reduxjs/toolkit/query/react";
import { createCheckoutSession } from "../../../../server/controllers/coursePurchase.controller";

const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:COURSE_PURCHASE_API,
        Credentials:'include'
    }),
    endpoints:(builder) => ({
        createCheckoutSession: builder.mutation({
            query:(courseId) => ({
                url:"/checkout/create-checkout-session",
                method:"POST",
                body:courseId
            })
        })
    })
})

export const{useCreateCheckoutSessionMutation} = purchaseApi;

