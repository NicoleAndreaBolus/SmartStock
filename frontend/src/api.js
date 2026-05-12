import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// Lab 07 Endpoints
export const addProduct = (data) => axios.post(`${API_BASE_URL}products/`, data);
export const processSale = (data) => axios.post(`${API_BASE_URL}sales/`, data);
export const getSalesReport = () => axios.get(`${API_BASE_URL}reports/sales/`);

// Inventory Management Endpoints
export const getProducts = () => axios.get(`${API_BASE_URL}products/list/`);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}products/delete/${id}/`);

// Authentication Endpoint
export const loginUser = (data) => axios.post(`${API_BASE_URL}login/`, data);

// Add these to the bottom of your api.js file
export const getUsers = () => axios.get(`${API_BASE_URL}users/list/`);
export const addUser = (data) => axios.post(`${API_BASE_URL}users/add/`, data);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}users/delete/${id}/`);