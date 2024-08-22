import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../../apiService"
import { toast } from "react-toastify";


const initialState = {
  loading: false,
  error: null,
  books: [],
}

const slice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getBooksSuccess(state, action) {
      state.loading = false;
      state.error = null;

      state.books = action.payload

    }
  },
})

export const getBooks = ({ pageNum = 1, limit = 10, query }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const params = { _page: pageNum, _limit: limit };
    if (query) params.q = query;

    const response = await apiService.get(`/books`, { params });
    dispatch(slice.actions.getBooksSuccess(response.data));
    console.log(`getBooks: ${JSON.stringify(response.data)}`)
      ;
    toast.success(`Get Books Successfully`);
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
}

export default slice.reducer