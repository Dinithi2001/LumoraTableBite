// pages/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Header from '../components/Header';

const AddFood = ({ onClose, title }) => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Main',
    cuisine: '',
    price: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the new product data to a backend or update the state in a parent component
    console.log('New Product:', newProduct);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div 
      className='fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-center z-40' 
      id="wrapper" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className='w-full max-w-md mx-4 sm:mx-0 sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white rounded-2xl max-h-[90vh] flex flex-col'>
        <header className='flex justify-between items-center p-3 bg-[#4B2E1E] rounded-t-2xl border shrink-0'>
          <span className='text-xl sm:text-2xl text-white'>{title}</span>
        </header>

        <form 
        onSubmit={handleSubmit}
        className='p-4 sm:p-6 space-y-3 text-sm flex-1'
        >
          {/* Food Item Name */}
          <div className="mb-4">
            <label className='block text-gray-700 text-sm sm:text-base'>
              Food Item Name
            </label>
            <input
              className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm'
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Food Name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className='block text-gray-700 text-sm sm:text-base'>
              Description
            </label>
            <textarea
              className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm'
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Add Description"
              rows="3"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className='block text-gray-700 text-sm sm:text-base'>
              Category
            </label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm appearance-none cursor-pointer'
            >
              <option value="Main">Main</option>
              <option value="Starter">Starter</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Cuisine */}
          <div className="mb-4">
            <label className='block text-gray-700 text-sm sm:text-base'>
              Cuisine
            </label>
            <select
              name="cuisine"
              value={newProduct.cuisine}
              onChange={handleInputChange}
              className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm appearance-none cursor-pointer'
            >
              <option value="srilankan">Sri Lankan</option>
              <option value="indian">Indian</option>
              <option value="chiness">Chiness</option>
            </select>
          </div>

          {/* Regular Price */}
          <div className="mb-4">
            <label className='block text-gray-700 text-sm sm:text-base'>
              Regular Price
            </label>
            <input
              className='w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-black focus:border-transparent shadow-sm text-xs sm:text-sm'
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="LKR 140.00"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className='block text-gray-700 text-sm sm:text-base'>
              Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {newProduct.image ? (
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="h-32 w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500">
                    Drag your image here, or browse
                    <p className="text-xs mt-1">JPG, PNG allowed</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition-all duration-200"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFood;