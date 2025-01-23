import { authApi } from "@/features/api/authApi";
import authReducer from "../features/authSlice";
import { combineReducers } from "redux";

const rootReducer=combineReducers({
	[authApi.reducerPath]:authApi.reducer,
	auth:authReducer
});
export default rootReducer;