import React, { useState } from 'react';
import axios from 'axios'; // Import Axios


function AddCategory() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/categories/add', { name });
            
            if (response.status === 201) {
                setMessage('Category added successfully!');
                setName(''); // Clear the input field
            } else {
                setMessage('Failed to add category.');
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status code outside the range of 2xx
                setMessage(error.response.data.error || 'An error occurred on the server.');
            } else {
                // Network error or other unexpected issue
                setMessage('Network error. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container h-[80.5vh] w-full py-5 text-gray-800 px-10">
            <h1 className="text-2xl   font-bold mb-4">Add Category</h1>
            <form className='flex flex-col gap-4 items-center justify-center ' onSubmit={handleSubmit}>
                <div className='flex items-center gap-4 mt-10'>
                    <input className='p-2 w-[30vw] rounded-md outline-none border-2 border-gray-300 bg-gray-100'
                        placeholder='Enter Category Name'
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button className='p-4  rounded-md outline-none bg-gray-700 text-white' type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Category'}
                </button>
            </form>
            {message && <p>{message}</p>}
            
        </div>
    );
}

export default AddCategory;
