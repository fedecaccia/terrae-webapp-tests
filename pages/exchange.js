import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ExchangeWidget from "../components/ExchangeWidget";

const Exchange = () => {

  return(
    <Layout extraClass="bg-exchange bg-cover h-screen overflow-hidden">
      <Sidebar selected={"EXCHANGE"}/>
      <ExchangeWidget/>
    </Layout>
  )
}

export default Exchange;