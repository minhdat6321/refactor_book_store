import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../../apiService"
import { toast } from "react-toastify";


const initialState = {
  loading: false,
  error: null,
  book: {},
}

const slice = createSlice({
  name: "bookDetailPage",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getBookDetailSuccess(state, action) {
      state.loading = false;
      state.error = null;

      state.book = action.payload

    },
    addingBookFavoriteSuccess(state, action) {
      state.loading = false;
      state.error = null;
    }
  },
})

export const getBookDetail = ({ bookId }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/books/${bookId}`);
    dispatch(slice.actions.getBookDetailSuccess(response.data));
    toast.success(`Get Book Detail Successfully`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
}
export const addingBookFavorite = ({ addingBook }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {

    const response = await apiService.post(`/favorites`, addingBook);
    dispatch(slice.actions.addingBookFavoriteSuccess(response.data));
    console.log(`adding Book: ${JSON.stringify(addingBook)}`)
    toast.success(`The book has been added to the reading list!`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
}

export default slice.reducer