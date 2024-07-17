import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tạo async thunk để fetch dữ liệu người dùng từ server
export const fetchUser = createAsyncThunk(
    'user/fetchUser', // tên action muốn fire
    async (user) => {
        //user : tham số truyền vào
        // thunkAPI: Khi muốn dispatch 1 action hay muốn lấy type của redux
        // Gửi yêu cầu tới server để lấy thông tin người dùng
        const response = await axios.post(`http://localhost:8080/api/getInfoUser`, user);
        return response.data;  // Trả về dữ liệu người dùng từ server
    }
);

// Trạng thái khởi tạo cho slice của người dùng
const initialState = {
    user: {
        firstName: '',  // Lưu tên của người dùng
        lastName: '',   // Lưu họ của người dùng
        account: { policy: '', }   // Lưu chức vụ của người dùng
    },  // Lưu thông tin người dùng
    avatar: '',
    loading: false, // Trạng thái tải dữ liệu
    error: null,    // Lưu lỗi nếu có
    statusContentSidePanel: null   // Lưu URL hoặc dữ liệu ảnh đại diện của người dùng
};

// Tạo một slice để quản lý trạng thái người dùng
const userSlice = createSlice({
    name: 'user',  // Tên của slice
    initialState,  // Trạng thái khởi tạo
    reducers: {    // Các reducer để xử lý các hành động
        // Đặt thông tin người dùng và ảnh đại diện
        setUser(state, action) {
            state.user = action.payload.user;  // Cập nhật người dùng
            state.avatar = action.payload.avatar;  // Cập nhật ảnh đại diện
            state.statusContentSidePanel = action.payload.statusContentSidePanel;  // Cập nhật ảnh đại diện
        },
        // Cập nhật ảnh đại diện
        updateAvatar(state, action) {
            state.avatar = action.payload;  // Cập nhật ảnh đại diện
        },

        updateUser(state, action) {
            state.user.firstName = action.payload.firstName;
            state.user.lastName = action.payload.lastName;
            state.user.policy = action.payload.account.policy;
        },
        updateStatusContentSidePanel(state, action) {
            state.statusContentSidePanel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => { // đang gọi API
                state.loading = true;  // Đặt trạng thái tải dữ liệu
                state.error = null;    // Xóa lỗi nếu có
            })
            .addCase(fetchUser.fulfilled, (state, action) => { // gọi API thành công
                state.loading = false;  // Tắt trạng thái tải dữ liệu
                state.user = action.payload.user;  // Cập nhật thông tin người dùng
                state.avatar = action.payload.avatar;  // Cập nhật ảnh đại diện
            })
            .addCase(fetchUser.rejected, (state, action) => { // gọi API bị lỗi
                state.loading = false;  // Tắt trạng thái tải dữ liệu
                state.error = action.error.message;  // Lưu lỗi nếu có
            });
    }
});

// Xuất các hành động để có thể sử dụng ở nơi khác
export const { setUser, updateAvatar, updateUser, updateStatusContentSidePanel } = userSlice.actions;

// Xuất reducer để sử dụng trong store
export default userSlice.reducer;
