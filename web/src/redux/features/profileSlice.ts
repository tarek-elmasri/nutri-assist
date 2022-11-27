import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityLevel, Gender, Profile } from '../../modules/profile';

export type ProfileState = {
  data: Profile;
};
const initialState: ProfileState = {
  data: {
    height: 178,
    weight: 82,
    age: 0,
    gender: Gender.male,
    activityLevel: ActivityLevel.low
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.data = { ...state.data, ...action.payload };
    }
  }
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
