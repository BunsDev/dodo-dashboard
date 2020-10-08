import { gql, useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

export const ALL_POSTS_QUERY = gql`
  query poolDetail($id: ID!) {
    pair(id: $id) {
      id
      baseToken {
        id
        symbol
        name
        decimals
        totalSupply
        tradeVolume
        tradeVolumeUSD
        txCount
        totalLiquidity
      }
      quoteToken {
        id
        symbol
        name
        decimals
        totalSupply
        tradeVolume
        tradeVolumeUSD
        txCount
        totalLiquidity
      }
      midPrice
      volumeBaseToken
      volumeQuoteToken
      txCount
      createdAtTimestamp
      createdAtBlockNumber
    }
  }
`;

export default function PostList({ id }) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      variables: { id },
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const { pair } = data;

  return (
    <section>
      {pair.baseToken.symbol}-{pair.quoteToken.symbol}
    </section>
  );
}
