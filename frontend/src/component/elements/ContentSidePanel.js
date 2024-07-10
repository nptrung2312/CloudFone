import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { SuccessIcon, ErrorIcon } from '../elements/ToastIcon';
import '../../assets/scss/ContentSidePanel.scss';
import '../../assets/scss/InputForm.scss';
function ContentSidePanel({ userDataChild }) {
    // Xử lý dữ liệu nhận vào
    const session = JSON.parse(sessionStorage.getItem('account'));
    const [staticMode, setStaticMode] = useState(true);
    const [focusField, setFocusField] = useState(null);
    // Tạo ref riêng cho mỗi input
    const inputRefs = {
        lastName: useRef(null),
        firstName: useRef(null),
        position: useRef(null),
        company: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        address: useRef(null),
    };

    const [userData, setUserData] = useState({
        id: userDataChild["id"],
        lastName: userDataChild["lastName"],
        firstName: userDataChild["firstName"],
        position: userDataChild["positionId"],
        company: userDataChild["roleId"],
        email: userDataChild["email"],
        phone: userDataChild["phoneNumber"],
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
    // Xử lý hiển thị password
    const [passwordVisibility, setPasswordVisibility] = useState({
        currentPassword: true,
        newPassword: true,
        confirmPassword: true
    });

    const handleShowHidePassword = (pass) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [pass]: !prevState[pass]
        }));
    };
    //---------------------------
    // Hiển thị hành ảnh trước khi upload
    const avatar = require('../layout/images/user.jpg');
    const [selectedImage, setSelectedImage] = useState(avatar);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    //-----------------------
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
                        id: infoAfter.user["id"],
                        lastName: infoAfter.user["lastName"],
                        firstName: infoAfter.user["firstName"],
                        position: infoAfter.user["positionId"],
                        company: infoAfter.user["roleId"],
                        email: infoAfter.user["email"],
                        phone: infoAfter.user["phonenumber"],
                        address: infoAfter.user["address"]
                    }))
                    toast.success("Cập nhật thông tin thành công!", { icon: <SuccessIcon /> });
                } else {
                    toast.error("Đã xảy ra lỗi!", { icon: <ErrorIcon /> });
                }
            })
            .catch(() => {
                toast.error("Đã xảy ra lỗi trong quá trình gửi yêu cầu!", { icon: <ErrorIcon /> });
            })
    };
    //-------------------------------------------
    // Xử lý đổi mật khẩu

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            setMessage('Mật khẩu không trùng khớp!');
        } else {
            setMessage('');
        }
    }, [newPassword, confirmPassword]);

    const handleChangePassword = async (e, id) => {
        e.preventDefault();
        if (message) {
            return; // Nếu có thông báo lỗi, không cho phép submit
        }

        const dataPass = {
            id,
            currentPassword,
            newPassword
        }

        axios.post('http://localhost:8080/api/changePassword', dataPass)
            .then(res => {
                console.log("res", res);
                if (res.data.code === 0) {
                    toast.success(res.data.message, { icon: <SuccessIcon /> });
                } else {
                    toast.error(res.data.message, { icon: <ErrorIcon /> });
                }
            })
            .catch(() => {
                toast.error("Đã xảy ra lỗi trong quá trình gửi yêu cầu!", { icon: <ErrorIcon /> });
            })
    }
    //-------------------------------------------
    return (
        <div className="main-considepanel-wrapper">
            <h2 className="title-considepanel">{session.user["firstName"]} {session.user["lastName"]}</h2>
            <div className="content-considepanel">
                <div className="avatar-wrap">
                    <div className="content-avatar">
                        <label htmlFor="input-upload"><b><i className="fa fa-upload" aria-hidden="true"></i> Tải ảnh lên</b></label>
                        <img className="avatar-user" src={selectedImage} alt="avatar-user" />
                        <input id="input-upload" type="file" accept="image/*" onChange={handleImageChange} hidden />
                    </div>
                </div>
                <div className="info-user">
                    <h3 className="title-info">Thông tin liên hệ</h3>
                    <div className="info">
                        <form onSubmit={handleSubmit}>
                            <input type="number" name="id" defaultValue={session.user["id"]} hidden />
                            {/* <InputForm label="Tên" name="lastName" fieldName="lastName" initialValue={userData.lastName} value={userData.lastName} onChange={handleInputChange} /> */}
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
                            {/* <InputForm label="Họ" fieldName="firstName" initialValue={userData.firstName} value={userData.firstName} onChange={handleInputChange} /> */}
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
                            {/* <InputForm label="Chức vụ" fieldName="position" initialValue={userData.position} value={userData.position} onChange={handleInputChange} /> */}
                            <div className="form-group">
                                <label>Chức vụ</label>
                                <input
                                    type="text"
                                    defaultValue={userData.position}
                                    className={`input-text ${staticMode ? '' : 'input-public'}`}
                                    id="position"
                                    name="position"
                                    readOnly={staticMode}
                                    onChange={handleInputChange}
                                    ref={inputRefs.position} // Đặt ref vào input
                                />
                                <span className="edit-input" onClick={() => handleEditClick("position")}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </span>
                            </div>
                            {/* <InputForm label="Đơn vị" fieldName="company" initialValue={userData.company} value={userData.company} onChange={handleInputChange} /> */}
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
                            {/* <InputForm label="Email" fieldName="email" initialValue={userData.email} value={userData.email} onChange={handleInputChange} /> */}
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
                            {/* <InputForm label="Số điện thoại" fieldName="phone" initialValue={userData.phone} value={userData.phone} onChange={handleInputChange} /> */}
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
                            {/* <InputForm label="Địa chỉ" fieldName="address" initialValue={userData.address} value={userData.address} onChange={handleInputChange} /> */}
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
                    <h3 className="title-info">Đổi mật khẩu</h3>
                    <div className="form-group">
                        <input type={passwordVisibility.currentPassword ? 'password' : 'text'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input-text current-password" name="current-password" placeholder="Mật khẩu hiện tại" />
                        <span className='hidden-password' onClick={() => handleShowHidePassword('currentPassword')}><i className={passwordVisibility.currentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>
                    </div>
                    <div className="form-group">
                        <input type={passwordVisibility.newPassword ? 'password' : 'text'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-text new-password" name="new-password" placeholder="Mật khẩu mới" />
                        <span className='hidden-password' onClick={() => handleShowHidePassword('newPassword')}><i className={passwordVisibility.newPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>
                    </div>
                    <div className="form-group">
                        <input type={passwordVisibility.confirmPassword ? 'password' : 'text'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-text re-password" name="re-password" placeholder="Nhập lại mật khẩu mới" />
                        <span className='hidden-password' onClick={() => handleShowHidePassword('confirmPassword')}><i className={passwordVisibility.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>
                    </div>
                    <button className="input-text submit-update-password" onClick={(e) => handleChangePassword(e, session.user["id"])}>Thay đổi</button>
                    {message && <p className="message-error">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default ContentSidePanel;