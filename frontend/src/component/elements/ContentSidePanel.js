import React, { useState } from "react";
import '../../assets/scss/ContentSidePanel.scss';

function ContentSidePanel() {
    const avatar = require('../layout/images/user.jpg')
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
    return (
        <div className="main-considepanel-wrapper">
            <h2 className="title-considepanel">Nguyễn Phước Trung</h2>
            <div className="content-considepanel">
                <div className="avatar-wrap">
                    <div className="content-avatar">
                        <span><b><i className="fa fa-upload" aria-hidden="true"></i> Tải ảnh lên</b></span>
                        <img className="avatar-user" src={avatar} alt="avatar-user" />
                    </div>
                </div>
                <div className="info-user">
                    <h3 className="title-info">Thông tin liên hệ</h3>
                    <div className="info">
                        <form>
                            <div className="form-group">
                                <label>Tên</label>
                                <div type="text" value="" className="input-text lastName" id="lastName" name="lastName">Trung</div>
                            </div>
                            <div className="form-group">
                                <label>Họ</label>
                                <div type="text" value="Nguyễn Phước" className="input-text firstName" id="firstName" name="firstName">Nguyễn Phước</div>
                            </div>
                            <div className="form-group">
                                <label>Chức vụ</label>
                                <div type="text" value="Chuyên viên kỹ thuật" className="input-text position" id="position" name="position" >Chuyên viên kỹ thuật</div>
                            </div>
                            <div className="form-group">
                                <label>Đơn vị</label>
                                <div type="text" value="MobifoneService Cần Thơ" className="input-text company" id="company" name="company" >MobifoneService Cần Thơ</div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <div type="text" value="admin@gmail.com" className="input-text email" id="email" name="email" >admin@gmail.com</div>
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại</label>
                                <div type="text" value="0706.454.469" className="input-text email" id="email" name="email" >0706 454 469</div>
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <div type="text" value="137/31, Long Thạnh, Phụng Hiệp, Hậu Giang" className="input-text address" id="address" name="address" >137/31, Long Thạnh, Phụng Hiệp, Hậu Giang</div>
                            </div>
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

export default ContentSidePanel;