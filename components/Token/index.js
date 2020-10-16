import dynamic from "next/dynamic";

const Token = () => {
  const TokenChart = dynamic(() => import("./TokenChart"));

  return (
    <>
      <header className="mb-8">
        <h1>DODO Token</h1>
      </header>

      <div className="card">
        <TokenChart />
      </div>
    </>
  );
};

export default Token;
