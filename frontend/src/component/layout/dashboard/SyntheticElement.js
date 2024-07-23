import React from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function SyntheticElement() {

    const itemsSyntheticBox = [];

    return (
        <div className="home-col my-box-wrap">
            <h2 className="title-col col-4">Tổng hợp <span className="total">(0)</span></h2>
            <div className="content-col">
                <Tippy content="Thêm nhanh" placement="right">
                    <button className="btn-add-item"><i className="fa fa-plus" aria-hidden="true"></i></button>
                </Tippy>
                {itemsSyntheticBox.length ?
                    itemsSyntheticBox.map((item, index) => (
                        <div key={index} className="item-box customer-box">
                            <div className="box-left">
                                <div className="title-box name-box">{item.name}</div>
                                <div className="time-box address-box"><span><i className="fa fa-map-marker" aria-hidden="true"></i></span> {item.address}</div>
                            </div>
                            <div className="box-right">
                                <Tippy content={item.phone} placement="bottom">
                                    <div className="contact-box phone-box">
                                        <span><i className="fa fa-phone" aria-hidden="true"></i></span>
                                    </div>
                                </Tippy>
                                <Tippy content={item.mail} placement="bottom">
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
            </div>
        </div>
    )
}

export default SyntheticElement;