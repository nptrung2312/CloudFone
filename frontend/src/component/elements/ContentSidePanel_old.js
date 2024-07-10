import React, { useState } from "react";
import '../../assets/scss/ContentSidePanel.scss';
import InputForm from "./InputForm";

class ContentSidePanel extends Component {
    render() {
        // Xử lý dữ liệu nhận vào
        const session = JSON.parse(sessionStorage.getItem('account'));

        const [userData, setUserData] = useState({
            lastName: session.user["lastName"],
            firstName: session.user["firstName"],
            position: session.user["positionId"],
            company: session.user["roleId"],
            email: session.user["email"],
            phone: session.user["phonenumber"],
            address: session.user["address"]
        });

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            console.log(name)
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
        //-----------------------------------------------
        // Xử lý hiển thị password
        const [passwordVisibility, setPasswordVisibility] = useState({
            currentPassword: true,
            newPassword: true,
            rePassword: true
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
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log("Form data submitted: ", userData);
        };
        return (
            <div className="main-considepanel-wrapper">
                <h2 className="title-considepanel">Nguyễn Phước Trung</h2>
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
                                <InputForm label="Tên" name="lastName" fieldName="lastName" initialValue={userData.lastName} value={userData.lastName} onChange={handleInputChange} />
                                <InputForm label="Họ" fieldName="firstName" initialValue={userData.firstName} value={userData.firstName} onChange={handleInputChange} />
                                <InputForm label="Chức vụ" fieldName="position" initialValue={userData.position} value={userData.position} onChange={handleInputChange} />
                                <InputForm label="Đơn vị" fieldName="company" initialValue={userData.company} value={userData.company} onChange={handleInputChange} />
                                <InputForm label="Email" fieldName="email" initialValue={userData.email} value={userData.email} onChange={handleInputChange} />
                                <InputForm label="Số điện thoại" fieldName="phone" initialValue={userData.phone} value={userData.phone} onChange={handleInputChange} />
                                <InputForm label="Địa chỉ" fieldName="address" initialValue={userData.address} value={userData.address} onChange={handleInputChange} />
                                <button type="submit" className="submit-button">Cập nhật</button>
                            </form>
                        </div>
                    </div>
                    <div className="info-login">
                        <h3 className="title-info">Đổi mật khẩu</h3>
                        <div className="form-group">
                            <input type={passwordVisibility.currentPassword ? 'password' : 'text'} className="input-text current-password" name="current-password" placeholder="Mật khẩu hiện tại" />
                            <span className='hidden-password' onClick={() => handleShowHidePassword('currentPassword')}><i className={passwordVisibility.currentPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>
                        </div>
                        <div className="form-group">
                            <input type={passwordVisibility.newPassword ? 'password' : 'text'} className="input-text new-password" name="new-password" placeholder="Mật khẩu mới" />
                            <span className='hidden-password' onClick={() => handleShowHidePassword('newPassword')}><i className={passwordVisibility.newPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>
                        </div>
                        <div className="form-group">
                            <input type={passwordVisibility.rePassword ? 'password' : 'text'} className="input-text re-password" name="re-password" placeholder="Nhập lại mật khẩu mới" />
                            <span className='hidden-password' onClick={() => handleShowHidePassword('rePassword')}><i className={passwordVisibility.rePassword ? 'fa fa-eye' : 'fa fa-eye-slash'} aria-hidden="true"></i></span>
                        </div>
                        <button className="input-text submit-update-password">Thay đổi</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentSidePanel;