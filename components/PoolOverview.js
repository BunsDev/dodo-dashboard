import { gql, useQuery, useLazyQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { getTimestampRange } from "../utils";
import { getPoolQuery } from "../lib/queries";
import useBlockTimes from "./hooks/useBlockTimes";

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

export default function PostList({ id }) {
  const timestamps = getTimestampRange();

  const { data: blockTimes, loadingBlockTimes } = useBlockTimes(timestamps);

  const { loading, error, data, networkStatus } = useQuery(
    getPoolQuery(id, blockTimes)
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  console.log(data);

  return <section></section>;
}
