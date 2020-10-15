import Layout from "../components/Layout";
import Home from "../components/Home";
import { initializeApollo } from "../lib/apolloClient";

const IndexPage = () => (
  <Layout>
    <Home />
  </Layout>
);

export default IndexPage;
