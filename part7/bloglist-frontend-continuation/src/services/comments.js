import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async (blogID) => {
  const response = await axios.get(`${baseUrl}/${blogID}/comments`);
  return response.data;
};

const create = async (newObject, blogID) => {
  const response = await axios.post(`${baseUrl}/${blogID}/comments`, newObject);
  return response.data;
};

const exportedMethods = { getAll, create };

export default exportedMethods;
