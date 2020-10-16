import { useState } from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { chartTypes } from "../../constants";
import useMarketChartData from "./useMarketChartData";

const getTradingViewData = (data) => {
  return data.map(([timestamp, value]) => ({
    time: dayjs(timestamp).unix(),
    value,
  }));
};

const TokenChart = () => {
  const TradingViewChart = dynamic(() => import("../TradingViewChart"), {
    ssr: false,
  });

  const [marketCapVisible, setMarketCapVisible] = useState(false);
  const marketChartData = useMarketChartData("dodo");

  const handleSwitchMarketCap = (showMarketCap) => {
    setMarketCapVisible(showMarketCap);
  };

  if (!marketChartData) {
    return null;
  }

  const data = getTradingViewData(
    marketCapVisible ? marketChartData.market_caps : marketChartData.prices
  );

  return (
    <>
      <ul className="tabs float-right mt-2">
        <li>
          <button
            className={marketCapVisible ? "btn" : "btn active"}
            onClick={() => handleSwitchMarketCap(false)}
          >
            Price
          </button>
        </li>
        <li>
          <button
            className={marketCapVisible ? "btn active" : "btn"}
            onClick={() => handleSwitchMarketCap(true)}
          >
            Market Cap
          </button>
        </li>
      </ul>

      <TradingViewChart
        data={data}
        label="DODO Token price"
        type={chartTypes.LINE}
      />
    </>
  );
};

export default TokenChart;
