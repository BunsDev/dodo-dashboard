import dayjs from "dayjs";
import { timeframeOptions } from "../constants";

export function getTimestampRange(timeframe) {
  const timestamps = [];
  const timestamp = dayjs().startOf("day").unix();
  let periodLength = 3600 * 24;
  let maxTimestamps = 50;

  for (let i = 0; i < maxTimestamps; i++) {
    timestamps.push(timestamp - i * periodLength);
  }

  return timestamps.reverse();
}
