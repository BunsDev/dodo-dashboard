import { gql } from "@apollo/client";

export const getBlockTimesQuery = (timestamps) => {
  let queryString = "query blocks {";

  queryString += timestamps.map(
    (
      timestamp
    ) => `t${timestamp}:blocks(first: 1, orderBy: timestamp, orderDirection: desc, where: { timestamp_gt: ${timestamp}, timestamp_lt: ${
      timestamp + 600
    } }) {
    number
  }`
  );

  queryString += "}";

  return gql(queryString);
};

export const getPoolQuery = (poolId, blockTimes) => {
  if (!blockTimes) return "";

  let queryString = "query pool {";

  queryString += blockTimes.map(
    (
      blockTime
    ) => `t${blockTime.number}:pair(id: "${poolId}", block: { number: ${blockTime.number}}) {
    id
    volumeBaseToken
  }`
  );

  queryString += "}";
  return gql(queryString);
};
