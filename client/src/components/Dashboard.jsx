import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useAuth(token);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await axios.get("http://localhost:4000/api/foods", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
        toast.error("Failed to fetch foods");
      }
    };

    fetchFoods();
  }, []);

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

  useEffect(() => {
    let newChartInstance = null;

    const prepareChartData = () => {
      const labels = foods.map((food) => food.title);
      const data = foods.map((food) => food.quantity);

      return {
        labels,
        datasets: [
          {
            label: "Inventory Levels",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
        ],
      };
    };

    const options = {
      scales: {
        y: {
          type: "linear",
          beginAtZero: true,
          title: {
            display: true,
            text: "Quantity",
          },
        },
      },
    };

    if (chartRef.current) {
      // Destroy previous chart instance
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      // Render new chart
      newChartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: prepareChartData(),
        options: options,
      });

      // Update chartRef with the new chart instance
      chartRef.current.chartInstance = newChartInstance;
    }

    return () => {
      // Cleanup: Destroy chart instance on component unmount
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [foods]);

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
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    className="w-full h-48 object-cover"
                    alt={food.title}
                    src={`https://source.unsplash.com/300x200/?food,${food.title}`}
                  />
                  <div className="px-4 py-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {food.title}
                    </h2>
                    <p className="text-gray-700">{food.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className={`text-sm font-medium ${
                        food.quantity < 10 ? 'text-red-500 font-bold' : 'text-green-500'
                      }`}>
                        Inventory: {food.quantity} units
                        <span className="ml-2">
                          {food.quantity < 10 ? 'Low Stock' : 'In Stock'}
                        </span>
                      </p>
                      <div className="flex">
                        <button
                          onClick={() => handleEdit(food._id)}
                          className="hover:text-blue-700 focus:outline-none bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(food._id)}
                          className="text-red-500 hover:text-red-700 focus:outline-none bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"

                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Created at {formatDate(food.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chart */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Inventory Levels
            </h2>
            <canvas
              ref={chartRef}
              style={{ maxWidth: "100%", height: "auto" }}
            ></canvas>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={() => navigate("/add")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Add New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
