import { useEffect, useState } from "react";

const fetchMarketChartData = async (id) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
  );
  return await res.json();
};

const useTokenPrice = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchMarketChartData(id);
      setData(res);
    };
    getData();
  }, []);

  return data;
};

export default useTokenPrice;
