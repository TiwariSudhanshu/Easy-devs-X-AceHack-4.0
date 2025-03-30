import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../component/parts/inputfield';
import Button from '../component/parts/button';
import Sidebar from '../layout/Sidebar';
import axios from 'axios';

const OwnershipChange = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        from: "",
        to: "",
        tokenId: ""
    });

    // 0xdCbE9773B8df79F49b3EC77eD816d5E56dD341fb

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/transfer-nft`, {
                ...user
            })
            if (response.status === 200) {
                toast.success("Ownership changed successfully")
                setVerifiedData(response.data)
                toast.success("Data found")
            } else {
                setVerifiedData(null)
                toast.error("No item found with that key")
            }
        } catch (error) {
            console.error("Error verifying item:", error)
            toast.error("An error occurred while verifying the item")
        } finally {
            setIsVerifying(false)
        }

        setUser({
            from: "",
            to: "",
            tokenId: ""
        });
    };

    console.log(user.from, user.to, user.tokenId);


    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-gray-900/50 backdrop-blur-sm p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
                <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-indigo-400 hover:text-indigo-300 mb-4 transition"
                    >
                        Back
                    </button>
                    <h2 className="text-2xl font-semibold mb-4 text-white">Ownership Change</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="From"
                            type="text"
                            name="from"
                            value={user.from}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="To"
                            type="text"
                            name="to"
                            value={user.to}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Token ID"
                            type="text"
                            name="tokenId"
                            value={user.tokenId}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" className="w-full" label={"Check now"} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OwnershipChange;
