import React from 'react'
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import Routers from '../../router/Routers';

const Layout = () => {
    
    const pathName = window.location.pathname.split('/')[1];

    return <>
        <Header />
        <Routers />
        {
            pathName !== 'admin'
            &&
            <Footer />
        }
    </>
}

export default Layout
