import React, { useState, useRef, useEffect } from 'react';
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

function Header() {
    const logo = require('./images/logo.png');
    const avatar = require('./images/user.jpg');
    const navigate = useNavigate();

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

    const [openPanel, setOpenPanel] = useState(false);
    return (
        <header>
            <div className='header-wrapper'>
                <div className='logo-header'>
                    <img className='logo' src={logo} alt='MobifoneService-CanTho' />
                </div>
                <div className='form-seach-header'>
                    <form action=''>
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
                        <img className='img-user' src={avatar} alt='avatar-user' />
                    </div>
                    <div className='info'>
                        <span className='position'>Chuyên viên kỹ thuật</span>
                        <span className='name'>Nguyễn Phước Trung</span>
                    </div>
                </div>
                {isOpen && (
                    <PopperWrapper referenceElement={buttonRef.current}>
                        <div ref={menuRef} className="menu-user">
                            <button className='btn-user info-user' onClick={() => setOpenPanel(true)}>
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
                    <ContentSidePanel />
                    <Tippy content="Đóng" placement="left">
                        <button className='close-sidepanel' onClick={() => setOpenPanel(false)}><i className="fa fa-times" aria-hidden="true"></i></button>
                    </Tippy>
                </div>
            </SlidingPanel>
        </header>
    );
}

export default Header;
