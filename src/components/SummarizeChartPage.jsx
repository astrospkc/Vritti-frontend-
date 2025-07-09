import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,

} from "recharts";
import { curveCardinal } from "d3-shape";

const SummarizeChartPage = ({ result }) => {
  let data = [];

  if (result) {
    data = result.emotions.map((val, i) => ({
      emotion: val.emotion,
      rating: val.rating,
    }));
  }

  const data2 = [
    { name: "18-24", uv: 31.47, pv: 2400, fill: "#8884d8" },
    { name: "25-29", uv: 26.69, pv: 4567, fill: "#83a6ed" },
    { name: "30-34", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
    { name: "35-39", uv: 8.22, pv: 9800, fill: "#82ca9d" },
    { name: "40-49", uv: 8.63, pv: 3908, fill: "#a4de6c" },
    { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
    { name: "unknown", uv: 6.67, pv: 4800, fill: "#ffc658" },
  ];

  const cardinal = curveCardinal.tension(0.2);
  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  return (
    <div className="w-full  bg-gray-950 p-6 text-white">
      {/* Summary Box */}
      {result?.summary && (
        <div className="mb-6 bg-gray-900 border border-violet-600 rounded-xl shadow-md p-4">
          <h2 className="text-xl font-semibold text-violet-400 mb-2">
            Summary
          </h2>
          <p className="text-orange-400 font-mono">{result.summary}</p>
        </div>
      )}

      {/* Area Chart */}
      <div className="mb-6 bg-gray-900 rounded-xl border border-emerald-600 shadow-lg p-4">
        <h2 className="text-lg text-emerald-400 font-semibold mb-2">
          Emotion Trends
        </h2>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="emotion" stroke="#c084fc" />
              <YAxis stroke="#c084fc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
              <Area
                type="monotone"
                dataKey="rating"
                stroke="#c084fc"
                fill="#c084fc"
                fillOpacity={0.3}
              />
              <Area
                type={cardinal}
                dataKey="rating"
                stroke="#34d399"
                fill="#34d399"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emotion Ratings Table */}
      {result?.emotions && (
        <div className="mb-6 bg-gray-900 rounded-xl border border-violet-600 shadow-md p-4 overflow-x-auto">
          <h2 className="text-lg text-violet-400 font-semibold mb-2">
            Emotion Ratings
          </h2>
          <table className="min-w-full font-mono text-left">
            <thead>
              <tr className="bg-violet-700 text-white">
                <th className="px-4 py-2">Emotion</th>
                <th className="px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {result.emotions.map((val, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-violet-800/30 transition"
                >
                  <td className="px-4 py-2 text-violet-300 capitalize">
                    {val.emotion}
                  </td>
                  <td className="px-4 py-2 text-emerald-400">{val.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tips + Radial Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tips Card */}
        {result?.tips && (
          <div className="bg-gray-900 border border-orange-400 rounded-xl shadow-md p-4">
            <h2 className="text-xl text-orange-400 font-semibold mb-2">Tips</h2>
            <p className="text-emerald-400 font-mono">{result.tips}</p>
          </div>
        )}
        {/* TODO: This need to be done , radial bar chart */}
        {/* Radial Bar Chart */}
        {/* <div className="bg-gray-900 border border-violet-500 rounded-xl shadow-md p-4">
          <h2 className="text-xl text-violet-400 font-semibold mb-4">
            Radial Bar Chart
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="rating"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              />
              <Pie
                data={data}
                dataKey="rating"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </div> */}
      </div>
    </div>
  );
};

export default SummarizeChartPage;
