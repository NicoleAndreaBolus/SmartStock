import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const addProduct = (data) => axios.post(`${API_BASE_URL}products/`, data);
export const processSale = (data) => axios.post(`${API_BASE_URL}sales/`, data);
export const getSalesReport = () => axios.get(`${API_BASE_URL}reports/sales/`);