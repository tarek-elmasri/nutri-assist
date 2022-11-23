import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './features/profileSlice';

export default configureStore({
  reducer: {
    profile: profileSlice
  }
});
