import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  weight: number;
  height: number;
  gender: 'male' | 'female';
  age: number;
  activityLevel: 'low' | 'medium' | 'high';
}

const initialState: Profile = {
  weight: 0,
  height: 0,
  gender: 'male',
  age: 0,
  activityLevel: 'low'
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: { initialState },
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state = { ...state, ...action.payload };
    }
  }
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
