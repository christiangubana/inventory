import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AddFoodForm from "./AddFoodForm";

const EditFoodForm = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
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
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food item:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch food item"
        );
        navigate("/dashboard");
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
            "Content-Type": "application/json", // Specify Content-Type as JSON
          },
        }
      );
      toast.success("Food item updated successfully", {
        position: "top-center",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error(
        error.response?.data?.message || "Failed to update food item"
      );
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {foodData && (
            <AddFoodForm
              initialData={foodData}
              onUpdate={handleUpdate}
              onCancelEdit={handleCancel}
              mode="edit" // Pass the mode prop as "edit"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditFoodForm;
