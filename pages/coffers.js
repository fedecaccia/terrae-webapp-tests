import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Exchange = () => {

  return(
    <Layout extraClass="bg-coffers">
      <Sidebar selected={"COFFERS"}/>
      {/* Widget */}
    </Layout>
  )
}

export default Exchange;