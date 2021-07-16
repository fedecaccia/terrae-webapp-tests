import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Exchange = () => {

  return(
    <Layout extraClass="bg-alchemy">
      <Sidebar selected={"ALCHEMY"}/>
      {/* Widget */}
    </Layout>
  )
}

export default Exchange;