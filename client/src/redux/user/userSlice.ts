import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  loading: boolean;
  data: {
    status: string;
    msg: string;
  };
  error: any;
}

const initialState: UserState = {
  loading: false,
  data: {
    status: "",
    msg: "",
  },
  error: "",
};

export const login = createAsyncThunk(
  "login",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:4040/auth/login", data);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (
    data: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("http://localhost:4040/auth/register", data);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signinSuccess = createAsyncThunk(
  "google/auth",
  async (data: {
    username: string | null;
    email: string | null;
    photo: string | null;
  }) => {
    const res = await axios.post("http://localhost:4040/auth/google", data);
    return res.data;
  }
);

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
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.loading = false;
        state.error = action.payload;
      })
      // google page functionality
      .addCase(signinSuccess.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signinSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {},
});

export default userSlice.reducer;
