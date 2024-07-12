import { createSlice } from '@reduxjs/toolkit'

// Trạng thái khởi tạo cho slice của bộ đếm
const initialState = {
    value: 0,  // Giá trị ban đầu của bộ đếm
}

// Tạo một slice bằng hàm createSlice
export const counterSlice = createSlice({
    name: 'counter',  // Tên của slice này là 'counter'
    initialState,  // Trạng thái khởi tạo cho slice này
    reducers: {  // Các reducer để xử lý các hành động (actions)
        // Reducer để tăng giá trị bộ đếm
        increment: (state) => {
            // Redux Toolkit cho phép viết logic thay đổi trực tiếp trong reducers.
            // Nó không thực sự thay đổi state gốc vì nó sử dụng thư viện Immer.
            // Immer sẽ phát hiện những thay đổi này và tạo ra một state mới không thể thay đổi dựa trên những thay đổi đó.
            state.value += 1  // Tăng giá trị của state.value thêm 1
        },
        // Reducer để giảm giá trị bộ đếm
        decrement: (state) => {
            state.value -= 1  // Giảm giá trị của state.value đi 1
        },
        // Reducer để tăng giá trị bộ đếm theo một lượng cụ thể
        incrementByAmount: (state, action) => {
            state.value += action.payload  // Tăng giá trị của state.value theo lượng được truyền vào trong action.payload
        },
    },
})

// Các action creators được tạo tự động cho mỗi hàm reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Xuất reducer để sử dụng trong store
export default counterSlice.reducer
