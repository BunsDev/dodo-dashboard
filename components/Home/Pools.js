import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "../ErrorMessage";

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
        totalLiquidity
        tradeVolumeUSD
      }
    }
  }
`;

const Pool = ({ pair }) => (
  <tr>
    <td>
      {pair.baseToken.symbol}-{pair.quoteToken.symbol}
    </td>
    <td>{pair.quoteToken.totalLiquidity}</td>
    <td>{pair.quoteToken.tradeVolumeUSD}</td>
  </tr>
);

export default function Pools() {
  const { loading, error, data } = useQuery(ALL_POOLS_QUERY);

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading…</div>;

  const { pairs } = data;

  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Liquidity</th>
          <th>Volume (24hr)</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((pair) => (
          <Pool key={pair.id} pair={pair} />
        ))}
      </tbody>
    </table>
  );
}
