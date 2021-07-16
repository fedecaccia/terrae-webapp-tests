import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Soon from "../components/Soon";

const Exchange = () => {

  return(
    <Layout extraClass="bg-coffers bg-cover h-screen overflow-hidden">
      <Sidebar selected={"COFFERS"}/>
      {/* Widget */}
      <Soon/>
    </Layout>
  )
}

export default Exchange;