import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import AddFoodForm from "./AddFoodForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = ({ isLoggedIn }) => {
  useAuth(isLoggedIn);

  const [foods, setFoods] = useState([]);

  const handleAddFood = (food) => {
    setFoods([...foods, food]);
  };

  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/foods', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        setFoods(data); 
      } catch (error) {
        console.error('Error fetching foods:', error);
        toast.error(error.response.data.message);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{food._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <img
                        src={food.image}
                        alt={food.title}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {food.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.description}</td>
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
          <AddFoodForm onAdd={handleAddFood} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

