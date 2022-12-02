import { configureStore } from '@reduxjs/toolkit';
import profileSlice, { ProfileState } from './features/profileSlice';
import userSlice, { UserState } from './features/userSlice';
import serverApi from './services/serverApi';

export type GlobalStoreState = {
  profile: ProfileState;
  user: UserState;
};
export default configureStore({
  reducer: {
    profile: profileSlice,
    user: userSlice,
    [serverApi.reducerPath]: serverApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware)
});
