import React, { useState, useRef, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import '../../assets/scss/Header.scss';
import PopperWrapper from '../elements/PopperWrapper';

function Header() {
    const logo = require('./images/logo.png');
    const avatar = require('./images/user.jpg');
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
    return (
        <header>
            <div className='header-wrapper'>
                <div className='logo-header'>
                    <img className='logo' src={logo} alt='MobifoneService-CanTho' />
                </div>
                <div className='form-seach-header'>
                    <form action=''>
                        <select className='search-select' name='prefix'>
                            <option value='1' select='selected'>Nhân sự</option>
                            <option value='2'>Dịch vụ</option>
                            <option value='3'>Công việc</option>
                        </select>
                        <input className='search-input' type='text' placeholder='Nội dung cần tìm...' />
                        <Tippy content="Tìm kiếm" placement="right">
                            <button className='search-button'>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </Tippy>
                    </form>
                </div>
                <div className='datetime-header'>
                    <div className='time'>
                        11:30
                    </div>
                    <div className='date'>
                        17/06/2024
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
                    {isOpen && (
                        <PopperWrapper referenceElement={buttonRef.current}>
                            <div ref={menuRef} className="menu-user">
                                <ul>
                                    <li>Item 1</li>
                                    <li>Item 2</li>
                                    <li>Item 3</li>
                                </ul>
                            </div>
                        </PopperWrapper>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Header;
