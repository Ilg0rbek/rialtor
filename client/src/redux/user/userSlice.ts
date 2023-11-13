import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  loading: boolean;
  data: null;
  error: string | undefined;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: undefined,
};

const login = createAsyncThunk("login", async (data) => {
  try {
    const res = await axios.post("/api/login", data);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
});

const register = createAsyncThunk("register", async (data) => {
  try {
    const res = await axios.post("/api/register", data);
    return res.data;
  } catch (error: any) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // login page functionality
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // register page functionality
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
  reducers: {},
});

export default userSlice.reducer;
