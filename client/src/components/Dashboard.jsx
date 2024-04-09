import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  useAuth(token);

  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/api/foods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [token]);

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:4000/api/foods/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(foods.filter((food) => food._id !== foodId));
      toast.success("Food item removed successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (foodId) => {
    navigate(`/edit/${foodId}`);
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.length === 0 ? (
              <p className="text-center text-gray-500">
                There's no item to show. Start adding new items to the list.
              </p>
            ) : (
              foods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-4">
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {food.title}
                    </p>
                    <p className="text-gray-500 mb-4">{food.description}</p>
                    <img
                      alt={food.title}
                      src={`https://source.unsplash.com/300x200/?food,${food.title}`}
                      className="w-full h-48 object-cover mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-sm">
                        Created at {formatDate(food.createdAt)}
                      </p>
                      <div className="flex">
                        <button
                          className="text-gray-500 hover:text-blue-700 mr-2 focus:outline-none bg-gray-100"
                          onClick={() => handleEdit(food._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 focus:outline-none bg-gray-100"
                          onClick={() => handleDelete(food._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
