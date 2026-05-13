import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Chart colors
const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

// Bar Chart Component
export function WebsiteBarChart({ data }) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-lg font-semibold mb-5 text-gray-800">
        Top Visited Websites
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="time"
            fill="#4F46E5"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

// Pie Chart Component
export function ProductivityPieChart({ data }) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-lg font-semibold mb-5 text-gray-800">
        Productivity Overview
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}
