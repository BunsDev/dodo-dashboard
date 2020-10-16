import dayjs from "dayjs";
import Numeral from "numeral";

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

export const dollarFormatter = (num) => {
  if (num > 1000) {
    return Numeral(num).format("$0,0");
  } else {
    return Numeral(num).format("$0.00a");
  }
};
