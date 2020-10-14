import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Numeral from "numeral";

const dollarFormatter = (num) => {
  return Numeral(num).format("$0.[00]a");
};

const VolumeChart = ({ data }) => {
  return (
    <div>
      <div>123456</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart dataKey="volume" data={data}>
          <CartesianGrid strokeOpacity={0.3} strokeWidth={2} vertical={false} />
          <XAxis dataKey="name" />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={dollarFormatter}
          />
          <Tooltip
            contentStyle={{
              padding: "10px 14px",
              borderRadius: 10,
              borderColor: "black",
              color: "black",
            }}
            wrapperStyle={{ top: -70, left: -10 }}
          />
          <Bar dataKey="volume" fill="#FFE500" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
