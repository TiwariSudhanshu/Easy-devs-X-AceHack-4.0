import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { setWalletAddress } from '../store/walletSlice';
import { useSelector } from 'react-redux';
const ProductsIcon = () => <span>📦</span>;
const AddIcon = () => <span>➕</span>;

const Sidebar = () => {
    const dispatch = useDispatch();
    const walletAddress = useSelector((state) => state.wallet.walletAddress);
    const [isOpen, setIsOpen] = useState(false);
    // const [walletAddress, setWalletAddress] = useState(null);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebarOnMobile = () => {
        if (window.innerWidth < 768) setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'All Products', path: '/', icon: <ProductsIcon /> },
        { name: 'Add Product', path: '/additem', icon: <AddIcon /> },
        { name: 'Verify Product', path: '/verify', icon: <AddIcon /> },
    ];

    // Function to connect wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                dispatch(setWalletAddress(accounts[0]))  // Store the first connected account
            } catch (error) {
                console.error("Wallet connection failed:", error);
            }
        } else {
            alert("MetaMask not detected! Please install MetaMask.");
        }
    };

    return (
        <>
            {/* Mobile Nav Header */}
            <div className="flex justify-between items-center bg-gray-800 text-white p-4 md:hidden">
                <button 
                    onClick={toggleSidebar} 
                    className="text-white focus:outline-none" 
                    aria-label="Toggle sidebar"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" 
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 z-20 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:relative md:z-0
                `}
                role="navigation"
            >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-2xl font-bold">Menu</h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow">
                    <ul className="mt-6">
                        {navItems.map((item) => (
                            <li key={item.path} className="mb-2">
                                <Link
                                    to={item.path}
                                    onClick={closeSidebarOnMobile}
                                    className={`flex items-center px-4 py-3 text-sm rounded mx-2 transition-colors duration-200
                                        ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
                                    `}
                                >
                                    <div className="mr-3">{item.icon}</div>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Connect Wallet Button */}
                <div className="absolute bottom-4 w-full px-4">
                    {walletAddress ? (
                        <button className="w-full bg-green-600 text-white py-2 px-4 rounded cursor-default">
                            {walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4)}
                        </button>
                    ) : (
                        <button 
                            onClick={connectWallet} 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
