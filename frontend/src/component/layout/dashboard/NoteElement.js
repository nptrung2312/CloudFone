import React, { useState, useEffect } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import axios from 'axios';
import { toast } from "react-toastify";
import AddNewItem from "./AddNewItem";
import { SuccessIcon, ErrorIcon } from '../../elements/ToastIcon';
import { useSelector, useDispatch } from 'react-redux';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { fetchNote, updateStatusBoxAddItem } from "../../../redux/noteSlice";

function NoteElement({ userId }) {

    const dispatch = useDispatch();
    const [openFormAdd, setOpenFormAdd] = useState(true);
    const statusFormAdd = useSelector((state) => state.work.statusBoxAddItem);
    const itemsNoteBox = useSelector((state) => state.note.listNote);
    const isError = useSelector((state) => state.note.error);
    const isLoading = useSelector((state) => state.note.loading);

    // const itemsNoteBox = [
    //     {
    //         'name': 'Xin nghỉ phép',
    //         'desc': 'Bận việc cá nhân',
    //     },
    //     {
    //         'name': 'Chấm công tháng 07',
    //         'desc': '',
    //     },
    //     {
    //         'name': 'Học Omnichannel bên Cty9',
    //         'desc': '13h ngày 15/6',
    //     },
    //     {
    //         'name': 'Gác thi tin học khóa M84',
    //         'time': '22/07/2024',
    //         'desc': '',
    //     },
    // ];

    useEffect(() => {
        dispatch(fetchNote(userId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userId]);

    const handleAddNew = (status) => {
        setOpenFormAdd(!status);
        dispatch(updateStatusBoxAddItem(!status));
    }

    const handleDeleteNote = (id) => {

        confirmDialog({
            message: 'Bạn có chắc chắn muốn xóa ghi chú này?',
            // header: 'Xác nhận xóa',
            icon: 'pi pi -exclamation-triangle',
            acceptLabel: 'Có',
            rejectLabel: 'Hủy',
            accept: () => {
                axios.post('http://localhost:8080/api/handleDeleteNote', { id: id })
                    .then(res => {
                        if (res.data.errCode === 0) {
                            dispatch(fetchNote(userId));
                            toast.success(res.data.message, { icon: <SuccessIcon /> });
                        } else {
                            toast.success(res.data.message, { icon: <ErrorIcon /> });
                        }
                    })
                    .catch(err => console.log(err))
            },
            reject: () => {
                // Hủy xóa

            }
        });


    }

    useEffect(() => {
        setOpenFormAdd(statusFormAdd);
    }, [statusFormAdd]);

    return (
        <div className="home-col my-note-wrap">
            <h2 className="title-col col-3">Ghi chú <span className="total">({itemsNoteBox.length || 0})</span></h2>
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
                                    <AddNewItem id={userId} api={'handleAddNote'} name={'Tên ghi chú'}
                                        item={[
                                            {
                                                'type': 'date',
                                                'name': 'date',
                                                'text': 'Ngày thực hiện',
                                                'require': 'required'
                                            }, {
                                                'type': 'text',
                                                'name': 'detail',
                                                'text': 'Nội dung',
                                                'require': 'required'
                                            }
                                        ]} />
                                </div>
                            }
                            {
                                itemsNoteBox.length ?
                                    itemsNoteBox.map((item, index) => (
                                        <div key={index} className="item-box note-box">
                                            <Tippy content="Xóa" placement="top">
                                                <button className="close-note" onClick={() => handleDeleteNote(item.noteId)}><i className="fa fa-times" aria-hidden="true"></i></button>
                                            </Tippy>
                                            <div className="title-box">{item.noteName}</div>
                                            {item.noteDate &&
                                                <div className="time-box"><span><i className="fa fa-calendar" aria-hidden="true"></i></span>&nbsp; {item.noteDate}</div>
                                            }
                                            {item.noteDetail && <div className="desc-box">-&nbsp; {item.noteDetail}</div>}

                                        </div>
                                    ))
                                    :
                                    <div className="syn-box">Chưa có dữ liệu hiển thị</div>
                            }
                        </>
                    )}
                </div>
                <div className="confirm-form"><ConfirmDialog /></div>
            </div>
        </div>
    )
}

export default NoteElement;