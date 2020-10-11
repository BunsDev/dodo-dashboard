import { getTimestampRange } from "../utils";
import useBlockTimes from "./hooks/useBlockTimes";

const injectBlockTimes = (WrappedComponent) => {
  return (props) => {
    const timestamps = getTimestampRange();

    const { data, loading } = useBlockTimes(timestamps);

    if (loading) return null;

    return <WrappedComponent {...props} blockTimes={data} />;
  };
};

export default injectBlockTimes;
