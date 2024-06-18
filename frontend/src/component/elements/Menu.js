// Menu.js
import React, { useState, useRef, useEffect } from 'react';
import PopperWrapper from './PopperWrapper';

const Menu = () => {
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

    return (
        <div>
            <button ref={buttonRef} onClick={toggleMenu}>
                Toggle Menu
            </button>
            {isOpen && (
                <PopperWrapper referenceElement={buttonRef.current}>
                    <div ref={menuRef} className="menu">
                        <button className='info-user'><span><i class="fa fa-address-book-o" aria-hidden="true"></i></span> Hồ sơ</button>
                        <button className='logout-user'><span><i class="fa fa-sign-out" aria-hidden="true"></i></span>Đăng xuất</button>
                    </div>
                </PopperWrapper>
            )}
        </div>
    );
};

export default Menu;
