import { gql, useQuery } from "@apollo/client";
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
  for (const [blockKey, value] of Object.entries(data)) {
    if (!value) continue;
    const blockTime = blockTimes.find(
      (b) => b.number === blockKey.replace("t", "")
    );
    result.push({
      name: blockTime.timestamp,
      volume: value.baseToken.tradeVolumeUSD,
    });
  }
  return result;
};

const PostList = ({ blockTimes, id }) => {
  const { loading, error, data, networkStatus } = useQuery(
    getPoolQuery(id, blockTimes)
  );

  console.log("Hier", data);

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
