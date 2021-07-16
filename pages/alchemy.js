import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";
import Soon from "../components/Soon";

const Exchange = () => {

  return(
    <Layout extraClass="bg-alchemy bg-cover h-screen overflow-hidden">
      <Sidebar selected={"ALCHEMY"}/>
      {/* Widget */}
      <Soon/>
    </Layout>
  )
}

export default Exchange;