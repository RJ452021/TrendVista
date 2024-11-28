import React, { useState, useEffect } from 'react';
import axios from 'axios';


function AddProduct() {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch categories when the component loads
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/products/add', product);

            if (response.status === 201) {
                setMessage('Product added successfully!');
                setProduct({ name: '', price: '', description: '', category: '' }); // Reset form
            } else {
                setMessage('Failed to add product.');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error || 'An error occurred on the server.');
            } else {
                setMessage('Network error. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container h-[80.5vh] w-full py-5 text-gray-800 px-10 flex flex-col items-center justify-center">
            <h1 className='text-2xl  font-bold mb-4'>Add Product</h1>
            <form className='flex flex-col gap-4 items-center justify-center' onSubmit={handleSubmit}>
                <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
                    id="name"
                    name="name"
                    type="text"
                    value={product.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter product name"
                />
                <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
                    id="price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    required
                    placeholder="Enter price"
                />
                <textarea className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                ></textarea>
                <select className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <button className='p-4 rounded-md outline-none bg-gray-700 text-white' type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddProduct;
