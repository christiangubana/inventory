import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AddFoodForm from "./AddFoodForm";

const Dashboard = ({ isLoggedIn }) => {
  useAuth(isLoggedIn);

  const [foods, setFoods] = useState([]);

  const handleAddFood = (food) => {
    setFoods([...foods, food]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <AddFoodForm onAdd={handleAddFood} />
            {foods.map((food) => (
              <div key={food._id} className="bg-white overflow-hidden shadow-md rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{food.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{food.description}</p>
                  {/* <img src={food.image} alt={food.title} className="mt-4" /> */}
                  <img src={food.image.replace(/\\/g, '/')} alt={food.title} className="mt-4" /> 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
