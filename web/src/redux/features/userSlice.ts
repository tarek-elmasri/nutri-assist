import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
};

export type UserState = {
  user: User | null;
  token: string | null;
};

const initialState: UserState = {
  user: null,
  token: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
