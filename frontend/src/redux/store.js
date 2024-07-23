import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Import reducer từ userSlice
import counterSlice from './slices/counterSlice';
import workSlice from './workSlice';
import customerSlice from './customerSlice';

// Cấu hình store
export const store = configureStore({
    reducer: {
        user: userReducer,  // Gán userReducer cho slice 'user'
        counter: counterSlice,
        work: workSlice,
        customer: customerSlice
    },
});
