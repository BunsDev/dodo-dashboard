import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const VolumeChart = ({ data }) => {
  return (
    <BarChart dataKey="volume" data={data} width={800} height={400}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="volume" fill="#cc0" />
    </BarChart>
  );
};

export default VolumeChart;
