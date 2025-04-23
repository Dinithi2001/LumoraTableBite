import React from 'react';
import axios from 'axios';

const AddCategoryModel = ({ onClose, title = "Add Category" }) => {
    const [form, setForm] = React.useState({
        name: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [id]: value,
        }));
    };

    const saveCategory = async (formData) => {
        try {
            const response = await axios.post('/api/categories', formData);
            if (response.status === 200 || response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveCategory(form);
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className='fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-center z-40' 
            id="wrapper" 
            onClick={handleClose}
        >
            <div className='w-full max-w-md mx-4 sm:mx-0 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-2xl max-h-[90vh] flex flex-col'>
                <header className='flex justify-between items-center p-3 bg-[#4B2E1E] rounded-t-2xl border shrink-0'>
                    <span className='text-sm sm:text-xl text-white'>{title}</span>
                </header>

                <form 
                    className='p-4 sm:p-6 space-y-3 text-sm overflow-y-auto flex-1' 
                    onSubmit={handleSubmit}
                >
                    <div className='space-y-3'>
                        <div>
                            <label 
                                className='block text-gray-700 text-sm sm:text-base' 
                                htmlFor="name"
                            >
                                Category Name
                            </label>
                            <input
                                className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm'
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Add category name"
                                required
                                value={form.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 px-1 py-1'>
                        <button
                            className='w-full sm:w-48 h-12 bg-[#4B2E1E] text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 text-base font-medium'
                            type='submit'
                        >
                            Save Category
                        </button>
                        <button
                            type='button'
                            onClick={onClose}
                            className='w-full sm:w-auto px-6 py-2 text-base font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryModel;