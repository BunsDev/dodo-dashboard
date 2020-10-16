import { chartTypes } from "../constants";
import dynamic from "next/dynamic";

const LiquidityChart = ({ data }) => {
  const TradingViewChart = dynamic(() => import("./TradingViewChart"), {
    ssr: false,
  });
  return (
    <TradingViewChart data={data} label="Liquidity" type={chartTypes.LINE} />
  );
};

export default LiquidityChart;
