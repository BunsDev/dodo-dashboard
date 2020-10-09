import { useQuery } from "@apollo/client";
import { getBlockTimesQuery } from "../../lib/queries";
import { blockClient } from "../../lib/apolloClient";

const transformData = (data) => {
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    if (value[0]) {
      result.push({
        timestamp: key.replace("t", ""),
        number: value[0].number,
      });
    }
  }
  return result;
};

const useBlockTimes = (timestamps) => {
  const { data, loading } = useQuery(getBlockTimesQuery(timestamps), {
    client: blockClient,
  });

  return {
    data: data ? transformData(data) : undefined,
    loading,
  };
};

export default useBlockTimes;
