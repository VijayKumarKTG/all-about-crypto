import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.simplehash.com/api/v0/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_SIMPLE_HASH_KEY,
  },
  timeout: 3000,
});
