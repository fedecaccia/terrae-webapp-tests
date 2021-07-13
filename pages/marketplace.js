import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Exchange = () => {

  return(
    <Layout bgClass="bg-exchange">
      <Sidebar selected={"MARKETPLACE"}/>
      {/* Widget */}
    </Layout>
  )
}

export default Exchange;