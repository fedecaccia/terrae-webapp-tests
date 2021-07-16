import ArmyShow from "./ArmyShow";
import ArmyOwned from "./ArmyOwned";
import FlipMove from "react-flip-move";
import { useWeb3 } from "../context/Web3";

function ArmyLayout({ tabState, tabNavigatorState, results }) {
  const userWeb3 = useWeb3();
  
  return (
    // <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
    <div className="
      my-10 
      gap-y-10
      w-full justify-self-end
      grid md:grid-cols-2
      lg:grid-cols-3
      2xl:grid-cols-4
      3xl:flex
      overflow-y-auto scrollbar-hide
    ">
      {/* overscroll-contain  */}
     {
      tabState === "train" 
      ? results
      ?.filter(r => ( tabNavigatorState===r.type ))
      ?.map(result => (
        <ArmyShow key={result.id} result={result}/>
      ))
      : 
      results
      ?.filter(r => ( tabNavigatorState===r.type ))
      ?.filter(r => userWeb3.army?.[r.id]> 0).map(result => (
        <ArmyOwned key={result.id} result={result}/>
      ))
     }
    </div>
    // </FlipMove>
  )
}

export default ArmyLayout
