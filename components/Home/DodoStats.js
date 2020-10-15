import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import ErrorMessage from "../ErrorMessage";
import { getPoolQuery } from "../../lib/queries";
import injectBlockTimes from "../injectBlockTimes";
import LiquidityChart from "../LiquidityChart";
import VolumeChart from "../VolumeChart";

const getVolumeData = (data, blockTimes) => {
  const result = [];
  const dataEntries = Object.entries(data);

  for (let i = 1; i < dataEntries.length; i++) {
    const [blockKey, value] = dataEntries[i];
    const previousValue = dataEntries[i - 1][1];
    if (!value || !previousValue) continue;

    const blockTime = blockTimes.find(
      (b) => b.number === blockKey.replace("t", "")
    );
    result.push({
      time: dayjs.unix(blockTime.timestamp).format("YYYY-MM-DD"),
      value: Math.round(
        value.baseToken.tradeVolumeUSD - previousValue.baseToken.tradeVolumeUSD
      ),
    });
  }
  return result;
};

const DodoStats = ({ blockTimes }) => {
  const { loading, error, data } = useQuery(
    getPoolQuery("0x8876819535b48b551c9e97ebc07332c7482b4b2d", blockTimes),
    {
      fetchPolicy: "no-cache",
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const volumeData = getVolumeData(data, blockTimes);

  return (
    <section className="flex space-x-10">
      <div className="bg-white flex-1 rounded-3xl px-8 py-10">
        <LiquidityChart data={volumeData} />
      </div>
      <div className="bg-white flex-1 rounded-3xl px-8 py-10">
        <VolumeChart data={volumeData} />
      </div>
    </section>
  );
};

export default injectBlockTimes(DodoStats);
