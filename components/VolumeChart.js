import { chartTypes } from "../constants";
import dynamic from "next/dynamic";

const VolumeChart = ({ data }) => {
  const TradingViewChart = dynamic(() => import("./TradingViewChart"));

  return (
    <TradingViewChart data={data} label="Volume (24hr)" type={chartTypes.BAR} />
  );
};

export default VolumeChart;
