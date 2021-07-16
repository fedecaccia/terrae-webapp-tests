import { useState } from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ArmyHeader from "../components/ArmyHeader";
import PageDescription from "../components/PageDescription";
import ArmyLayout from "../components/ArmyLayout";
import TabNavigator from "../components/TabNavigator";


const Army = ({ results }) => {
  const [tabState, setTab] = useState("train");
  const [tabNavigatorState, setTabNavigatorState] = useState("soldier");

  return(
    <Layout extraClass="bg-army bg-contain h-screen overflow-hidden">
      <Sidebar selected={"ARMY"}/>
      <div className="flex flex-col flex-grow h-screen overflow-y-auto scrollbar-hide md:mx-20">
        <div className="mt-10 mb-20">
          <ArmyHeader tabState={tabState} setTab={setTab}/>
          <div className="flex flex-row items-center justify-between mt-8 mb-20">
            <PageDescription extraClass="flex flex-row items-center justify-between text-gray-dark" description={tabState==="train" ? "ARMY_TRAIN_TAB" : "ARMY_OWNED_TAB"}/>
            <TabNavigator
              options={["soldier", "wizzard", "monster"]}
              onOptions={[()=>setTabNavigatorState("soldier"), ()=>setTabNavigatorState("wizzard"), ()=>setTabNavigatorState("monster")]}
              optionSelected={tabNavigatorState}
            />
          </div>
          <ArmyLayout tabState={tabState} tabNavigatorState={tabNavigatorState} results={results}/>
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
        id: "aman",
        type: "wizzard",
        image: "/heroes/aman.webp",
        power: 30,
        health: 50,
        cost: [
          {
            resource: "ruby",
            amount: 35,
          },
          {
            resource: "esmerald",
            amount: 50,
          },
        ]
      },
      {
        id: "meises",
        type: "soldier",
        image: "/heroes/meises.webp",
        power: 30,
        health: 50,
        cost: [
          {
            resource: "ruby",
            amount: 35,
          },
          {
            resource: "zafir",
            amount: 50,
          },
        ]
      },
      {
        id: "pilos",
        type: "soldier",
        image: "/heroes/pilos.webp",
        power: 30,
        health: 50,
        cost: [
          {
            resource: "gold",
            amount: 35,
          },
          {
            resource: "zafir",
            amount: 50,
          },
        ]
      },
      {
        id: "adenai",
        type: "soldier",
        image: "/heroes/adenai.webp",
        power: 30,
        health: 50,
        cost: [
          {
            resource: "gold",
            amount: 35,
          },
          {
            resource: "esmerald",
            amount: 50,
          },
        ]
      },
    ]
  }

  return {
    props: {
      results: request.results
    }
  }
}

export default Army;
