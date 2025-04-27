// pages/Menu.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, Edit2, Trash2, X } from 'lucide-react';
import Header from '../components/Header';
import AddFood from './AddFood';
import { foodService } from '../services/foodService';
import { toast } from 'react-hot-toast';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [isAddFoodModalOpen, setAddFoodModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const foods = await foodService.getAllFoods();
      setMenuItems(foods);
      setError(null);
    } catch (err) {
      console.error('Error fetching foods:', err);
      setError('Failed to load menu items. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const filteredItems = menuItems.filter(item => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase().trim();
    const nameLower = item.name?.toLowerCase() || '';
    const descriptionLower = item.description?.toLowerCase() || '';
    const cuisineLower = item.cuisine?.toLowerCase() || '';
    const categoryLower = item.category?.name?.toLowerCase() || '';

    return (
      nameLower.includes(searchLower) ||
      descriptionLower.includes(searchLower) ||
      cuisineLower.includes(searchLower) ||
      categoryLower.includes(searchLower)
    );
  });

  const handleCloseAddFoodModal = () => {
    setAddFoodModalOpen(false);
  };

  const handleAddProduct = () => {
    setAddFoodModalOpen(true);
  };

  const handleEditItem = async (id) => {
    try {
      const food = await foodService.getFoodById(id);
      setSelectedFood(food);
      setIsEditModalOpen(true);
    } catch (error) {
      toast.error('Failed to fetch food details');
      console.error('Error fetching food details:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await foodService.deleteFood(id);
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
        toast.success('Food item deleted successfully');
      } catch (error) {
        toast.error('Failed to delete food item');
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleUpdateFood = async (updatedFood) => {
    try {
      const updated = await foodService.updateFood(updatedFood.id, updatedFood);
      setMenuItems(prevItems =>
        prevItems.map(item => item.id === updated.id ? updated : item)
      );
      setIsEditModalOpen(false);
      setSelectedFood(null);
      toast.success('Food item updated successfully');
    } catch (error) {
      toast.error('Failed to update food item');
      console.error('Error updating food:', error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedFood(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] p-2">
        <Header name={"Home"} onclick={() => navigate('/')} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading menu items...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBF0] p-2">
        <Header name={"Home"} onclick={() => navigate('/')} />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF0] p-2">
      <Header name={"Home"} onclick={() => navigate('/')} />
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Menu Management</h1>
          <div className="flex space-x-3 w-full sm:w-auto">
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
                          {item.images && item.images.length > 0 ? (
                            <img
                              className="h-14 w-14 rounded-lg object-cover shadow-sm"
                              src={`http://localhost:8095${item.images[0].downloadUrl}`}
                              alt={item.name}
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                              }}
                            />
                          ) : (
                            <div className="h-14 w-14 rounded-lg bg-gray-100 flex items-center justify-center">
                              <span className="text-xs text-gray-500">No Image</span>
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            {item.description && (
                              <div className="text-xs text-gray-500">{item.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            item.category?.name === 'Main'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {item.category?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.cuisine || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        LKR.{item.price.toFixed(2)}
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
      {isAddFoodModalOpen && (
        <AddFood
          onClose={handleCloseAddFoodModal}
          title="Add Food"
          onSuccess={fetchFoods}
        />
      )}
      {isEditModalOpen && selectedFood && (
        <AddFood
          onClose={handleCloseEditModal}
          title="Edit Food"
          initialData={selectedFood}
          onSubmit={handleUpdateFood}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default Menu;