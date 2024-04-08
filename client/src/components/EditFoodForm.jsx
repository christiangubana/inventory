import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AddFoodForm from "./AddFoodForm";

const EditFoodForm = () => {
  const { itemId } = useParams(); // Extract itemId from route parameters
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4000/api/foods/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFoodData(response.data); // Store fetched food item data in state
      } catch (error) {
        console.error("Error fetching food item:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch food item"
        );
        navigate("/dashboard"); // Redirect to dashboard on error
      }
    };

    fetchFoodItem();
  }, [itemId, navigate]);

  const handleUpdate = async (updatedFood) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:4000/api/foods/${itemId}`,
        updatedFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Food item updated successfully", {
        position: "top-center",
      });
      navigate("/dashboard"); // Redirect to dashboard after successful update
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error(
        error.response?.data?.message || "Failed to update food item"
      );
    }
  };

  const handleCancel = () => {
    navigate("/dashboard"); // Redirect to dashboard on cancel
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Edit Food Item
          </h1>
          {foodData && (
            <AddFoodForm
              initialData={foodData} // Pass fetched food item data as initialData
              onUpdate={handleUpdate}
              onCancelEdit={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFoodForm;
