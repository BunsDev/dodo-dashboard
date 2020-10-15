import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>DODO Dashboard</title>
      </Head>
      <div className="flex w-full h-screen">
        <Navbar />

        <div className="p-12 overflow-auto flex-1">{children}</div>
      </div>
    </>
  );
};

export default Layout;
