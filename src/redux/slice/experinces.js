import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../server/request";

const initialState = {
  experinces: null,
  selected: null,
  loading: false,
  isOpen: false,
  btnLoading: false,
  callback: false,
  total: 0,
  page: 1,
  search: "",
};

export const getExperince = createAsyncThunk(
  "experince/fetch",
  async (params, { getState }) => {
    const { page, search } = getState().experince;
    params = { ...params, page, limit: 10, search };
    const { data } = await request("experiences", { params });
    return data;
  }
);



const experincesSlice = createSlice({
  initialState,
  name: "experinces",
  reducers: {
    controlModal(state) {
      state.isOpen = !state.isOpen;
    },
    controlBtnloading(state) {
      state.btnLoading = !state.btnLoading;
    },
    setSelected(state, { payload }) {
      state.selected = payload;
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
    setSearch(state, { payload }) {
      state.search = payload;
    },
    refetch(state) {
      state.callback = !state.callback;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExperince.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getExperince.fulfilled,
        (
          state,
          {
            payload: {
              data,
              pagination: { total },
            },
          }
        ) => {
          state.loading = false;
          state.experinces = data;
          state.total = total;
        }
      );
  },
});

const { reducer: experinceReducer, actions } = experincesSlice;

export const {
  controlModal,
  setSelected,
  setPage,
  controlBtnloading,
  refetch,
  setSearch,
} = actions;

export default experinceReducer;
