import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../../apiService"
import { toast } from "react-toastify";


const initialState = {
  loading: false,
  error: null,
  books: [],
}

const slice = createSlice({
  name: "readingPage",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getFavortiesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.books = action.payload
    },
    removeBookFavoriteSuccess(state, action) {
      state.loading = false;
      state.error = null;
      const removeBookId = action.payload
      state.books = state.books.filter((book) => book.id !== removeBookId)
    },

  },
})

export const getFavorties = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/favorites`);
    dispatch(slice.actions.getFavortiesSuccess(response.data));
    toast.success(`Get Favorite Books Successfully`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
}
export const removeBookFavorite = ({ removedBookId }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/favorites/${removedBookId}`);
    dispatch(slice.actions.removeBookFavoriteSuccess(removedBookId));
    toast.success(`Remove Successfully`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
}

export default slice.reducer