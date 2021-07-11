import Switch from "./Switch";
import TokenInput from "./TokenInput";
import { useState, useRef } from "react";
import {
  ChevronDownIcon
} from "@heroicons/react/outline"

function ExchangeWidget() {
  const [isBuying, setBuy] = useState(true);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const bnbBalance = 123123.123123;
  const denarisBalance = 1000;

  const onBuy = () => {
    setBuy(true);
    setFromValue(0);
    setToValue(0);
  };
  const onSell = () => {
    setBuy(false);
    setFromValue(0);
    setToValue(0);
  };
  const setMaxBNB= () => {
    isBuying
    ? setFromValue(bnbBalance)
    : setToValue(bnbBalance)
  }
  const setMaxDENARIS= () => {
    !isBuying
    ? setFromValue(denarisBalance)
    : setToValue(denarisBalance)
  }

  return (
    <div className="flex-grow h-screen 
    pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col
        h-2/3 mx-auto max-w-md md:max-w-lg lg:max-w-2xl mt-20
        rounded-3xl bg-gray-dark
        items-center self-center">

          {/* Exchange buy/sell */}

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


          <div className="flex flex-col items-center my-5 w-full px-10 text-gray-lightest ">

            {/* First token */}

            <TokenInput 
              value={fromValue}
              inputRef={fromInputRef}
              onChangeValue={setFromValue}
              maxBalance={isBuying ? bnbBalance : denarisBalance}
              setMax={isBuying ? setMaxBNB : setMaxDENARIS}
              symbol={isBuying ? "BNB" : "DENARIS"}
              iconSource={isBuying ? "/BNB.png" : "/DENARIS.png"}
              isFrom={true}
            />

            <div className="flex h-10 w-10 my-5">
              <ChevronDownIcon />
            </div>

            {/* Second token */}

            <TokenInput 
              value={toValue}
              inputRef={toInputRef}
              onChangeValue={setToValue}
              maxBalance={!isBuying ? bnbBalance : denarisBalance}
              setMax={!isBuying ? setMaxBNB : setMaxDENARIS}
              symbol={!isBuying ? "BNB" : "DENARIS"}
              iconSource={!isBuying ? "/BNB.png" : "/DENARIS.png"}
              isFrom={false}
            />



            
          </div>
      </div>
    </div>
  )
}

export default ExchangeWidget
