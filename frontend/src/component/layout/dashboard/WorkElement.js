import React, { useState, useEffect } from "react";
import Tippy from '@tippyjs/react';
import { useSelector, useDispatch } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import AddNewItem from "./AddNewItem";
import { fetchWork, updateStatusBoxAddItem } from "../../../redux/workSlice";
import formatDate from "../../elements/formatDate";

function WorkElement({ userId }) {

    const dispatch = useDispatch();
    const [openFormAdd, setOpenFormAdd] = useState(true);
    const statusFormAdd = useSelector((state) => state.work.statusBoxAddItem);
    const itemsWorkBox = useSelector((state) => state.work.listWork);
    const isError = useSelector((state) => state.work.error);
    const isLoading = useSelector((state) => state.work.loading);

    // const itemsWorkBox = [
    //     {
    //         'name': 'Công việc trọng tâm tháng 04',
    //         'time': '01/04/2024 - 3/04/2024',
    //         'desc': 'Nâng cấp hệ thống ERP',
    //     },
    //     {
    //         'name': 'Công việc trọng tâm tháng 05',
    //         'time': '01/05/2024 - 31/05/2024',
    //         'desc': 'Thực hiện gác thi khóa M83',
    //     },
    //     {
    //         'name': 'Công việc trọng tâm tháng 06',
    //         'time': '01/06/2024 - 31/06/2024',
    //         'desc': 'Thực hiện hướng dẫn sử dụng ứng dụng mới',
    //     },
    //     {
    //         'name': 'Công việc trọng tâm tháng 07',
    //         'time': '01/07/2024 - 31/07/2024',
    //         'desc': 'Thực hiện backup dữ liệu',
    //     },
    // ];

    useEffect(() => {
        dispatch(fetchWork(userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userId]);

    const handleAddNew = (status) => {
        setOpenFormAdd(!status);
        dispatch(updateStatusBoxAddItem(!status));
    }

    useEffect(() => {
        setOpenFormAdd(statusFormAdd);
    }, [statusFormAdd]);

    return (
        <div className="home-col my-work-wrap">
            <h2 className="title-col col-1">Công việc <span className="total">({itemsWorkBox.length})</span></h2>
            <div className="content-col">
                <Tippy content="Thêm nhanh" placement="right">
                    <button className="btn-add-item" onClick={() => handleAddNew(openFormAdd)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                </Tippy>
                <div className="list-box">
                    {isError && !isLoading && <div>Đã xảy ra lỗi. Vui lòng thử lại</div>}

                    {!isError && isLoading &&
                        <div className="loading-box"><span className="spinner"><i className="fa fa-spinner" aria-hidden="true"></i></span> Đang tải dữ liệu...</div>}

                    {!isError && !isLoading && (
                        <>
                            {
                                openFormAdd ||
                                <div className={`form-container ${!openFormAdd ? 'slide-down-enter' : 'slide-down-exit'}`}>
                                    <Tippy content="Đóng" placement="top">
                                        <span className="close-add" onClick={() => handleAddNew(openFormAdd)}><i className="fa fa-times" aria-hidden="true"></i></span>
                                    </Tippy>
                                    <AddNewItem id={userId} api={'handleAddWork'} name={'Tên công việc'}
                                        item={[
                                            {
                                                'type': 'date',
                                                'name': 'startDate',
                                                'text': 'Ngày bắt đầu',
                                                'require': 'required'
                                            }, {
                                                'type': 'date',
                                                'name': 'endDate',
                                                'text': 'Ngày bắt đầu',
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
                                            }
                                        ]} />
                                </div>
                            }

                            {
                                itemsWorkBox.length ?
                                    itemsWorkBox.map((item, index) => (
                                        <div key={index} className="item-box work-box">
                                            <div className="title-box"><span><i className="fa fa-circle" aria-hidden="true"></i></span> {item.workName}</div>
                                            <div className="time-box"><span><i className="fa fa-calendar" aria-hidden="true"></i></span>&nbsp; {formatDate(item.startDate)} - {formatDate(item.endDate)}</div>
                                            <div className="desc-box">-&nbsp; {item.workDetail}</div>
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
    );
}

export default React.memo(WorkElement);