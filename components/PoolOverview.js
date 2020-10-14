import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import ErrorMessage from "./ErrorMessage";
import { getPoolQuery } from "../lib/queries";
import injectBlockTimes from "./injectBlockTimes";
import VolumeChart from "./VolumeChart";

export const ALL_POSTS_QUERY = gql`
  query poolDetail($id: ID!) {
    pair(id: $id, block: { number: 11006027 }) {
      id
      baseToken {
        symbol
        decimals
        tradeVolumeUSD
        txCount
        totalLiquidity
      }
      quoteToken {
        symbol
        decimals
        txCount
        totalLiquidity
      }
    }
  }
`;

const getVolumeData = (data, blockTimes) => {
  const result = [];
  const dataEntries = Object.entries(data);

  for (let i = 1; i < dataEntries.length; i++) {
    const [blockKey, value] = dataEntries[i];
    const previousValue = dataEntries[i - 1][1];
    if (!value || !previousValue) continue;

    const blockTime = blockTimes.find(
      (b) => b.number === blockKey.replace("t", "")
    );
    result.push({
      name: dayjs.unix(blockTime.timestamp).format("YYYY-MM-DD"),
      volume: Math.round(
        value.baseToken.tradeVolumeUSD - previousValue.baseToken.tradeVolumeUSD
      ),
    });
  }
  return result;
};

const PostList = ({ blockTimes, id }) => {
  const { loading, error, data, networkStatus } = useQuery(
    getPoolQuery(id, blockTimes),
    {
      fetchPolicy: "no-cache",
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const volumeData = getVolumeData(data, blockTimes);

  return (
    <section>
      <VolumeChart data={volumeData} />
    </section>
  );
};

export default injectBlockTimes(PostList);
