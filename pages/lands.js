import { useState } from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import LandsHeader from "../components/LandsHeader";
import PageDescription from "../components/PageDescription";
import LandsLayout from "../components/LandsLayout";


const Lands = ({ results }) => {
  const [tabState, setTab] = useState("farm");

  return(
    <Layout extraClass="bg-lands bg-contain h-screen overflow-hidden">
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

  const request = {
    results: [
      {
        id: "valley1",
        image: "/lands/valley.png",
        hourlyYield: 4,
        resource: "ruby"
      },
      {
        id: "forrest1",
        image: "/lands/forrest.png",
        hourlyYield: 3,
        resource: "gold"
      },
      {
        id: "river1",
        image: "/lands/river.png",
        hourlyYield: 2,
        resource: "esmerald"
      },
      {
        id: "field1",
        image: "/lands/field.png",
        hourlyYield: 3,
        resource: "zafir"
      },
      {
        id: "valley2",
        image: "/lands/valley.png",
        hourlyYield: 4,
        resource: "ruby"
      },
      {
        id: "forrest2",
        image: "/lands/forrest.png",
        hourlyYield: 3,
        resource: "gold"
      },
      {
        id: "river2",
        image: "/lands/river.png",
        hourlyYield: 2,
        resource: "esmerald"
      },
      {
        id: "field2",
        image: "/lands/field.png",
        hourlyYield: 3,
        resource: "zafir"
      },
      {
        id: "valley3",
        image: "/lands/valley.png",
        hourlyYield: 4,
        resource: "ruby"
      },
      {
        id: "forrest3",
        image: "/lands/forrest.png",
        hourlyYield: 3,
        resource: "gold"
      },
      {
        id: "river3",
        image: "/lands/river.png",
        hourlyYield: 2,
        resource: "esmerald"
      },
      {
        id: "field3",
        image: "/lands/field.png",
        hourlyYield: 3,
        resource: "zafir"
      },
      {
        id: "valley4",
        image: "/lands/valley.png",
        hourlyYield: 4,
        resource: "ruby"
      },
      {
        id: "forrest4",
        image: "/lands/forrest.png",
        hourlyYield: 3,
        resource: "gold"
      },
      {
        id: "river4",
        image: "/lands/river.png",
        hourlyYield: 2,
        resource: "esmerald"
      },
      {
        id: "field4",
        image: "/lands/field.png",
        hourlyYield: 3,
        resource: "zafir"
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
