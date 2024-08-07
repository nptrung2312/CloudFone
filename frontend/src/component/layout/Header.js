import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import '../../assets/scss/Header.scss';
import PopperWrapper from '../elements/PopperWrapper';
import Clock from '../elements/Clock';
import { useNavigate } from 'react-router-dom';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';
import '../../assets/scss/SidePanel.scss';
import ContentSidePanel from '../elements/ContentSidePanel';
import { fetchUser } from '../../redux/userSlice';
import { updateStatusContentSidePanel } from '../../redux/userSlice';

function Header() {
    const session = JSON.parse(sessionStorage.getItem('account'));
    const logo = require('./images/logo.png');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const avatar = useSelector((state) => state.user.avatar);
    const firstName = useSelector((state) => state.user.user.firstName);
    const lastName = useSelector((state) => state.user.user.lastName);
    const policy = useSelector((state) => state.user.user.account.policy);
    const statusPanel = useSelector((state) => state.user.statusContentSidePanel);
    const user = useSelector((state) => state.user.user);
    //handle date
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    //------------------------------

    // handle click user menu
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    //----------------------------------------

    const handleLogOut = () => {
        sessionStorage.removeItem('account');
        navigate('/');
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        // Your form submission logic here if needed
    };

    const [openPanel, setOpenPanel] = useState(false);

    const [dataUser, setDataUser] = useState(null);

    const fetchUserData = () => {
        axios.post('http://localhost:8080/api/getInfoUser', session.user)
            .then(res => {
                if (res.data.user) {
                    setDataUser(res.data.user);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (user) {
            setOpenPanel(statusPanel);
        }
    }, [user, statusPanel]);

    useEffect(() => {
        fetchUserData(); // Chỉ tải 1 lần khi render
        dispatch(fetchUser(session.user));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let defaultAvatar = require('./images/user.jpg');
    let defaultFullName = "Administrator";
    let defaultPolicy = "Chức vụ";
    if (dataUser) {
        defaultAvatar = dataUser.image ?? dataUser.image;
        defaultFullName = `${dataUser.firstName} ${dataUser.lastName}`;
        defaultPolicy = dataUser.account['policy'] ?? dataUser.account['policy'];
    }
    return (
        <header>
            <div className='header-wrapper'>
                <div className='logo-header'>
                    <img className='logo' src={logo} alt='MobifoneService-CanTho' />
                </div>
                <div className='form-seach-header'>
                    <form onSubmit={handleSubmit}>
                        <input className='search-input' type='text' placeholder='Nội dung cần tìm...' />
                        <Tippy content="Tìm kiếm" placement="right">
                            <button className='search-button'>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </Tippy>
                    </form>
                </div>

                <div className='datetime-header'>
                    <Clock />
                    <div className='date'>
                        {formatDate(currentTime)}
                    </div>
                </div>

                <div className='user-header' ref={buttonRef} onClick={toggleMenu}>
                    <div className='avatar'>
                        <img className='img-user' src={avatar || defaultAvatar} alt='avatar-user' />
                    </div>
                    <div className='info'>
                        <span className='position'>{policy || defaultPolicy}</span>
                        <span className='name'>{(firstName + " " + lastName) || defaultFullName}</span>
                    </div>
                </div>
                {isOpen && (
                    <PopperWrapper referenceElement={buttonRef.current}>
                        <div ref={menuRef} className="menu-user">
                            <button className='btn-user info-user' onClick={() => { setOpenPanel(true); dispatch(updateStatusContentSidePanel(true)); }}>
                                <span className='icon'><i className="fa fa-address-book-o" aria-hidden="true"></i></span>
                                <span className='text'>Hồ sơ</span>
                            </button>
                            <button className='btn-user logout-user' onClick={handleLogOut}>
                                <span className='icon'><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                                <span className='text'>Đăng xuất</span>
                            </button>
                        </div>
                    </PopperWrapper>
                )}
            </div>
            <SlidingPanel
                type={'right'}
                isOpen={openPanel}
                size={50}
                hideBackdrop={true} // Hiển thị backdrop
                backdropClicked={() => setOpenPanel(false)}
            >
                <div className='sidepanel-wrapper'>
                    <ContentSidePanel userDataChild={user || dataUser} />
                    <Tippy content="Đóng" placement="left">
                        <button className='close-sidepanel' onClick={() => setOpenPanel(false)}><i className="fa fa-times" aria-hidden="true"></i></button>
                    </Tippy>
                </div>
            </SlidingPanel>
        </header>
    );
}

export default Header;
