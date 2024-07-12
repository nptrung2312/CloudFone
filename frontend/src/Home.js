import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/slices/counterSlice';

function Home() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value)
    return (
        <div>
            <div>
                <button onClick={() => dispatch(increment())}>Increase</button> {/*Truyền hàm 1 dispatch */}
            </div>
            <div>
                <button onClick={() => dispatch(decrement())}>Decrease</button>
            </div>
            <br />
            <div>Count: {count}</div>
        </div>
    )
}

export default Home;