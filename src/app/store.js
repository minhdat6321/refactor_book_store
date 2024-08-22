import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "../components/features/homePage/slice"
import bookDetailPageReducer from "../components/features/bookDetailPage/slice"
import readingPageReducer from "../components/features/readingPage/slice"


const rootReducer = {
  homepage: homePageReducer,
  bookdetailpage: bookDetailPageReducer,
  readingpage: readingPageReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;