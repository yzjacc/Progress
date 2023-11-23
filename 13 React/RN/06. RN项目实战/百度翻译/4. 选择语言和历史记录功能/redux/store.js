import { configureStore } from "@reduxjs/toolkit";
import translateReducer from "./slice";

export default configureStore({
    reducer : {
        translate : translateReducer
    }
});
