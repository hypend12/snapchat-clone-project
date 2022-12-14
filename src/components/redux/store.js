import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/appSlice";
import cameraReducer from "../redux/cameraSlice";


const store = configureStore({
    reducer: {
     app: appReducer,
     camera: cameraReducer
    },
});

export default store;