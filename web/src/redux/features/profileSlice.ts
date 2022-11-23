import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Profile, { ActivityLevel, Gender } from '../../modules/profile';

interface ProfileState {
  profile?: Profile;
}

interface ProfilePayload {
  height: number;
  weight: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
}

const initialState: ProfileState = {
  profile: undefined
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ProfilePayload>) => {
      const { weight, height, age, gender, activityLevel } = action.payload;
      if (state.profile) {
        state.profile.weight = weight;
        state.profile.height = height;
        state.profile.age = age;
        state.profile.gender = gender;
        state.profile.activityLevel = activityLevel;
      } else {
        state.profile = new Profile(height, weight, gender, age, activityLevel);
      }
    }
  }
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
