// pages/AddProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AddFood = ({ onClose, title, initialData, onSubmit, isEdit = false, onSuccess }) => {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Main',
    cuisine: 'SRI_LANKAN',
    price: ''
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category?.name || 'Main',
        cuisine: initialData.cuisine || 'SRI_LANKAN',
        price: initialData.price?.toString() || ''
      });
    }
  }, [isEdit, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.cuisine || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      let foodId;
      const foodData = {
        ...formData,
        price: parseFloat(formData.price) || 0
      };

      if (isEdit) {
        await onSubmit({ ...foodData, id: initialData.id });
        foodId = initialData.id;
      } else {
        const response = await axios.post(
          '/api/v1/foods/add',
          foodData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Full response:', response);
        console.log('Response data:', response.data);
        
        foodId = response.data.data.id;
        
        if (!foodId) {
          console.error('Food ID is undefined in response:', response.data);
          throw new Error('Failed to get food ID from response');
        }
        
        console.log('Food created with ID:', foodId);
        toast.success('Food added successfully!');
      }

      // Upload images if any are selected
      if (selectedImages.length > 0 && foodId) {
        console.log('Starting image upload with foodId:', foodId);
        const formData = new FormData();
        selectedImages.forEach(file => {
          formData.append('files', file);
        });
        
        console.log('Uploading images for food ID:', foodId);
        
        try {
          await axios.post(`/api/v1/images/upload?foodId=${foodId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          toast.success('Images uploaded successfully!');
        } catch (uploadError) {
          console.error('Image upload error:', uploadError.response?.data);
          toast.error('Failed to upload images');
          throw uploadError;
        }
      }
      
      // Notify parent component of successful addition/update
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      console.error("Error details:", err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to save food');
      console.error("Error saving food:", err);
    }
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
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor='name'>Food Item Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Food Name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor='description' className="block text-gray-700 text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add Description"
              rows="3"
            />
          </div>

          {/* Category */}
          <div>
            <label  htmlFor='category' className="block text-gray-700 text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm cursor-pointer"
              required
            >
              <option value="Main">Main</option>
              <option value="Starter">Starter</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label  htmlFor='cuisine' className="block text-gray-700 text-sm font-medium mb-1">Cuisine</label>
            <select
              name="cuisine"
              value={formData.cuisine}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm cursor-pointer"
              required
            >
              <option value="SRI_LANKAN">SRI_LANKAN</option>
              <option value="INDIAN">INDIAN</option>
              <option value="CHINESE">CHINESE</option>
            </select>
          </div>

          {/* Regular Price */}
          <div>
            <label  htmlFor='price' className="block text-gray-700 text-sm font-medium mb-1">Regular Price</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="LKR 140.00"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                <div className="text-gray-500 text-sm text-center">
                  Click to upload images
                  <p className="text-xs mt-1">Multiple images allowed</p>
                </div>
              </label>
              
              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 py-3 bg-[#4B2E1E] text-white rounded-lg hover:bg-[#3A2316] transition-colors text-base font-medium"
            >
              {isEdit ? 'Update Food' : 'Save Food'}
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