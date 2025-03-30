import React, { useState } from 'react';
import Input from './parts/inputfield';
import SelectField from './parts/selectfiled';
import InputField from './parts/inputfield';
import TextAreaField from './parts/textareafield';
import FileUpload from './parts/fileupload';
import Button from './parts/button';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Additem = () => {
    const walletAddress = useSelector((state) => state.wallet.walletAddress);
    const [specifications, setSpecifications] = useState([
        { key: '', value: '' }
    ]);

    const addSpecification = () => {
        setSpecifications([...specifications, { key: '', value: '' }]);
    };

    const [data,setData] = useState({
        name:"",
        description:"",
        price:0
    })

    const handleDataOnChange = function(event){
        const name = event.target.name
        const value = event.target.value
        setData((prevData)=>({...prevData , [name]:value}))        
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        data.recipient = walletAddress;
        try {
            const response = await axios.post("https://easy-devs-x-acehack-4-0.onrender.com/add-product",data)
            console.log(response);
            if(response.status === 200) {
                alert("Product added successfully");
            }
        } catch (error) {
            console.log(error);
        }
        console.log('Form submitted');
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8 px-4">
            <div className="w-full bg-white rounded-lg shadow-md p-8">
                <header className="mb-8 text-center">
                    <h1 className="font-bold text-3xl text-gray-800">Add New Product</h1>
                    <p className="text-gray-500 mt-2">Complete the form below to add a new product to your inventory</p>
                </header>
                
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    {/* Basic Information Section */}
                    <section className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                name={"name"}
                                label="Product Title"
                                type="text"
                                placeholder="Enter product title"
                                required
                                onChange={handleDataOnChange}
                            />
                            <SelectField
                                label="Product Category"
                                options={[
                                    { value: 'electronics', label: 'Electronics' },
                                    { value: 'clothing', label: 'Clothing' },
                                    { value: 'furniture', label: 'Furniture' },
                                    { value: 'other', label: 'Other' }
                                ]}
                            />
                        </div>
                    </section>

                    {/* Description Section */}
                    <section className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Product Details</h2>
                        <TextAreaField
                            name={"description"}
                            label="Product Description"
                            placeholder="Enter detailed product description"
                            required
                            rows={4}
                            onChange={handleDataOnChange}
                        />
                    </section>

                    {/* Pricing & Inventory */}
                    <section className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Pricing & Inventory</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                name={"price"}
                                label="Price ($)"
                                type="number"
                                placeholder="0.00"
                                required
                                onChange={handleDataOnChange}
                            />
                            <Input
                                label="Discount (%)"
                                type="number"
                                placeholder="0"
                            />
                            <Input
                                label="Stock Quantity"
                                type="number"
                                placeholder="0"
                                required
                            />
                        </div>
                    </section>

                    {/* Images Section */}
                    <section className="border-b pb-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Product Images</h2>
                        <FileUpload
                            label="Upload Product Images (Max 5)"
                            multiple
                            accept="image/*"
                            maxFiles={5}
                        />
                        <p className="text-sm text-gray-500 mt-2">Supported formats: JPG, PNG. Max file size: 5MB</p>
                    </section>

                    {/* Specifications Section */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Product Specifications</h2>
                            <Button
                                type="button"
                                onClick={addSpecification}
                                variant="secondary"
                                size="sm"
                                label="Add Specification"
                            />
                        </div>

                        <div className="space-y-4">
                            {specifications.map((spec, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <div className="flex-1">
                                        <Input
                                            label={index === 0 ? "Specification Name" : ""}
                                            type="text"
                                            placeholder="e.g. Color, Size, Material"
                                            value={spec.key}
                                            onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label={index === 0 ? "Value" : ""}
                                            type="text"
                                            placeholder="e.g. Blue, Large, Cotton"
                                            value={spec.value}
                                            onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                        />
                                    </div>
                                    {index > 0 && (
                                        <div className="pt-4">
                                            <Button
                                                type="button"
                                                onClick={() => removeSpecification(index)}
                                                variant="danger"
                                                size="sm"
                                                label="Remove"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-4">
                        <div className="flex gap-4">
                            <Button 
                                label="Cancel" 
                                type="button" 
                                variant="secondary" 
                            />
                            <Button 
                                label="Add Product" 
                                type="submit" 
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Additem;