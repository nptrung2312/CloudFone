import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// Tạo async thunk để fetch dữ liệu người dùng từ server
export const fetchNote = createAsyncThunk(
    'note/fetchNote', // tên action muốn fire
    async (userId) => {
        //user : tham số truyền vào
        // thunkAPI: Khi muốn dispatch 1 action hay muốn lấy type của redux
        // Gửi yêu cầu tới server để lấy thông tin người dùng
        // console.log("Received userId:", userId); // Kiểm tra userId
        const response = await axios.post(`http://localhost:8080/api/getListNote`, { 'id': userId });
        return response.data;  // Trả về dữ liệu người dùng từ server
    }
);
// Trạng thái khởi tạo cho slice của bộ đếm
const initialState = {
    listNote: {},
    statusBoxAddItem: true,  // Giá trị ban đầu của bộ đếm
}

// Tạo một slice bằng hàm createSlice
export const noteSlide = createSlice({
    name: 'note',  // Tên của slice này là 'counter'
    initialState,  // Trạng thái khởi tạo cho slice này
    reducers: {  // Các reducer để xử lý các hành động (actions)
        // Reducer để tăng giá trị bộ đếm
        setNote(state, action) {
            state.statusBoxAddItem = action.payload.statusBoxAddItem;
            state.listNote = action.payload.note;
        },
        updateStatusBoxAddItem(state, action) {
            state.statusBoxAddItem = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNote.pending, (state) => { // đang gọi API
                state.loading = true;  // Đặt trạng thái tải dữ liệu
                state.error = null;    // Xóa lỗi nếu có
            })
            .addCase(fetchNote.fulfilled, (state, action) => { // gọi API thành công
                state.loading = false;  // Tắt trạng thái tải dữ liệu
                state.listNote = action.payload.note;
            })
            .addCase(fetchNote.rejected, (state, action) => { // gọi API bị lỗi
                state.loading = false;  // Tắt trạng thái tải dữ liệu
                state.error = action.error.message;  // Lưu lỗi nếu có
            });
    }
})

// Các action creators được tạo tự động cho mỗi hàm reducer
export const { setNote, updateStatusBoxAddItem } = noteSlide.actions

// Xuất reducer để sử dụng trong store
export default noteSlide.reducer
