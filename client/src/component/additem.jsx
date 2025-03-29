import React, { useState } from 'react';
import Input from './parts/inputfield';
import SelectField from './parts/selectfiled';
import InputField from './parts/inputfield';
import TextAreaField from './parts/textareafield';
import FileUpload from './parts/fileupload';
import Button from './parts/button';


const AddProduct = () => {
    const [specifications, setSpecifications] = useState([
        { key: '', value: '' }
    ]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="p-4">
            <header className='flex justify-center py-10'>
                <h1 className='font-bold text-2xl'>Add item</h1>
            </header>
            <form className="max-w-5xl mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Product Title"
                        type="text"
                        placeholder="Enter product title"
                        required
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

                <TextAreaField
                    label="Product Description"
                    placeholder="Enter detailed product description"
                    required
                    rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="Price"
                        type="number"
                        placeholder="0.00"
                        required
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

                <div>
                    <h3 className="text-lg font-medium mb-2">Product Images</h3>
                    <FileUpload
                        label="Upload Product Images"
                        multiple
                        accept="image/*"
                        maxFiles={5}
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">Product Specifications</h3>
                        <Button
                            type="button"
                            onClick={addSpecification}
                            variant="secondary"
                            size="sm"
                            label={"Add Specification"}
                        />
                    </div>

                    {specifications.map((spec, index) => (
                        <div key={index} className="flex gap-4 items-end mb-2">
                            <Input
                                label={index === 0 ? "Specification Name" : ""}
                                type="text"
                                placeholder="e.g. Color, Size, Material"
                                value={spec.key}
                                onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                                className="flex-1"
                            />
                            <Input
                                label={index === 0 ? "Value" : ""}
                                type="text"
                                placeholder="e.g. Blue, Large, Cotton"
                                value={spec.value}
                                onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                className="flex-1"
                            />
                            {index > 0 && (
                                <Button
                                    type="button"
                                    onClick={() => removeSpecification(index)}
                                    variant="danger"
                                    size="sm"
                                    label={"Remove"}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-4">
                    <Button label={"Add now"} type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;