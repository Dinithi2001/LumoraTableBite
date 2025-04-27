import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { toast } from 'react-hot-toast';

const AddTableModal = ({ onClose, title = 'Add New Table', initialData, onSubmit, isEdit = false, onSuccess }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    number: '',
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        number: initialData.number || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.number) {
      toast.error("Please enter a table name");
      return;
    }

    try {
      if (isEdit) {
        await onSubmit({ ...formData, id: initialData.id });
      } else {
        await onSubmit(formData);
      }
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (err) {
      console.error("Error saving table:", err);
      toast.error(err.response?.data?.message || 'Failed to save table');
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
          {/* Table Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor='number'>Table Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4B2E1E] focus:border-transparent text-sm"
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="Enter table name"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#4B2E1E] rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4B2E1E]"
            >
              {isEdit ? 'Update Table' : 'Add Table'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTableModal; 