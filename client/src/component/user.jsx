import React, { useState } from 'react'
import InputField from './parts/inputfield'
import Button from './parts/button'
import axios from 'axios'

const Verify = () => {
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

    // const handleVerify = () => {
    //     if (!inputKey.trim()) {
    //         alert("Please enter an item key")
    //         return
    //     }

    //     setIsVerifying(true)
        
    //     setTimeout(() => {
    //         if (inputKey === sampleData.itemKey) {
    //             setVerifiedData(sampleData)
    //         } else {
    //             setVerifiedData(null)
    //             alert("No item found with that key")
    //         }
    //         setIsVerifying(false)
    //     }, 1000)
    // }
    const handleVerify = async () => {
        if (!inputKey.trim()) {
            alert("Please enter an item key")
            return
        }

        setIsVerifying(true)

        try {
            const response = await axios.get(`http://localhost:3000/get-product/${inputKey}`, {
                params: { id: inputKey }
            })

            if (response.data) {
                console.log("data",response.data);
                setVerifiedData(response.data)
                alert("Data found")
            } else {
                setVerifiedData(null)
                alert("No item found with that key")
            }
        } catch (error) {
            console.error("Error verifying item:", error)
            alert("An error occurred while verifying the item")
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <>
            <h1 className='text-3xl font-semibold'>Verify Item Ownership</h1>
            <div>
                <div className='mt-6 flex items-center gap-16'>
                    <InputField 
                        label="Enter your Item Key" 
                        type="text" 
                        placeholder="Item Key" 
                        value={inputKey}
                        onChange={handleInputChange}
                    />
                    <Button 
                        label={isVerifying ? "Verifying..." : "Verify"} 
                        className='h-fit' 
                        onClick={handleVerify}
                        disabled={isVerifying}
                    />
                </div>

                {verifiedData && (
                    <div className='mt-8 p-4 border rounded-lg bg-gray-50'>
                        <h2 className='text-xl font-semibold'>Item Key: {verifiedData.itemKey}</h2>
                        <h3 className='mt-4 font-medium'>Ownership History:</h3>
                        <ul className='list-disc ml-5 mt-2'>
                            {/* {verifiedData.ownerHistory.map((owner, index) => (
                                <li key={index} className='mt-1'>
                                    {owner.owner} - {new Date(owner.date).toLocaleString()}
                                </li>
                            ))} */}
                            {Object.entries(verifiedData).map(([key, value], index) => (
                                <li key={index} className='mt-1'>
                                    <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Verify