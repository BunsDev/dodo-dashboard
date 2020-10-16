import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PoolDetail from "../../components/PoolDetail";

const PoolDetailPage = () => {
  const router = useRouter();
  const { pool } = router.query;

  return (
    <Layout>
      <PoolDetail pool={pool} />
    </Layout>
  );
};

export default PoolDetailPage;
