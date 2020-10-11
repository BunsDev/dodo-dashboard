import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { getPoolQuery } from "../lib/queries";
import injectBlockTimes from "./injectBlockTimes";

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

const PostList = ({ blockTimes, id }) => {
  const { loading, error, data, networkStatus } = useQuery(
    getPoolQuery(id, blockTimes)
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  console.log(data);

  return <section></section>;
};

export default injectBlockTimes(PostList);
