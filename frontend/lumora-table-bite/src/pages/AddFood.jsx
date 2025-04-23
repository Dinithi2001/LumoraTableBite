// pages/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const AddFood = ({ onClose, title }) => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'Main',
    cuisine: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Product:', newProduct);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-center z-40"
      id="wrapper"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-4 bg-[#4B2E1E] rounded-t-2xl">
          <span className="text-xl text-white">{title}</span>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-auto">
          {/* Food Item Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Food Item Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Food Name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Add Description"
              rows="3"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm cursor-pointer"
            >
              <option value="Main">Main</option>
              <option value="Starter">Starter</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Cuisine</label>
            <select
              name="cuisine"
              value={newProduct.cuisine}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm cursor-pointer"
            >
              <option value="srilankan">Sri Lankan</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>

          {/* Regular Price */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Regular Price</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="LKR 140.00"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {newProduct.image ? (
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="h-32 w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">
                    Drag your image here, or browse
                    <p className="text-xs mt-1">JPG, PNG allowed</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 py-3 bg-[#4B2E1E] text-white rounded-lg hover:bg-[#3A2316] transition-colors text-base font-medium"
            >
              Save Food
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/2 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-base font-medium"
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