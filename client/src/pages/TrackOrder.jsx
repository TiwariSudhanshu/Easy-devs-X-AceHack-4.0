import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import InputField from './parts/inputfield'
import InputField from '../component/parts/inputfield'
import { FiCheck, FiChevronLeft } from 'react-icons/fi'
import Sidebar from '../layout/Sidebar'

const Track = () => {
    const navigate = useNavigate()
    const [inputKey, setInputKey] = useState('')
    const [verifiedData, setVerifiedData] = useState(null)
    const [isVerifying, setIsVerifying] = useState(false)

    const sampleData = {
        itemKey: "1234567890",
        ownerHistory: [{
            owner: "Manufacturer",
            date: "2025-10-01T12:00:00Z",
        },
        {
            owner: "Retailer",
            date: "2025-10-02T12:00:00Z",
        },
        {
            owner: "Consumer",
            date: "2025-10-03T12:00:00Z",
        }]
    }

    const handleInputChange = (e) => {
        setInputKey(e.target.value)
    }

    const handleVerify = () => {
        if (!inputKey.trim()) {
            alert("Please enter an item key")
            return
        }

        setIsVerifying(true)
        
        setTimeout(() => {
            if (inputKey === sampleData.itemKey) {
                setVerifiedData(sampleData)
            } else {
                setVerifiedData(null)
                alert("No item found with that key")
            }
            setIsVerifying(false)
        }, 1000)
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            {/* Sidebar */}
            {/* <div className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 flex flex-col">
                <div className="p-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">TrackChain</h1>
                </div>
                
                <nav className="mt-8 flex-1">
                    <div className="px-4 space-y-1">
                        <button 
                            className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
                            onClick={() => navigate('/dashboard')}
                        >
                            <DashboardIcon />
                            <span>Dashboard</span>
                        </button>
                        <button 
                            className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-500/20 text-indigo-400 transition"
                        >
                            <TrackOrderIcon />
                            <span>Track Order</span>
                        </button>
                        <button 
                            className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
                            onClick={() => navigate('/add-product')}
                        >
                            <AddProductIcon />
                            <span>Add Product</span>
                        </button>
                    </div>
                </nav>
                
                <div className="p-4 border-t border-white/10 mt-auto">
                    <button 
                        className="flex items-center gap-2 p-2 w-full text-gray-400 hover:text-white rounded-lg transition"
                        onClick={() => navigate('/login')}
                    >
                        <LogoutIcon />
                        <span>Logout</span>
                    </button>
                </div>
            </div> */}
            <Sidebar/>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-900/50 backdrop-blur-sm p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>

                    <div className="mb-8">
                        <h1 className='text-3xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 inline-block text-transparent bg-clip-text'>
                            Verify Item Ownership
                        </h1>
                        <p className="text-gray-400 mt-2">Check the authenticity and ownership history of your item</p>
                    </div>
                    
                    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 p-8">
                        <div className='flex flex-col md:flex-row md:items-end gap-6'>
                            <div className="flex-1">
                                <InputField 
                                    label="Enter your Item Key" 
                                    type="text" 
                                    placeholder="Item Key" 
                                    value={inputKey}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                onClick={handleVerify}
                                disabled={isVerifying}
                                className={`px-6 py-2.5 h-fit rounded-lg transition ${
                                    isVerifying 
                                        ? 'bg-indigo-700 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                                } text-white w-full md:w-auto`}
                            >
                                {isVerifying ? "Verifying..." : "Verify"}
                            </button>
                        </div>

                        {verifiedData && (
                            <div className='mt-8 p-6 border border-indigo-800 rounded-lg bg-gray-850 bg-opacity-50'>
                                <div className="flex items-center mb-4">
                                    <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mr-3">
                                        <FiCheck className="h-5 w-5 text-green-200" />
                                    </div>
                                    <h2 className='text-xl font-semibold text-indigo-300'>Item Key: {verifiedData.itemKey}</h2>
                                </div>
                                
                                <h3 className='mt-6 font-medium text-gray-300 border-b border-gray-700 pb-2'>Ownership History:</h3>
                                <div className="mt-4 space-y-4">
                                    {verifiedData.ownerHistory.map((owner, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3"></div>
                                            <div>
                                                <div className="font-medium text-white">{owner.owner}</div>
                                                <div className="text-gray-400 text-sm">
                                                    {new Date(owner.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Placeholder icon components
const DashboardIcon = () => <div className="w-5 h-5 bg-current mask mask-circle" />;
const TrackOrderIcon = () => <div className="w-5 h-5 bg-current mask mask-rectangle" />;
const AddProductIcon = () => <div className="w-5 h-5 bg-current mask mask-star-2" />;
const LogoutIcon = () => <div className="w-5 h-5 bg-current mask mask-logout" />;

export default Track