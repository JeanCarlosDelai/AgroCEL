import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import propertySlice from './features/property/propertySlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    property: propertySlice,
  },
});
