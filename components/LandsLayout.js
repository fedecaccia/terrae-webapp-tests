import LandShow from "./LandShow";
import LandOwned from "./LandOwned";
import FlipMove from "react-flip-move";
import { useWeb3 } from "../context/Web3";

function LandsLayout({ tabState, results }) {
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
      tabState === "farm" 
      ? results?.map(result => (
        <LandShow key={result.id} result={result}/>
      ))
      : 
      results?.filter(r => userWeb3.deposited?.[r.id]> 0).map(result => (
        <LandOwned key={result.id} result={result}/>
      ))
     }
    </div>
    // </FlipMove>
  )
}

export default LandsLayout
