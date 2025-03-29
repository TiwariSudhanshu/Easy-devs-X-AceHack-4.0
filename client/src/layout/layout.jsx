import React, { Children } from 'react'
import Sidebar from './sidbar'
import { Outlet } from 'react-router-dom'

const Layout = ({ Children }) => {
    return (
        <>
            <div className='flex'>
                <div className='fixed '>
                    <Sidebar />
                </div>
                <div className=' md:w-[80%] md:ml-72 md:ml- py-12'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout