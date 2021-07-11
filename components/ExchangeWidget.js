import Switch from "./Switch";
import { useState } from "react";

function ExchangeWidget() {
  const [isBuying, setBuy] = useState(true);

  const onBuy = () => {
    setBuy(true);
  };
  const onSell = () => {
    setBuy(false);
  };

  return (
    <div className="flex-grow h-screen 
    pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col
        h-2/3 mx-auto max-w-md md:max-w-lg lg:max-w-2xl mt-20
        rounded-3xl bg-gray-dark
        items-center self-center">

          <div className="flex flex-row w-full justify-between border-b-2 border-gray-border">
            
            <div className="flex flex-col text-left pl-10 pt-5 pb-5">
              <p className="mediumText text-gray-lightest">Exchange</p>
              <p className="baseText text-gray-lightest">Buy/sell Denaris in an instant</p>
            </div>

            <div className="flex items-center pr-10">
              <Switch 
                option1={"Buy"}
                onOption1={onBuy}
                option2={"Sell"}
                onOption2={onSell}
                option1Selected={isBuying}
              />        
            </div>

          </div>

          <div>

          </div>
          
          <div></div>
      </div>
    </div>
  )
}

export default ExchangeWidget
