import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const update = async (newAnecdoteObject) => {
  const response = await axios.put(
    `${baseUrl}/${newAnecdoteObject.id}`,
    newAnecdoteObject
  );
  return response.data;
};

const exportedMethods = { getAll, createNew, update };

export default exportedMethods;
