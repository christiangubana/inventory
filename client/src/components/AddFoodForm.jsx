import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFoodForm = ({ initialData, onUpdate, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || null,
  });

  const isUpdating = !!initialData; // Determine if we are updating an existing item
  const navigate = useNavigate(); // Initialize navigate function from react-router-dom

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Update image field with the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (isUpdating) {
        // Update existing food item
        const response = await axios.put(
          `http://localhost:4000/api/foods/${initialData._id}`,
          formData,
          config
        );
        onUpdate(response.data.food);
        toast.success("Food item updated successfully", {
          position: "top-center",
        });
      } else {
        // Add new food item
        await axios.post(`http://localhost:4000/api/foods`, formData, config);
        toast.success("Food item added successfully", {
          position: "top-center",
        });
      }

      // Redirect to dashboard after successful addition
      navigate("/dashboard");
      
      // Reset form data after successful submission
      setFormData({
        title: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error(error.message || "Failed to update food item.");
    }
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Food title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Food item title"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Food Description
        </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Food description"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Food Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {initialData ? "Update Food Item" : "Add Food Item"}
        </button>
        {initialData && (
          <button
            type="submit"
            onClick={handleCancel}
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
