import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Soon from "../components/Soon";

const Exchange = () => {

  return(
    <Layout extraClass="bg-battle bg-cover h-screen overflow-hidden">
      <Sidebar selected={"BATTLE"}/>
      {/* Widget */}
      <Soon/>
    </Layout>
  )
}

export default Exchange;