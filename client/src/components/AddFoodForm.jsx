// AddFoodForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFoodForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:4000/api/foods', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      onAdd(response.data.food);
      toast.success(response.data.message, {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error adding food item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >Add Food Item</button>
    </form>
  );
};

export default AddFoodForm;
