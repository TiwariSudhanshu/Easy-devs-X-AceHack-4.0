import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../component/parts/inputfield';
import SelectField from '../component/parts/selectfiled';
import TextAreaField from '../component/parts/textareafield';
import FileUpload from '../component/parts/fileupload';
import Button from '../component/parts/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Sidebar from '../layout/Sidebar';

const AddProduct = () => {
    const navigate = useNavigate();
    const walletAddress = useSelector((state) => state.wallet.walletAddress);

    const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        subCategory: '',
        price: '',
        discountPrice: '',
        stock: '',
        brand: '',
        description: '',
        shortDescription: '',
        tags: '',
        recipient: walletAddress,
        status: 'active'
    });
    const [isLoading, setIsLoading] = useState(false);

    const addSpecification = () => {
        setSpecifications([...specifications, { key: '', value: '' }]);
    };

    const updateSpecification = (index, field, value) => {
        const updatedSpecs = [...specifications];
        updatedSpecs[index][field] = value;
        setSpecifications(updatedSpecs);
    };

    const removeSpecification = (index) => {
        const updatedSpecs = [...specifications];
        updatedSpecs.splice(index, 1);
        setSpecifications(updatedSpecs);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const productData = {
                ...formData,
                specifications: specifications.filter(spec => spec.key && spec.value),
                // tags: formData.tags.split(',').map3(tag => tag.trim())
            };
            console.log('ProductData Category', productData.category);
            const response = await axios.post("http://localhost:3000/add-product", productData);
            
            if(response.status === 200) {
                toast.success('Product added successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/'); // Redirect to products page after success
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error(`Failed to add product: ${error.response?.data?.message || error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto bg-gray-900/50 backdrop-blur-sm p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
                <div className="max-w-5xl mx-auto">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button> 

                    <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6">
                            <header className="text-center">
                                <h1 className="font-bold text-3xl text-white tracking-tight">Add New Product</h1>
                                <p className="text-indigo-200 mt-2 font-light">Complete the form below to add a new product to your inventory</p>
                            </header>
                        </div>
                        
                        <form className="flex flex-col gap-8 p-8" onSubmit={handleSubmit}>
                            {/* Basic Information Section */}
                            <section className="border-b border-gray-800 pb-6">
                                <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
                                    Basic Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Product name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter product name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="text-indigo-200"
                                    />
                                    <SelectField
                                        label="Product Category"
                                        name="category"
                                        options={[
                                            { value: '', label: 'Select category', disabled: true },
                                            { value: 'electronics', label: 'Electronics' },
                                            { value: 'clothing', label: 'Clothing' },
                                            { value: 'furniture', label: 'Furniture' },
                                            { value: 'home-appliances', label: 'Home Appliances' },
                                            { value: 'other', label: 'Other' }
                                        ]}
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                    <InputField
                                        label="Sub Category"
                                        name="subCategory"
                                        type="text"
                                        placeholder="Enter sub category"
                                        value={formData.subCategory}
                                        onChange={handleChange}
                                        className="text-white"
                                    />
                                    <InputField
                                        label="Brand"
                                        name="brand"
                                        type="text"
                                        placeholder="Enter brand name"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        className="text-white"
                                    />
                                </div>
                            </section>

                            {/* Pricing & Inventory Section */}
                            <section className="border-b border-gray-800 pb-6">
                                <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                                    Pricing & Inventory
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField
                                        label="Price ($)"
                                        name="price"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        className="text-white"
                                        min="0"
                                        step="0.01"
                                    />
                                    <InputField
                                        label="Discount Price ($)"
                                        name="discountPrice"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                        className="text-white"
                                        min="0"
                                        step="0.01"
                                    />
                                    <InputField
                                        label="Stock Quantity"
                                        name="stock"
                                        type="number"
                                        placeholder="Available quantity"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        className="text-white"
                                        min="0"
                                    />
                                </div>
                            </section>

                            {/* Description Section */}
                            <section className="border-b border-gray-800 pb-6">
                                <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
                                    Product Description
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <TextAreaField
                                        label="Short Description"
                                        name="shortDescription"
                                        placeholder="A brief description (max 150 characters)"
                                        value={formData.shortDescription}
                                        onChange={handleChange}
                                        maxLength="150"
                                        rows="3"
                                        className="text-white"
                                    />
                                    <TextAreaField
                                        label="Full Description"
                                        name="description"
                                        placeholder="Detailed product description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="5"
                                        className="text-white"
                                    />
                                </div>
                            </section>

                            {/* Media Section */}
                            <section className="border-b border-gray-800 pb-6">
                                <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
                                    Product Media
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <FileUpload
                                        label="Main Product Image"
                                        accept="image/*"
                                        required
                                    />
                                    <FileUpload
                                        label="Additional Images"
                                        accept="image/*"
                                        multiple
                                    />
                                </div>
                            </section>

                            {/* Tags & Status Section */}
                            <section className="border-b border-gray-800 pb-6">
                                <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center">
                                    <span className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center mr-3 text-sm">5</span>
                                    Tags & Status
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="Tags (comma separated)"
                                        name="tags"
                                        type="text"
                                        placeholder="e.g. summer,new,trending"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        className="text-white"
                                    />
                                    <SelectField
                                        label="Status"
                                        name="status"
                                        options={[
                                            { value: 'active', label: 'Active' },
                                            { value: 'draft', label: 'Draft' },
                                            { value: 'out-of-stock', label: 'Out of Stock' },
                                            { value: 'archived', label: 'Archived' }
                                        ]}
                                        value={formData.status}
                                        onChange={handleChange}
                                    />
                                </div>
                            </section>

                            {/* Specifications Section */}
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-indigo-300 flex items-center">
                                        <span className="w-8 h-8 bg-indigo-800 rounded-full flex items-center justify-center mr-3 text-sm">6</span>
                                        Product Specifications
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={addSpecification}
                                        className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                                    >
                                        <FiPlus className="w-4 h-4" />
                                        Add Specification
                                    </button>
                                </div>

                                <div className="space-y-4 bg-gray-850 border border-gray-800 rounded-lg p-6">
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div className="flex-1">
                                                <InputField
                                                    label={index === 0 ? "Specification Name" : ""}
                                                    type="text"
                                                    placeholder="e.g. Color, Size, Material"
                                                    value={spec.key}
                                                    onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                                                    className="text-white"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <InputField
                                                    label={index === 0 ? "Value" : ""}
                                                    type="text"
                                                    placeholder="e.g. Blue, Large, Cotton"
                                                    value={spec.value}
                                                    onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                                    className="text-white"
                                                />
                                            </div>
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSpecification(index)}
                                                    className="flex items-center gap-1 px-3 py-1.5 mt-5 text-sm text-red-400 hover:text-red-300 bg-red-900/30 hover:bg-red-900/50 rounded-lg transition"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <div className="flex justify-end mt-8 pt-6 border-t border-gray-800">
                                <div className="flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="px-6 py-2.5 border border-gray-700 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white transition"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white transition flex items-center justify-center min-w-32"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            'Add Product'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;