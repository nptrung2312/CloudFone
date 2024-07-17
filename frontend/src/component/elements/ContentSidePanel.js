import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, updateStatusContentSidePanel, fetchUser } from '../../redux/userSlice';
import { SuccessIcon, ErrorIcon } from '../elements/ToastIcon';
import ChangeImage from "./ChangeImage";
import ChangePassword from "./ChangePassword";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import '../../assets/scss/ContentSidePanel.scss';
import '../../assets/scss/InputForm.scss';
function ContentSidePanel({ userDataChild }) {
    // Xử lý dữ liệu nhận vào
    const session = JSON.parse(sessionStorage.getItem('account'));
    const [staticMode, setStaticMode] = useState(true);
    const [focusField, setFocusField] = useState(null);
    const dispatch = useDispatch();

    const firstName = useSelector((state) => state.user.user.firstName);
    const lastName = useSelector((state) => state.user.user.lastName);

    // Tạo ref riêng cho mỗi input
    const inputRefs = {
        lastName: useRef(null),
        firstName: useRef(null),
        policy: useRef(null),
        company: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        address: useRef(null),
    };
    const [userData, setUserData] = useState({
        accountId: userDataChild.account["accountId"],
        userId: userDataChild["userId"],
        lastName: userDataChild["lastName"],
        firstName: userDataChild["firstName"],
        policy: userDataChild.account['policy'],
        company: userDataChild["companyId"],
        email: userDataChild["email"],
        phone: userDataChild["phone"],
        address: userDataChild["address"]
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (!staticMode && focusField) {
            inputRefs[focusField].current.focus();
            setFocusField(null); // Reset focusField to prevent further re-renders
        }
    }, [staticMode, focusField, inputRefs]);

    const handleEditClick = (field) => {
        setStaticMode(false); // Chuyển staticMode sang false để kích hoạt useEffect
        setFocusField(field); // Lưu tên field để focus
    };
    //-----------------------------------------------
    // Cập nhật thông tin user
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataUpdate = {};
        Object.keys(userData).forEach(key => {
            userData[key] ? dataUpdate[key] = userData[key] : (session.user[key] ? dataUpdate[key] = session.user[key] : dataUpdate[key] = "");
        })
        axios.post('http://localhost:8080/api/updateInfoUser', dataUpdate)
            .then(res => {
                if (res.data.errCode === 0) {
                    const infoAfter = res.data;

                    setUserData(prevState => ({
                        ...prevState,
                        accountId: infoAfter.user["account.accountId"],
                        userId: infoAfter.user["userId"],
                        lastName: infoAfter.user["lastName"],
                        firstName: infoAfter.user["firstName"],
                        company: infoAfter.user["companyId"],
                        email: infoAfter.user["email"],
                        phone: infoAfter.user["phone"],
                        address: infoAfter.user["address"],
                        policy: infoAfter.user["account.policy"],
                    }))

                    setStaticMode(true);
                    dispatch(updateStatusContentSidePanel(false));
                    dispatch(fetchUser(userData));
                    dispatch(updateUser({
                        firstName: infoAfter.user.firstName,
                        lastName: infoAfter.user.lastName,
                        account: {
                            policy: infoAfter.user['account.policy']
                        }
                    }));

                    toast.success("Cập nhật thông tin thành công!", { icon: <SuccessIcon /> });
                } else {
                    toast.error("Đã xảy ra lỗi!", { icon: <ErrorIcon /> });
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
    };

    //-------------------------------------------
    return (
        <div className="main-considepanel-wrapper">
            <h2 className="title-considepanel">{(firstName + " " + lastName) || `${userData.firstName} ${userData.lastName}`}</h2>
            <div className="content-considepanel">
                <Tippy content="Đổi ảnh đại diện" placement="left" zIndex={16000}>
                    <div className="avatar-wrap">
                        <ChangeImage idUser={session.user["userId"]} avatarUser={userDataChild["image"]} />
                    </div>
                </Tippy>
                <div className="info-user">
                    <h3 className="title-info">Thông tin liên hệ</h3>
                    <div className="info">
                        <form onSubmit={handleSubmit}>
                            <input type="number" name="id" defaultValue={session.user["userId"]} hidden />

                            <div className="form-group">
                                <label>Tên</label>
                                <input
                                    type="text"
                                    defaultValue={userData.lastName}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="lastName"
                                    name="lastName"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.lastName} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("lastName")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Họ</label>
                                <input
                                    type="text"
                                    defaultValue={userData.firstName}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="firstName"
                                    name="firstName"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.firstName} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("firstName")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Chức vụ</label>
                                <input
                                    type="text"
                                    defaultValue={userData.policy}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="policy"
                                    name="policy"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.policy} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("policy")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Đơn vị</label>
                                <input
                                    type="text"
                                    defaultValue={userData.company}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="company"
                                    name="company"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.company} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("company")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    defaultValue={userData.email}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="email"
                                    name="email"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.email} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("email")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    defaultValue={userData.phone}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="phone"
                                    name="phone"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.phone} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("phone")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <input
                                    type="text"
                                    defaultValue={userData.address}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="address"
                                    name="address"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.address} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("address")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>
                            <button type="submit" className="submit-button">Cập nhật</button>
                        </form>
                    </div>
                </div>
                <div className="info-login">
                    <ChangePassword idAccount={userData.accountId} />
                </div>
            </div>
        </div>
    );
}

export default React.memo(ContentSidePanel);