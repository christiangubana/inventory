// AddFoodForm.jsx
import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFoodForm = ({ onAdd, initialData, onUpdate, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        image: null, // Image is not editable for now
      });
    }
  }, [initialData]);

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
    const token = localStorage.getItem("token"); 

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (initialData) {
        // Update existing food item
        const response = await axios.put(`http://localhost:4000/api/foods/${initialData._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        onUpdate(response.data); // Pass updated food item to parent component
        toast.success('Food item updated successfully', {
          position: 'top-center',
        });
      } else {
        // Add new food item
        const response = await axios.post('http://localhost:4000/api/foods', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        onAdd(response.data.food);
        toast.success(response.data.message, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error adding/updating food item:', error);
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
      <div className="mt-4">
        <button
          type="submit"
          className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? 'Update Food Item' : 'Add Food Item'}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="ml-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddFoodForm;
