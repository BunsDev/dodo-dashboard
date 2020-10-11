import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import PoolOverview from "./PoolOverview";

export const ALL_POOLS_QUERY = gql`
  query allPools {
    pairs {
      id
      baseToken {
        id
        symbol
        name
      }
      quoteToken {
        id
        symbol
        name
      }
    }
  }
`;

export default function Pools() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POOLS_QUERY
  );

  const { pairs } = data;

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  return (
    <section>
      {pairs.map((pair) => (
        <PoolOverview key={pair.id} id={pair.id} />
      ))}
    </section>
  );
}
