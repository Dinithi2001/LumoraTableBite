import axios from 'axios';

const API_BASE_URL = '/api/v1/customers';

export const customerService = {
  addCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, customerData);
      return response.data.data;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  }
}; 