import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import '../../assets/scss/Sidebar.scss';

function Sidebar() {
    const [openMenu, setOpenMenu] = useState(true);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const Menu = [
        { 'title': 'Nhân sự', 'icon': 'fa-address-card-o' },
        { 'title': 'Công việc', 'icon': 'fa-calendar-minus-o', 'subMenu': 'true', 'subMenuItem': [{ 'title': 'Công việc trọng tâm' }, { 'title': 'Công việc phát sinh' }, { 'title': 'Công việc khác' }] },
        { 'title': 'Khách hàng', 'icon': 'fa-users' },
        { 'title': 'Sản phẩm - Dịch vụ', 'icon': 'fa-cubes' },
        { 'title': 'Dự án', 'icon': 'fa-object-group' }
    ]
    return (
        <div className='sidebar-content'>
            <Tippy content="Menu" placement="right">
                <div className='bar-menu' onClick={() => setOpenMenu(!openMenu)}>
                    <div className='design-bar'>
                        <span className='line-1'></span>
                        <span className='line-2'></span>
                        <span className='line-3'></span>
                    </div>
                </div>
            </Tippy>
            <div className={`main-menu h-screen p-5 pt-8 ${openMenu ? "w-20" : "w-72"} duration-300 relative`}>
                <ul className='menu-sidebar pt-2'>
                    {Menu.map((item, index) => (
                        <>
                            <Tippy content={item.title} placement="right">
                                <li key={index} className='menu-item'>
                                    <span className='icon'><i className={`fa ${item.icon}`} aria-hidden="true"></i></span>
                                    <span className={`text ${openMenu && "hidden"} duration-300`}>{item.title}</span>

                                    {item.subMenu && !openMenu && (<p onClick={() => setOpenSubMenu(!openSubMenu)}><span className={`icon-sub-menu duration-300 ${openSubMenu && "rotate-180"}`} ><i class="fa fa-sort-desc" aria-hidden="true"></i></span></p>)}

                                </li>
                            </Tippy>
                            {
                                item.subMenu && openSubMenu && !openMenu && (
                                    <ul className='sub-menu'>
                                        {item.subMenuItem.map((subItem, subIndex) => (
                                            <li key={subIndex} className='sub-menu-item'>{subItem.title}</li>
                                        ))}
                                    </ul>
                                )
                            }
                        </>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;