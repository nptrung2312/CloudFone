import React, { useState, useEffect } from "react";
import Tippy from '@tippyjs/react';
import AddNewItem from "./AddNewItem";
import { useSelector, useDispatch } from 'react-redux';
import './scss/AddNewItem.scss';
import 'tippy.js/dist/tippy.css';
import { fetchCustomer, updateStatusBoxAddItem } from "../../../redux/customerSlice";

function CustomerElement({ userId }) {
    const dispatch = useDispatch();
    const [openFormAddCustomer, setOpenFormAddCustomer] = useState(true);
    const statusFormAddCustomer = useSelector((state) => state.customer.statusBoxAddItem);
    const itemsCustomerBox = useSelector((state) => state.customer.listCustomer);
    const isError = useSelector((state) => state.customer.error);
    const isLoading = useSelector((state) => state.customer.loading);

    useEffect(() => {
        dispatch(fetchCustomer(userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userId]);
    // const itemsCustomerBox = [
    //     {
    //         'name': 'Công ty cổ phần đầu tư và du lịch',
    //         'phone': '0706 456 123',
    //         'mail': 'congtydulich@gmail.com',
    //         'address': 'Hòa Bình, Ninh Kiều, Cần Thơ',
    //     },
    //     {
    //         'name': 'Mobifone Service Cần Thơ',
    //         'phone': '0123 456 789',
    //         'mail': 'mobitechs@gmail.com',
    //         'address': 'Tầng 2 Nhà sách Phương Nam',
    //     },
    //     {
    //         'name': 'Nhà Sách Phương Nam',
    //         'phone': '0909 789 456',
    //         'mail': 'nhasachPhuongNam@gmail.com',
    //         'address': 'Tầng 2 Nhà sách Phương Nam, Hòa Bình, Ninh Kiều, Cần Thơ',
    //     }
    // ];

    const handleAddCustomer = (status) => {
        setOpenFormAddCustomer(!status);
        dispatch(updateStatusBoxAddItem(!status));
    }

    useEffect(() => {
        setOpenFormAddCustomer(statusFormAddCustomer);
    }, [statusFormAddCustomer]);

    return (
        <div className="home-col my-customer-wrap">
            <h2 className="title-col col-2">Khách hàng <span className="total">({itemsCustomerBox.length})</span></h2>
            <div className="content-col">
                <Tippy content="Thêm nhanh" placement="right">
                    <button className="btn-add-item" onClick={() => handleAddCustomer(openFormAddCustomer)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                </Tippy>
                <div className="list-box">
                    {isError && !isLoading && <div>Đã xảy ra lỗi. Vui lòng thử lại</div>}

                    {!isError && isLoading &&
                        <div className="loading-box"><span className="spinner"><i className="fa fa-spinner" aria-hidden="true"></i></span> Đang tải dữ liệu...</div>}

                    {!isError && !isLoading && (
                        <>
                            {
                                openFormAddCustomer ||
                                <div className={`form-container ${!openFormAddCustomer ? 'slide-down-enter' : 'slide-down-exit'}`}>
                                    <Tippy content="Đóng" placement="top">
                                        <span className="close-add" onClick={() => handleAddCustomer(openFormAddCustomer)}><i className="fa fa-times" aria-hidden="true"></i></span>
                                    </Tippy>
                                    <AddNewItem id={userId} api={'addCustomer'} name={'Tên công ty'}
                                        item={[
                                            {
                                                'type': 'email',
                                                'name': 'email',
                                                'text': 'Mail công ty',
                                                'require': 'required'
                                            }, {
                                                'type': 'text',
                                                'name': 'phone',
                                                'text': 'Số điện thoại',
                                                'require': 'required'
                                            }, {
                                                'type': 'text',
                                                'name': 'address',
                                                'text': 'Địa chỉ',
                                                'require': 'required'
                                            }
                                        ]} />
                                </div>
                            }

                            {
                                itemsCustomerBox.length ?
                                    itemsCustomerBox.map((item, index) => (
                                        <div key={index} className="item-box customer-box">
                                            <div className="box-left">
                                                <div className="title-box name-box">{item.lastName}</div>
                                                <div className="time-box address-box"><span><i className="fa fa-map-marker" aria-hidden="true"></i></span> {item.address}</div>
                                            </div>
                                            <div className="box-right">
                                                <Tippy content={item.phone} placement="bottom">
                                                    <div className="contact-box phone-box">
                                                        <span><i className="fa fa-phone" aria-hidden="true"></i></span>
                                                    </div>
                                                </Tippy>
                                                <Tippy content={item.email} placement="bottom">
                                                    <div className="contact-box email-box">
                                                        <span><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                                                    </div>
                                                </Tippy>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className="syn-box">Chưa có dữ liệu hiển thị</div>
                            }
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}

export default CustomerElement;