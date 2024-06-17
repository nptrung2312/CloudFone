import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../../assets/scss/Layout.scss';

function MasterLayout({ children }) {
    const bgHome = require('./images/background-home.jpg');
    return (
        <div className='container'>
            <div className="layout">
                <img className='bg-layout' src={bgHome} />
                <Header />
                <div className="content-area">
                    <Sidebar />
                    <main>{children}</main>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default MasterLayout;