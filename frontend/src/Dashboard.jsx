import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import {
  WebsiteBarChart,
  ProductivityPieChart,
} from "./Chart";

function Dashboard({ onLogout }) {

  const websiteData = [
    {
      name: "YouTube",
      time: 4,
    },

    {
      name: "GitHub",
      time: 7,
    },

    {
      name: "Instagram",
      time: 3,
    },

    {
      name: "LeetCode",
      time: 5,
    },
  ];

  const productivityData = [
    {
      name: "Productive",
      value: 70,
    },

    {
      name: "Unproductive",
      value: 20,
    },

    {
      name: "Neutral",
      value: 10,
    },
  ];

  return (
    <div className="flex bg-[#f5f7fb] min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar onLogout={onLogout} />

        <div className="p-6">

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow-lg">

              <p className="text-gray-500 text-sm">
                Total Screen Time
              </p>

              <h2 className="text-3xl font-bold mt-3 text-gray-800">
                8h 24m
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">

              <p className="text-gray-500 text-sm">
                Productive Time
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-600">
                5h 40m
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">

              <p className="text-gray-500 text-sm">
                Unproductive Time
              </p>

              <h2 className="text-3xl font-bold mt-3 text-red-500">
                2h 10m
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">

              <p className="text-gray-500 text-sm">
                Productivity Score
              </p>

              <h2 className="text-3xl font-bold mt-3 text-blue-600">
                82%
              </h2>

            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

            <WebsiteBarChart
              data={websiteData}
            />

            <ProductivityPieChart
              data={productivityData}
            />

          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-semibold text-gray-800">
                Recent Activity
              </h2>

              <button className="text-blue-600 text-sm font-medium">
                View All
              </button>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="text-left text-gray-500 border-b">

                    <th className="pb-4">
                      Website
                    </th>

                    <th className="pb-4">
                      Time
                    </th>

                    <th className="pb-4">
                      Category
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b">

                    <td className="py-4 font-medium">
                      github.com
                    </td>

                    <td className="py-4">
                      2h 15m
                    </td>

                    <td className="py-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Productive
                      </span>
                    </td>

                  </tr>

                  <tr className="border-b">

                    <td className="py-4 font-medium">
                      youtube.com
                    </td>

                    <td className="py-4">
                      1h 20m
                    </td>

                    <td className="py-4">
                      <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-sm">
                        Unproductive
                      </span>
                    </td>

                  </tr>

                  <tr>

                    <td className="py-4 font-medium">
                      leetcode.com
                    </td>

                    <td className="py-4">
                      3h 10m
                    </td>

                    <td className="py-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Productive
                      </span>
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
