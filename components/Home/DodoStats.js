import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import ErrorMessage from "../ErrorMessage";
import { getPoolQuery } from "../../lib/queries";
import injectBlockTimes from "../injectBlockTimes";
import LiquidityChart from "../LiquidityChart";
import VolumeChart from "../VolumeChart";
import Pools from "./Pools";

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

const Card = ({ children }) => (
  <div className="card" style={{ minHeight: "460px" }}>
    {children}
  </div>
);

const DodoStats = ({ blockTimes }) => {
  const { loading, error, data } = useQuery(
    getPoolQuery("0x8876819535b48b551c9e97ebc07332c7482b4b2d", blockTimes),
    {
      fetchPolicy: "no-cache",
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading)
    return (
      <section className="flex space-x-10">
        <Card />
        <Card />
      </section>
    );

  const volumeData = getVolumeData(data, blockTimes);

  return (
    <>
      <section className="flex flex-wrap space-x-10">
        <Card>
          <LiquidityChart data={volumeData} />
        </Card>
        <Card>
          <VolumeChart data={volumeData} />
        </Card>
      </section>

      <h2 className="mb-4">Pools</h2>

      <Card>
        <Pools />
      </Card>
    </>
  );
};

export default injectBlockTimes(DodoStats);
