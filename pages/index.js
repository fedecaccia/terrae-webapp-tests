import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Home = () => {

  return(
    <Layout extraClass="bg-home">
      <Sidebar selected={"HOME"}/>
      {/* Widget */}
    </Layout>
  )
}

export default Home;