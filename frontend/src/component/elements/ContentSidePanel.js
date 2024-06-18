import React from "react";
import '../../assets/scss/ContentSidePanel.scss';

function ContentSidePanel() {
    const avatar = require('../layout/images/user.jpg')
    return (
        <div className="main-considepanel-wrapper">
            <h2 className="title-considepanel">Nguyễn Phước Trung</h2>
            <div className="content-considepanel">
                <div className="avatar-wrap">
                    <img className="avatar-user" src={avatar} alt="avatar-user" />
                </div>
                <div className="info-user">
                    <h3 className="title-info">Thông tin liên hệ</h3>
                    <div className="info">
                        <form>
                            <div className="form-group">
                                <label for="lastName">Tên</label>
                                <div type="text" value="" className="lastName" id="lastName" name="lastName">Trung</div>
                            </div>
                            <div className="form-group">
                                <label for="firstName">Họ</label>
                                <div type="text" value="Nguyễn Phước" className="firstName" id="firstName" name="firstName">Nguyễn Phước</div>
                            </div>
                            <div className="form-group">
                                <label for="position">Chức vụ</label>
                                <div type="text" value="Chuyên viên kỹ thuật" className="position" id="position" name="position" >Chuyên viên kỹ thuật</div>
                            </div>
                            <div className="form-group">
                                <label for="company">Đơn vị</label>
                                <div type="text" value="MobifoneService Cần Thơ" className="company" id="company" name="company" >MobifoneService Cần Thơ</div>
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <div type="text" value="admin@gmail.com" className="email" id="email" name="email" >admin@gmail.com</div>
                            </div>
                            <div className="form-group">
                                <label for="address">Địa chỉ</label>
                                <div type="text" value="137/31, Long Thạnh, Phụng Hiệp, Hậu Giang" className="address" id="address" name="address" >137/31, Long Thạnh, Phụng Hiệp, Hậu Giang</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="info-login">
                    <h3 className="title-info-login">Đổi mật khẩu</h3>
                    <input type="password" className="current-password" placeholder="Mật khẩu hiện tại" />
                    <input type="password" className="new-password" placeholder="Mật khẩu mới" />
                    <input type="password" className="dup-password" placeholder="Nhập lại mật khẩu mới" />
                    <button className="submit-update-password">Thay đổi</button>
                </div>
            </div>
        </div>
    );
}

export default ContentSidePanel;