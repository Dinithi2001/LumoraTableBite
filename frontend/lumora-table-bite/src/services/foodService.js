import axios from 'axios';

const API_BASE_URL = '/api/v1/foods';

export const foodService = {
  getAllFoods: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw error;
    }
  },

  getFoodById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/food/${id}/food`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching food:', error);
      throw error;
    }
  },

  addFood: async (foodData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, foodData);
      return response.data.data;
    } catch (error) {
      console.error('Error adding food:', error);
      throw error;
    }
  },

  updateFood: async (id, foodData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/food/${id}/update`, foodData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating food:', error);
      throw error;
    }
  },

  deleteFood: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/food/${id}/delete`);
      return response.data;
    } catch (error) {
      console.error('Error deleting food:', error);
      throw error;
    }
  },

  getFoodsByCuisine: async (cuisine) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/food/by-cuisine`, {
        params: { cuisine }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching foods by cuisine:', error);
      throw error;
    }
  },

  getFoodsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/food/${category}/all/foods`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching foods by category:', error);
      throw error;
    }
  },

  getFoodsByCategoryAndCuisine: async (category, cuisine) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/foods/by/category-and-cuisine`, {
        params: { category, cuisine }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching foods by category and cuisine:', error);
      throw error;
    }
  },

  getFoodsByName: async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/foods/${name}/foods`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching foods by name:', error);
      throw error;
    }
  }
}; 