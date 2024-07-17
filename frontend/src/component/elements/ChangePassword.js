import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { SuccessIcon, ErrorIcon } from '../elements/ToastIcon';
import { updateStatusContentSidePanel } from '../../redux/userSlice';
import '../../assets/scss/ChangePassword.scss';

const ChangePassword = ({ idAccount }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            setMessage('Mật khẩu không trùng khớp!');
        } else {
            setMessage('');
        }
    }, [newPassword, confirmPassword]);

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
                if (res.data.code === 0) {
                    dispatch(updateStatusContentSidePanel(false));
                    toast.success(res.data.message, { icon: <SuccessIcon /> });
                } else {
                    toast.error(res.data.message, { icon: <ErrorIcon /> });
                }
            })
            .catch(() => {
                toast.error("Đã xảy ra lỗi trong quá trình gửi yêu cầu!", { icon: <ErrorIcon /> });
            })
    }
    return (
        <div className="change-password-wrapper">
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
            <button className="input-text submit-update-password" onClick={(e) => handleChangePassword(e, idAccount)}>Thay đổi</button>
            {message && <p className="message-error">{message}</p>}
        </div>
    )
}

export default ChangePassword;