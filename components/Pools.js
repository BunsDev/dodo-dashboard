import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import PoolOverview from "./PoolOverview";

export const ALL_POOLS_QUERY = gql`
  query allPools {
    pairs {
      id
      baseToken {
        symbol
        name
      }
      quoteToken {
        symbol
        name
      }
    }
  }
`;

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POOLS_QUERY
  );

  const { pairs } = data;

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  return (
    <section>
      {pairs.map((pair) => (
        <PoolOverview id={pair.id} />
      ))}
    </section>
  );
}
