import { createSlice } from "@reduxjs/toolkit";
import { TOKEN, USER } from "../../consts";
import Cookies from "js-cookie";

const initialState = {
  isAuth: Boolean(Cookies.get(TOKEN)),
  user: JSON.parse(localStorage.getItem(USER)) || null,
  loading: false
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth(state, { payload }) {
      state.isAuth = true;
      state.user = payload;
    },logout(state) {
      state.isAuth = false;
      state.user = null;
      Cookies.remove(TOKEN);
      localStorage.removeItem(USER);
    },
    controlLoading(state){
      state.loading =!state.loading;
    }
  },
});

const { setAuth, logout, controlLoading } = authSlice.actions;

const {reducer: authReducer} = authSlice

export { setAuth, logout, controlLoading };

export default authReducer;
