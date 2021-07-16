import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Army = () => {

  return(
    <Layout extraClass="bg-army">
      <Sidebar selected={"ARMY"}/>
      {/* Widget */}
    </Layout>
  )
}

export default Army;