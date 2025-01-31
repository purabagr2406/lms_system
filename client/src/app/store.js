import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
export const appStore = configureStore({
	reducer:rootReducer,
	middleware: (defaultMiddleware) =>defaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});
