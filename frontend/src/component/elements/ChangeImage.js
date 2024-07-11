import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { SuccessIcon, ErrorIcon } from '../elements/ToastIcon';
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Avatar from "react-avatar-edit";
import '../../assets/scss/ChangeImage.scss';

const ChangeImage = ({ idUser, avatarUser }) => {
    let avatar = "";
    avatarUser ? avatar = avatarUser : avatar = require('../layout/images/user.jpg');
    const [image] = useState(avatar);
    const [imageCrop, setImageCrop] = useState(false);
    const [src, setSrc] = useState(null);
    const [profile, setProfile] = useState([]);
    const [pview, setPview] = useState(null);

    const profileFinal = profile.length ? profile[profile.length - 1].pview : image;

    const onClose = () => {
        setPview(null);
    };

    const onCrop = (view) => {
        setPview(view);
    };

    const saveCropImage = async () => {
        setProfile([...profile, { pview }]);
        setImageCrop(false);
        if (pview) {
            axios.post('http://localhost:8080/api/saveImage', { img: pview, id: idUser })
                .then(res => {
                    if (res.data.code === 0) {
                        setProfile([...profile, { pview }]);
                        setImageCrop(false);
                        toast.success(res.data.message, { icon: <SuccessIcon /> });
                    } else {
                        toast.error(res.data.message, { icon: <ErrorIcon /> });
                    }
                })
                .catch(() => {
                    toast.error("Đã xảy ra lỗi trong quá trình gửi yêu cầu!", { icon: <ErrorIcon /> });
                })
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substring(0, 5) === "image") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSrc(reader.result);
                setImageCrop(true);
            };
            reader.readAsDataURL(file);
        } else {
            setSrc(null);
        }
    };

    return (
        <div className="content-avatar">
            <img className="avatar" htmlFor="input-img" onClick={() => setImageCrop(true)} src={profileFinal} alt="profile-img" />
            <Dialog
                visible={imageCrop}
                header={() => (
                    <p className="text-dialog text-2xl font-semibold textColor">
                        Thay đổi ảnh đại diện
                    </p>
                )}
                onHide={() => setImageCrop(false)}
            >
                <Avatar
                    width={500}
                    height={400}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={src}
                    shadingColor={"#474649"}
                    backgroundColor={"#474649"}
                    borderStyle={{ border: "3px dashed #072442", borderRadius: "20px" }}
                />
                <Button className="btn-submit-dialog" onClick={saveCropImage} label="Hoàn thành" icon="pi pi-check" />
            </Dialog>
            <InputText
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="input-img"
                onChange={handleImageChange}
            />
        </div>
    );
}

export default ChangeImage;
