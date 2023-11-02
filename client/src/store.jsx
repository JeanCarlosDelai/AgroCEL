import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import cropSlice from './features/crop/cropSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    crop: cropSlice,
  },
});
