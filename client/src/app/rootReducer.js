import { authApi } from "@/features/api/authApi";
import authReducer from "../features/authSlice";
import { combineReducers } from "redux";
import { courseApi } from "@/features/api/courseApi";

const rootReducer=combineReducers({
	[authApi.reducerPath]:authApi.reducer,
	[courseApi.reducerPath]:courseApi.reducer,
	auth:authReducer
});
export default rootReducer;