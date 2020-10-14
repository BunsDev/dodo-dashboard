import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const VolumeChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart dataKey="volume" data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="volume" fill="#cc0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VolumeChart;
