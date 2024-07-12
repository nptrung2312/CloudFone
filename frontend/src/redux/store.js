import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Import reducer từ userSlice
import counterSlice from './slices/counterSlice';

// Cấu hình store
export const store = configureStore({
    reducer: {
        user: userReducer,  // Gán userReducer cho slice 'user'
        counter: counterSlice
    },
});
