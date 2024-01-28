import { configureStore } from "@reduxjs/toolkit";
import translateSlice from "./slices/translateSlice";
import textSlice from "./slices/textSlice";

export default configureStore({
       reducer: {translateSlice, textSlice},
})