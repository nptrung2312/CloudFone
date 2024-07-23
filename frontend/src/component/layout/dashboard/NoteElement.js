import React from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function NoteElement() {

    const itemsNoteBox = [
        {
            'name': 'Xin nghỉ phép',
            'desc': 'Bận việc cá nhân',
        },
        {
            'name': 'Chấm công tháng 07',
            'desc': '',
        },
        {
            'name': 'Học Omnichannel bên Cty9',
            'desc': '13h ngày 15/6',
        },
        {
            'name': 'Gác thi tin học khóa M84',
            'time': '22/07/2024',
            'desc': '',
        },
    ];

    return (
        <div className="home-col my-note-wrap">
            <h2 className="title-col col-3">Ghi chú <span className="total">(10+)</span></h2>
            <div className="content-col">
                <Tippy content="Thêm nhanh" placement="right">
                    <button className="btn-add-item"><i className="fa fa-plus" aria-hidden="true"></i></button>
                </Tippy>
                {
                    itemsNoteBox.length ?
                        itemsNoteBox.map((item, index) => (
                            <div key={index} className="item-box note-box">
                                <Tippy content="Xóa" placement="top">
                                    <span className="close-note"><i className="fa fa-times" aria-hidden="true"></i></span>
                                </Tippy>
                                <div className="title-box">{item.name}</div>
                                {item.time &&
                                    <div className="time-box"><span><i className="fa fa-calendar" aria-hidden="true"></i></span>&nbsp; {item.time}</div>
                                }
                                {item.desc && <div className="desc-box">-&nbsp; {item.desc}</div>}

                            </div>
                        ))
                        :
                        <div className="syn-box">Chưa có dữ liệu hiển thị</div>
                }
            </div>
        </div>
    )
}

export default NoteElement;