import Switch from "./Switch";
import TokenInput from "./TokenInput";
import TerraeButton from "./TerraeButton";
import { useState, useRef } from "react";
import {
  ChevronDownIcon
} from "@heroicons/react/outline"

function ExchangeWidget({ bnbBalance }) {
  const [isBuying, setBuy] = useState(true);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [enoughFrom, setEnoughFrom] = useState(true);
  
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const denarisBalance = 1000;

  const maxPrecision = 8;

  const denarisPrice=0.01;

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

  const precision = (a) => {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) { e *= 10; p++; }
    return p;
  }

  const setMaxBNB= () => {
    setBNB(bnbBalance);
  }
  const setMaxDENARIS= () => {
    setDENARIS(denarisBalance);
  }

  const setBNB = (value) => {
    value = parseFloat(value);
    precision(value) > maxPrecision && (value = value.toFixed(maxPrecision));

    isBuying
    ? setFromValue(value)
    : setToValue(value);

    isBuying
    ? setToValue((value*denarisPrice).toFixed(maxPrecision))
    : setFromValue((value/denarisPrice).toFixed(maxPrecision));

    isBuying
    ? (value>bnbBalance ? setEnoughFrom(false) : setEnoughFrom(true))
    : (value/denarisPrice>denarisBalance ? setEnoughFrom(false) : setEnoughFrom(true))
  };
  const setDENARIS = (value) => {
    value = parseFloat(value);
    precision(value) > maxPrecision && (value = value.toFixed(maxPrecision));

    !isBuying
    ? setFromValue(value)
    : setToValue(value);

    !isBuying
    ? setToValue((value*denarisPrice).toFixed(maxPrecision))
    : setFromValue((value/denarisPrice).toFixed(maxPrecision));

    !isBuying
    ? (value>denarisBalance ? setEnoughFrom(false) : setEnoughFrom(true))
    : (value/denarisPrice>bnbBalance ? setEnoughFrom(false) : setEnoughFrom(true));
  };

  const trade = () => {

  }

  return (
    <div className="flex-grow h-screen 
    md:pb-44 pt-6 md:mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      
      <div className="flex flex-col
        w-full h-full pt-7 pb-6
        md:mx-auto md:max-w-lg md:mt-20 md:h-auto
        md:rounded-3xl 
        bg-gray-dark
        items-center self-center">

          {/* Exchange buy/sell */}

          <div className="flex flex-row w-full justify-between border-b-2 border-gray-border">
            
            <div className="flex flex-col text-left pl-10 pb-5">
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
              onChangeValue={isBuying ? setBNB : setDENARIS}
              maxBalance={isBuying ? bnbBalance : denarisBalance}
              setMax={isBuying ? setMaxBNB : setMaxDENARIS}
              symbol={isBuying ? "BNB" : "DENARIS"}
              iconSource={isBuying ? "/BNB.png" : "/DENARIS.png"}
              isFrom={true}
            />

            {
            !enoughFrom
            ? <div className="flex flex-row w-full text-left">
              <p className="smallText text-red-400">
                Not enough balance
              </p>
            </div>
            : <div className="flex flex-row w-full text-left">
              <p className="smallText text-transparent">
                dummy text
              </p>
            </div>
            }

            <div className="flex h-10 w-10 mb-5 mt-1">
              <ChevronDownIcon />
            </div>

            {/* Second token */}

            <TokenInput 
              value={toValue}
              inputRef={toInputRef}
              onChangeValue={!isBuying ? setBNB : setDENARIS}
              maxBalance={!isBuying ? bnbBalance : denarisBalance}
              setMax={!isBuying ? setMaxBNB : setMaxDENARIS}
              symbol={!isBuying ? "BNB" : "DENARIS"}
              iconSource={!isBuying ? "/BNB.png" : "/DENARIS.png"}
              isFrom={false}
            />

            {/* Price */}
            <div className="flex my-3 flex-row justify-between w-full text-left">
              <p className="baseText text-iris">
                price
              </p>
              <p className="baseText text-gray-lightest">
                {denarisPrice} BNB per DENARIS
              </p>
            </div>

            {/* Action button */}
            <TerraeButton
              extraClass={`flex flex-row w-full mt-2 ${enoughFrom && fromValue>0 && "hover:scale-105"}`}
              isPrimary
              text={isBuying ? "BUY" : "SELL"}
              enabled={enoughFrom && fromValue>0 ? true : false}
              onClick={trade}
            />

          </div>
      </div>
    </div>
  )
}

export default ExchangeWidget
