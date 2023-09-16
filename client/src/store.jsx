import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import allPropertySlice from './features/AllPropertys/allPropertySlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    allPropertys: allPropertySlice,
  },
});
