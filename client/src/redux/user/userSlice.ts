import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../utils/url";
import { FormData, UserState } from "../../utils/interfaces";

const initialState: UserState = {
  loading: false,
  data: {
    user: {},
    status: "",
    msg: "",
  },
  error: "",
};

export const login = createAsyncThunk(
  "login",
  async (data: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch.post("auth/login", data);
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
      const res = await fetch.post("auth/register", data);
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
  async (
    data: {
      username: string | null;
      email: string | null;
      photo: string | null;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch.post("auth/google", data);
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

export const update = createAsyncThunk(
  "update-account",
  async (data: { id: string; data: FormData }, { rejectWithValue }) => {
    try {
      const res = await fetch.patch(`auth/update/${data.id}`, data.data);
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
      })
      // update user account
      .addCase(update.pending, (state) => {
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {},
});

export default userSlice.reducer;
