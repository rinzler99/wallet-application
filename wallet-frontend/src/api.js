import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = {
  setupWallet: async (username, initialBalance) => {
    try {
      const response = await axios.post(`${BASE_URL}/setup`, {
        balance: initialBalance,
        name: username,
      });
      return response.data;
    } catch (error) {
        alert(error.response.data.error);
      throw error;
    }
  },

  transactWallet: async (walletId, amount, description) => {
    try {
      const response = await axios.post(`${BASE_URL}/transact/${walletId}`, {
        amount,
        description,
      });
      return response.data;
    } catch (error) {
        alert(error.response.data.error);
      throw error;
    }
  },

  fetchTransactions: async (walletId, skip, limit) => {
    try {
      const response = await axios.get(`${BASE_URL}/transactions`, {
        params: { walletId, skip, limit },
      });
      return response.data;
    } catch (error) {
        alert(error.response.data.error);
      throw error;
    }
  },

  getWalletById: async (walletId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${walletId}`);
      return response.data;
    } catch (error) {
        alert(error.response.data.error);
      throw error;
    }
  },
  fetchCurrentBalance: async (walletId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${walletId}`);
      return response.data.data.balance;
    } catch (error) {
        alert(error.response.data.error);
      throw error;
    }
  },
};

export default api;
