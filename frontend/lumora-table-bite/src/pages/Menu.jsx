// pages/Menu.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Edit2, Trash2, X } from 'lucide-react';
import Header from '../components/Header';
import AddCategoryModel from './AddCategoryModel';
import AddFood from './AddFood';

const initialMenuItems = [
  {
    id: '67869052',
    name: 'Chicken Popeyes',
    category: 'Main',
    cuisine: 'Sri Lankan',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=300'
  },
  {
    id: '68970163',
    name: 'Bison Burgers',
    category: 'Starter',
    cuisine: 'Sri Lankan',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300'
  },
  {
    id: '66758941',
    name: 'Grill Sandwich',
    category: 'Main',
    cuisine: 'Indian',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300'
  }
];

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems] = useState(initialMenuItems);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isAddFoodModalOpen,setAddFoodModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleCloseAddFoodModal = () => {
    setAddFoodModalOpen(false);
  };

  const handleAddProduct = () => {
    setAddFoodModalOpen(true);
  };

  const handleEditItem = (id) => console.log('Edit item with id:', id);
  const handleDeleteItem = (id) => console.log('Delete item with id:', id);

  return (
    <div className="min-h-screen bg-[#FFFBF0] p-2">
      <Header name={"Home"} onclick={()=>navigate('/')}/>
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Menu Management</h1>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={handleAddCategory}
              className="flex-1 sm:flex-none bg-[#4B2E1E] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-700 transition-all duration-200 shadow-md"
            >
              <PlusCircle size={20} />
              <span>Add Category</span>
            </button>
            <button
              onClick={handleAddProduct}
              className="flex-1 sm:flex-none bg-[#4B2E1E] text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-700 transition-all duration-200 shadow-md"
            >
              <PlusCircle size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by name, cuisine, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Table Section */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Food Item</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cuisine</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-14 w-14 rounded-lg object-cover shadow-sm"
                            src={item.image}
                            alt={item.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.category === 'Main'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.cuisine}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleEditItem(item.id)}
                            className="text-green-600 hover:text-green-800 transition-colors duration-200"
                            aria-label="Edit item"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                            aria-label="Delete item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {isCategoryModalOpen && (
        <AddCategoryModel
          onClose={handleCloseModal}
          title="Add Category"
        />
      )}
       {isAddFoodModalOpen && (
        <AddFood
          onClose={handleCloseAddFoodModal}
          title="Add Food"
        />
      )}
    </div>
  );
  
};

export default Menu;