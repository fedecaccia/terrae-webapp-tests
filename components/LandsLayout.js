import CardShow from "./CardShow";
import CardOwned from "./CardOwned";
import FlipMove from "react-flip-move";

function LandsLayout({ tabState, results }) {
  
  return (
    // <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
    <div className="
      pt-4 my-10
      gap-10
      md:grid md:grid-cols-2
      lg:grid-cols-3
      2xl:grid-cols-4
      3xl:flex 
      flex-wrap justify-center
      overflow-y-auto  scrollbar-hide
    ">
      {/* overscroll-contain  */}
     {results?.map(result => (
       <CardShow key={result.id} result={result}/>
     ))}
    </div>
    // </FlipMove>
  )
}

export default LandsLayout
