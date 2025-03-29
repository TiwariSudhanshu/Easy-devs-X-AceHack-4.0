import React, { useEffect, useState } from 'react';
import Input from './parts/inputfield';
import SelectField from './parts/selectfiled';
import Button from './parts/button';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ShowItem = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            title: 'Wireless Headphones',
            category: 'Electronics',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 129.99,
            discount: 10,
            stock: 45,
            image: '/sample-image-1.jpg',
            owner: 'Manu.',
            specifications: [
                { key: 'Color', value: 'Black' },
                { key: 'Battery Life', value: '20 hours' }
            ]
        },
        {
            id: 2,
            title: 'Cotton T-Shirt',
            category: 'Clothing',
            description: 'Comfortable cotton t-shirt, available in multiple colors',
            price: 24.99,
            discount: 0,
            stock: 120,
            image: '/sample-image-2.jpg',
            owner: 'Manu.',
            specifications: [
                { key: 'Material', value: '100% Cotton' },
                { key: 'Sizes', value: 'S, M, L, XL' }
            ]
        },
        {
            id: 3,
            title: 'Office Desk Chair',
            category: 'Furniture',
            description: 'Ergonomic office chair with lumbar support',
            price: 199.99,
            discount: 15,
            stock: 18,
            image: '/sample-image-3.jpg',
            owner: 'Manu.',
            specifications: [
                { key: 'Weight Capacity', value: '300 lbs' },
                { key: 'Material', value: 'Mesh and Steel' }
            ]
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    // useEffect(()=>{
    //     const fetchProducts = async () => {
    //         try {

    //             const response = await axios.get(`/get-product/:${id}`)


    //         } catch (error) {
                
    //         }
    //     }
    // },[])

    async function fetchProductsBySearch() {
        try {
            const response = await axios.get(`/get-product/:${id}`,{},{})
            console.log(response);

            setProducts([response.data])

            
        } catch (error) {
            
        }
    } 

    return (
        <div className="p-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                        <Input
                            label="Search Products"
                            type="text"
                            placeholder="Search by name or description"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/4">
                        <SelectField
                            label="Filter by Category"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            options={[
                                { value: 'all', label: 'All Categories' },
                                { value: 'Electronics', label: 'Electronics' },
                                { value: 'Clothing', label: 'Clothing' },
                                { value: 'Furniture', label: 'Furniture' },
                                { value: 'Other', label: 'Other' }
                            ]}
                        />
                    </div>
                    <div className="flex items-end mt-4 md:mt-0">
                       <Link to={'/additem'}> <Button className='cursor-pointer' label={"Add New Product"} /></Link>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600">Showing {filteredProducts.length} of {products.length} products</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Info</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'> Owner </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                    Image
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                                                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                                {product.specifications.length > 0 && (
                                                    <div className="mt-1">
                                                        <p className="text-xs text-gray-500">
                                                            <span className="font-medium">{product.specifications[0].key}:</span> {product.specifications[0].value}
                                                            {product.specifications.length > 1 && ` + ${product.specifications.length - 1} more`}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.category}
                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">
                                                    Rs {product.price.toFixed(2)}
                                                </span>
                                                {product.discount > 0 && (
                                                    <span className="text-xs text-green-600">
                                                        {product.discount}% off
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 50 ? 'bg-green-100 text-green-800' :
                                                product.stock > 10 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {product.stock} units
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <Button variant="secondary" size="sm" label={"Edit"} />
                                                {/* <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(product.id)}
                                                    label={" Delete"}
                                                /> */}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <p>{product.owner}</p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                        No products found matching your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShowItem;