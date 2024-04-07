import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AddFoodForm from "./AddFoodForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Dashboard = ({ isLoggedIn }) => {
  useAuth(isLoggedIn);

  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const [isLoading, setIsLoading] = useState(false);

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/foods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(response.data); 
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [token, setFoods]);

  const handleAddFood = (food) => {
    setFoods([...foods, food]);
  };

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:4000/api/foods/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(foods.filter((food) => food._id !== foodId));
      toast.success("Food item deleted successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (foodId) => {
    const foodToEdit = foods.find((food) => food._id === foodId);
    if (foodToEdit) {
      setEditingFood(foodToEdit);
    } else {
      toast.error("Food item not found for editing");
    }
  };

  const handleUpdateFood = async (updatedFood) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:4000/api/foods/${updatedFood._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedFoods = foods.map((food) =>
        food._id === updatedFood._id ? response.data.food : food
      );
      setFoods(updatedFoods);
      toast.success("Food item updated successfully", {
        position: "top-center",
      });
      window.location.reload();
      setEditingFood(null); // Clear editing state
    } catch (error) {
      console.error("Error updating food item:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingFood(null); // Clear editing state
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {food._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <img
                          src={food.image}
                          alt={food.title}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {food.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {food.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {food.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEdit(food._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 ml-2"
                          onClick={() => handleDelete(food._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {editingFood && (
            <AddFoodForm
              onAdd={handleAddFood}
              initialData={editingFood}
              onUpdate={handleUpdateFood}
              onCancelEdit={handleCancelEdit}
            />
          )}
          {!editingFood && <AddFoodForm onAdd={handleAddFood} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
