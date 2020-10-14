import Layout from "../components/Layout";
import { ALL_POOLS_QUERY } from "../components/Pools";
import Home from "../components/Home";
import { initializeApollo } from "../lib/apolloClient";

const IndexPage = () => (
  <Layout>
    <Home />
  </Layout>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POOLS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
