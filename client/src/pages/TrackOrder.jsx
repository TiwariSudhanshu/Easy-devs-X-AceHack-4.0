
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../component/parts/inputfield'
import { FiCheck, FiChevronLeft } from 'react-icons/fi'
import Sidebar from '../layout/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'

const Track = () => {
    const navigate = useNavigate()
    const [inputKey, setInputKey] = useState('')
    const [verifiedData, setVerifiedData] = useState(null)
    const [history, setHistory] = useState(null)
    const [isVerifying, setIsVerifying] = useState(false)

    const handleInputChange = (e) => {
        setInputKey(e.target.value)
    }

    const handleVerify = async () => {
        if (!inputKey.trim()) {
            toast.error("Please enter an item key")
            return
        }

        setIsVerifying(true)
        try {
            const responsedetails = await axios.get(`https://easy-devs-x-acehack-4-0.onrender.com/get-product/${inputKey}`, {
                params: { id: inputKey }
            })

            const responseHistory = await axios.get(`https://easy-devs-x-acehack-4-0.onrender.com/get-ownership-history/${inputKey}`, {
                params: { id: inputKey }
            })

            if (responsedetails.status === 200 && responseHistory.status === 200) {
                setVerifiedData(responsedetails.data)
                setHistory(responseHistory.data.ownershipHistory)
                toast.success("Data found")
            } else {
                setVerifiedData(null)
                setHistory(null)
                toast.error("No item found with that key")
            }
        } catch (error) {
            console.error("Error verifying item:", error)
            toast.error("An error occurred while verifying the item")
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />

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
                                className={`px-6 py-2.5 h-fit rounded-lg transition ${isVerifying
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
                                    <h2 className='text-xl font-semibold text-indigo-300'>Item Key: {verifiedData.id}</h2>
                                </div>
                                <h3 className='mt-6 font-medium text-gray-300 border-b border-gray-700 pb-2'>Item Details:</h3>
                                <div className="mt-4 space-y-2 text-gray-300">
                                    <p><strong>Name:</strong> {verifiedData.name}</p>
                                    <p><strong>Price:</strong> ${verifiedData.price}</p>
                                    <p><strong>Category:</strong> {verifiedData.category || 'N/A'}</p>
                                    <p><strong> Current Owner:</strong> {verifiedData.owner}</p>
                                </div>

                                <div>
                                    <h3 className='mt-6 font-medium text-gray-300 border-b border-gray-700 pb-2'>Ownership History:</h3>
                                    <ul className='list-disc ml-5 mt-2 text-gray-300'>
                                        {history?.map((item, index) => (
                                            <li key={index} className='mt-1 flex items-center gap-4'>
                                                <p>{index + 1}. </p>  <strong>{item}:</strong>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track
