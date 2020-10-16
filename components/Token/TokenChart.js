import dayjs from "dayjs";
import { chartTypes } from "../../constants";
import useMarketChartData from "./useMarketChartData";
import TradingViewChart from "../TradingViewChart";

const getTradingViewData = (data) => {
  return data.map(([timestamp, value]) => ({
    time: dayjs(timestamp).unix(),
    value,
  }));
};

const TokenChart = () => {
  const marketChartData = useMarketChartData("dodo");

  if (!marketChartData) {
    return null;
  }

  const data = getTradingViewData(marketChartData.prices);
  console.log(dayjs(data[0].time));

  return (
    <TradingViewChart
      data={data}
      label="DODO Token price"
      type={chartTypes.LINE}
    />
  );
};

export default TokenChart;
