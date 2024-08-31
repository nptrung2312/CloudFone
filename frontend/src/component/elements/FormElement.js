import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { SuccessIcon, ErrorIcon } from "./ToastIcon";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { months, weekDays } from "./GlobalValiable";
import 'tippy.js/dist/tippy.css';
import '../../assets/scss/FormElement.scss';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch } from "react-redux";
import { fetchWork } from "../../redux/workSlice";

function FormElement({ id, api, titleForm, titleButton, method, arrInput, workId }) {
    /*
    Mảng mẫu
        arrInput[{
                    'type': 'date',
                    'name': 'startDate',
                    'text': 'Ngày bắt đầu',
                    'require': 'required'
                }, {
                    'type': 'date',
                    'name': 'endDate',
                    'text': 'Ngày kết thúc',
                    'require': 'required'
                }, {
                    'type': 'select',
                    'name': 'typeOf',
                    'text': 'Loại công việc',
                    'require': 'required',
                    'options': {
                        0: 'Công việc trọng tâm',
                        1: 'Công việc phát sinh',
                        2: 'Công việc hàng ngày',
                    }
                }, {
                    'type': 'textarea',
                    'name': 'desc',
                    'text': 'Nội dung công việc',
                    'require': 'required'
                }]
    */

    const listInput = [];
    const dispatch = useDispatch();
    const [itemData, setItemData] = useState({ 'userId': id, 'workId': workId });

    Object.values(arrInput).map((value) => {
        return listInput.push(value)
    })

    const handleInputChange = (event, nameInput) => {
        if (typeof event === 'object' && event.target) {
            const { name, value } = event.target;

            setItemData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // Handle DatePicker change
            if (typeof event === 'number') {
                setItemData(prevState => ({
                    ...prevState,
                    [nameInput]: event
                }));
            } else {
                const date = new Date(event);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed in JS
                const day = String(date.getDate()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                setItemData(prevState => ({
                    ...prevState,
                    [nameInput]: formattedDate
                }));
            }
        }
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/api/${api}`, itemData)
            .then(res => {
                if (res.data.errCode === 0) {
                    toast.success("Thêm công việc thành công!", { icon: <SuccessIcon /> });
                } else {
                    toast.error(res.data.message, { icon: <ErrorIcon /> });
                }
                dispatch(fetchWork(itemData.userId));
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

    const [selectedCity, setSelectedCity] = useState(null);

    return (
        <form onSubmit={handleSubmitForm} className="form-element-wrap">
            <h2 className="title-form-element">{titleForm}</h2>
            {
                listInput.map((value, key) => {
                    // if (value.type === 'select') {
                    //     Object.values(value.options).map((value) => {
                    //         return listOption.push(value);
                    //     })
                    // };
                    return (
                        <div key={key} className={`form-group ${value.type === 'radio' ? 'form-group-radio' : value.type === 'date' ? 'form-group-date' : ''}`}>
                            {
                                value.type === 'select' ?
                                    // <select name={value.name} className="input-text" onChange={handleInputChange} required={value.require}>
                                    //     <option value=''>--{value.text}--</option>
                                    //     {listOption.map((item, index) => (
                                    //         <option key={index} value={index}>{item}</option>
                                    //     ))}
                                    // </select>
                                    <div className="input-text card flex justify-content-center">
                                        <Dropdown name={value.name} value={selectedCity || value.value} onChange={(e) => { setSelectedCity(e.value); handleInputChange(e.value, value.name) }} options={value.options} optionLabel="name" optionValue="value"
                                            placeholder={`--${value.text}--`} className="w-full md:w-14rem" />
                                    </div>
                                    :
                                    value.type === 'date' ?
                                        <DatePicker inputClass="custom-input" value={itemData[value.name] || value.value || ''} onChange={(date) => handleInputChange(date, value.name)} format="YYYY-MM-DD" weekDays={weekDays} months={months} render={<InputIcon placeholder={value.text} name={value.name} />} />
                                        : value.type === 'textarea' ?
                                            <textarea value={itemData[value.name] || value.value || ''} onChange={handleInputChange} name={value.name} className="input-text" placeholder={value.text} required={value.require} rows={3}></textarea>
                                            : value.type === 'radio' ?
                                                <>
                                                    <input className="input-text input-radio" type="radio" id={value.id} value={value.value} onChange={handleInputChange} name={value.name} checked={value.check} />
                                                    <label htmlFor={value.id}>{value.text}</label><br></br>
                                                </>
                                                : <input value={itemData[value.name] || value.value || ''} onChange={handleInputChange} type={value.type} name={value.name} className="input-text" placeholder={value.text} required={value.require} />
                            }
                        </div>
                    )
                })
            }
            <div className="btn-wrap">
                <button className="btn-submit" type="submit">{titleButton}</button>
            </div>
        </form>
    )
}

export default FormElement;