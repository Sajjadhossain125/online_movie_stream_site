import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/categories', { name });
      setMessage(`Category "${response.data.name}" added successfully!`);
      setName('');
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Error: ${error.response.data.message || 'Category already exists.'}`);
      } else {
        setMessage('Error adding category.');
      }
    }
  };

  return (
    <div className="p-4 bg-gray-100 max-w-md mx-auto mt-10 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default CategoryForm;
