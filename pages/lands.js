import { useState } from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import LandsHeader from "../components/LandsHeader";
import PageDescription from "../components/PageDescription";
import LandsLayout from "../components/LandsLayout";


const Lands = ({ results }) => {
  const [tabState, setTab] = useState("farm");

  return(
    <Layout extraClass="bg-lands bg-cover h-screen overflow-hidden">
      <Sidebar selected={"LANDS"}/>
      <div className="flex flex-col flex-grow h-screen overflow-y-auto scrollbar-hide md:mx-20">
        <div className="mt-10 mb-20">
          <LandsHeader tabState={tabState} setTab={setTab}/>
          <PageDescription extraClass="mt-8 mb-20 text-gray-lightest" description={tabState==="farm" ? "LANDS_FARM_TAB" : "LANDS_OWNED_TAB"}/>
          <LandsLayout tabState={tabState} results={results}/>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const request = await fetch(
  //   `https://api.themoviedb.org/3${
  //     requests[genre]?.url || requests.fetchTrending.url
  //   }`
  // ).then(res => res.json());


  const BLOCKS_PER_HOUR=20*60;
  const TOKEN_DECIMALS=18;
  const weiToEth = amount => (amount/(10**TOKEN_DECIMALS));
  const blockToHourlyYield = blockRate => (weiToEth(blockRate*BLOCKS_PER_HOUR))

  const request = {
    results: [
      {
        id: "Farm Ruby",
        image: "/lands/valley.webp",
        hourlyYield: blockToHourlyYield(4000),
        resource: "TRBY",
        resourceImage: "/resources/ruby.png"
      },
      {
        id: "Farm Gold",
        image: "/lands/forrest.webp",
        hourlyYield: blockToHourlyYield(4000),
        resource: "TGLD",
        resourceImage: "/resources/gold.png"
      },
      {
        id: "Farm Emerald",
        image: "/lands/river.webp",
        hourlyYield: blockToHourlyYield(4000),
        resource: "TEMR",
        resourceImage: "/resources/emerald.png"
      },
      {
        id: "Farm Sapphire",
        image: "/lands/field.webp",
        hourlyYield: blockToHourlyYield(4000),
        resource: "TSPP",
        resourceImage: "/resources/sapphire.png"
      },
    ]
  }

  return {
    props: {
      results: request.results
    }
  }
}

export default Lands;
