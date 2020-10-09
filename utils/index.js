import dayjs from "dayjs";
import { timeframeOptions } from "../constants";

export function getTimestampRange(timeframe) {
  const timestamps = [];
  const timestamp = dayjs().startOf("hour").unix();
  let periodLength = 3600;
  let maxTimestamps = 50;

  for (let i = 0; i < maxTimestamps; i++) {
    timestamps.push(timestamp - i * periodLength);
  }

  return timestamps.reverse();
}
