import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import {
  WebsiteBarChart,
  ProductivityPieChart,
} from "./Chart";

function Analytics({ onLogout }) {

  const [selected, setSelected] = useState("All");

  const websiteData = [
    {
      name: "GitHub",
      time: 7,
      category: "Productive",
    },

    {
      name: "YouTube",
      time: 4,
      category: "Unproductive",
    },

    {
      name: "Instagram",
      time: 3,
      category: "Unproductive",
    },

    {
      name: "LeetCode",
      time: 5,
      category: "Productive",
    },

    {
      name: "StackOverflow",
      time: 2,
      category: "Productive",
    },
  ];

  const pieData = [
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

  // Filter data based on category
  const filteredData =
    selected === "All"
      ? websiteData
      : websiteData.filter(
          (item) => item.category === selected
        );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar
          onLogout={onLogout}
          pageTitle="Analytics"
        />

        <div className="p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                Analytics
              </h1>

              <p className="text-gray-500 mt-1">
                Detailed productivity insights
              </p>

            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 flex-wrap">

              {[
                "All",
                "Productive",
                "Unproductive",
                "Neutral",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => setSelected(item)}
                  className={`px-5 py-2 rounded-xl transition ${
                    selected === item
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white p-6 rounded-2xl shadow">

              <p className="text-gray-500 text-sm">
                Weekly Screen Time
              </p>

              <h2 className="text-3xl font-bold mt-3 text-gray-800">
                42h 15m
              </h2>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow">

              <p className="text-gray-500 text-sm">
                Productivity Rate
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-600">
                82%
              </h2>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow">

              <p className="text-gray-500 text-sm">
                Most Used Website
              </p>

              <h2 className="text-3xl font-bold mt-3 text-blue-600">
                GitHub
              </h2>

            </div>

          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <WebsiteBarChart data={filteredData} />

            <ProductivityPieChart data={pieData} />

          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow p-6 mt-8">

            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Website Usage Details
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b text-gray-500 text-left">

                    <th className="pb-4">
                      Website
                    </th>

                    <th className="pb-4">
                      Hours
                    </th>

                    <th className="pb-4">
                      Category
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredData.map((item, index) => (

                    <tr
                      key={index}
                      className="border-b"
                    >

                      <td className="py-4 font-medium">
                        {item.name}
                      </td>

                      <td className="py-4">
                        {item.time} hrs
                      </td>

                      <td className="py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.category === "Productive"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {item.category}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;
