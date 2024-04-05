import useAuth from "../hooks/useAuth";

const Dashboard = ({ isLoggedIn, userName }) => {
  // use HOC to precent user from accessing Dashboard from the URL if not loggedIn
  useAuth(isLoggedIn);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Card 1 */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-800">Card 1</h2>
                <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-800">Card 2</h2>
                <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-800">Card 3</h2>
                <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
