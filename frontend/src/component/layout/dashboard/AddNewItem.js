import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { fetchWork, updateStatusBoxAddItem } from '../../../redux/workSlice';
import { fetchCustomer, updateStatusBoxAddItem as updateStatusCustomer } from '../../../redux/customerSlice';
import { SuccessIcon, ErrorIcon } from '../../elements/ToastIcon';
import 'tippy.js/dist/tippy.css';
import './scss/AddNewItem.scss';
// import '../../../assets/scss/InputDate.scss';

function AddNewItem({ id, api, name, item }) {
    const listInput = [];
    const listOption = [];
    const dispatch = useDispatch();
    const [itemData, setItemData] = useState({ 'userId': id });
    Object.values(item).map((value) => {
        return listInput.push(value)
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setItemData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmitAddItem = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/${api}`, itemData)
            .then(res => {
                if (res.data.errCode === 0) {
                    setItemData({ 'userId': id });
                    toast.success("Thêm công việc thành công!", { icon: <SuccessIcon /> });
                    if (api === 'handleAddWork') {
                        dispatch(updateStatusBoxAddItem(true));
                        dispatch(fetchWork(id));
                    }
                    if (api === 'addCustomer') {
                        dispatch(updateStatusCustomer(true));
                        dispatch(fetchCustomer(id));
                    }
                } else {
                    toast.error(res.data.message, { icon: <ErrorIcon /> });
                }
            })
            .catch((error) => {
                if (error.response) {
                    // Request được gửi đi và server trả về lỗi status code
                    toast.error(`Đã xảy ra lỗi từ server: ${error.response.status}`, { icon: <ErrorIcon /> });
                } else if (error.request) {
                    // Request được gửi đi nhưng không nhận được phản hồi
                    toast.error('Không nhận được phản hồi từ server!', { icon: <ErrorIcon /> });
                } else {
                    // Lỗi xảy ra khi thiết lập request
                    toast.error('Đã xảy ra lỗi khi gửi yêu cầu!', { icon: <ErrorIcon /> });
                }
            })
    }

    return (
        <div className="add-item-wrap">
            <form onSubmit={handleSubmitAddItem}>
                <div className="form-group">
                    <input type="text" value={itemData.nameItem || ''} name="nameItem" onChange={handleInputChange} className="input-text" placeholder={name} required='required' />
                </div>
                {
                    listInput.map((value, key) => {
                        if (value.type === 'select') {
                            Object.values(value.options).map((value) => {
                                return listOption.push(value);
                            })
                        };
                        return (
                            <div key={key} className="form-group">
                                {value.type === 'select' ?
                                    <select name={value.name} className="input-text" onChange={handleInputChange} required={value.require}>
                                        <option value=''>--Loại công việc--</option>
                                        {listOption.map((item, index) => (
                                            <option key={index} value={index}>{item}</option>
                                        ))}
                                    </select>
                                    :
                                    <input value={itemData[value.name] || ''} onChange={handleInputChange} type={value.type} name={value.name} className="input-text" placeholder={value.text} required={value.require} />
                                }
                            </div>
                        )
                    })
                }
                <button className="btn-submit" type="submit">Lưu</button>
            </form>
        </div>
    )
}

export default AddNewItem;