import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityLevel, Gender, Profile } from '../../modules/profile';

export type ProfileState = {
  data: Profile;
  profiles: Profile[];
};
const initialState: ProfileState = {
  profiles: [],
  data: {
    height: 178,
    weight: 82,
    age: 0,
    gender: Gender.male,
    activityLevel: ActivityLevel.low,
    serves: []
  }
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.unshift(action.payload);
    }
  }
});

export const { updateProfile, addProfile } = profileSlice.actions;

export default profileSlice.reducer;
