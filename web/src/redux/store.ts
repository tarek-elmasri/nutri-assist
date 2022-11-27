import { configureStore } from '@reduxjs/toolkit';
import profileSlice, { ProfileState } from './features/profileSlice';

export type GlobalStoreState = {
  profile: ProfileState;
};
export default configureStore({
  reducer: {
    profile: profileSlice
  }
});
