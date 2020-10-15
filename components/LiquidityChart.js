import { chartTypes } from "../constants";
import dynamic from "next/dynamic";

const LiquidityChart = ({ data }) => {
  const TradingViewChart = dynamic(() => import("./TradingViewChart"));
  return <TradingViewChart data={data} type={chartTypes.LINE} />;
};

export default LiquidityChart;
