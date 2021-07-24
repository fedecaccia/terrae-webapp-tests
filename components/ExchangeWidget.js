import Switch from "./Switch";
import TokenInput from "./TokenInput";
import TerraeButton from "./TerraeButton";
import { useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import { swapExactETHForTokens, swapExactTokensForETH, updateDenarisPrice } from "../web3/exchange";
import updateWeb3UserInfo from "../web3/balances";
import { useToasts } from "react-toast-notifications";


const ExchangeWidget = () => {
  const [isBuying, setBuy] = useState(true);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [enoughFrom, setEnoughFrom] = useState(true);

  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const bnbBalance = userWeb3.balances.bnb;
  const denarisBalance = userWeb3.balances.tden;
  
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const maxPrecision=6;
  
  const { addToast } = useToasts();
  
  const toHumanFormat = (value, decimals) => {
    return (value/(10**decimals)).toFixed(maxPrecision);
  }
  
  const denarisPrice=userWeb3.denarisPrice;

  const bnbHumanBalance = toHumanFormat(bnbBalance, userWeb3.decimals.bnb);
  const denarisHumanBalance = toHumanFormat(denarisBalance, userWeb3.decimals.tden);

  const onBuy = () => {
    setBuy(true);
    setFromValue(0);
    setToValue(0);
    setEnoughFrom(true);
  };
  const onSell = () => {
    setBuy(false);
    setFromValue(0);
    setToValue(0);
    setEnoughFrom(true);
  };

  const getPrecision = (a) => {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) { e *= 10; p++; }
    return p;
  }

  const setMaxBNB= () => {
    setBNB(bnbHumanBalance);
  }
  const setMaxDENARIS= () => {
    setDENARIS(denarisHumanBalance);
  }

  const setBNB = (value) => {
    value = parseFloat(value);
    getPrecision(value) > maxPrecision && (value = value.toFixed(maxPrecision));

    isBuying
    ? setFromValue(value)
    : setToValue(value);

    isBuying
    ? setToValue((value/denarisPrice).toFixed(maxPrecision))
    : setFromValue((value/denarisPrice).toFixed(maxPrecision));

    isBuying
    ? (value>bnbHumanBalance ? setEnoughFrom(false) : setEnoughFrom(true))
    : (value/denarisPrice>denarisHumanBalance ? setEnoughFrom(false) : setEnoughFrom(true))
  };
  const setDENARIS = (value) => {
    value = parseFloat(value);
    getPrecision(value) > maxPrecision && (value = value.toFixed(maxPrecision));

    !isBuying
    ? setFromValue(value)
    : setToValue(value);

    !isBuying
    ? setToValue((value*denarisPrice).toFixed(maxPrecision))
    : setFromValue((value*denarisPrice).toFixed(maxPrecision));

    !isBuying
    ? (value>denarisHumanBalance ? setEnoughFrom(false) : setEnoughFrom(true))
    : (value*denarisPrice>bnbHumanBalance ? setEnoughFrom(false) : setEnoughFrom(true));
  };

  const swap = async () => {

    const options = {
      from: userWeb3.address,
    }
    let operation;
    
    if (isBuying){
      
      operation = swapExactETHForTokens;
      options.swapExactETHForTokens = {
        amountETH: fromValue,
        amountOutMin: 0,//parseInt(toValue*0.99),
        deadline: Date.now() + 60*1000*60*24, // 1 day
      }
    } else {
      operation = swapExactTokensForETH;
      options.swapExactTokensForETH = {
        amountToken: fromValue,
        amountETHMin: 0,//toValue*0.99,
        deadline: Date.now() + 60*1000*60*24, // 1 day
      }
    }
    
    try{
      setFromValue(0);
      addToast("Processing... please wait", { appearance: "info", autoDismissTimeout: "30000" });
      let receipt = await operation(userWeb3, dispatch, options);
      addToast(`Success swap!`, { appearance: "success" });
      // addToast(`Success swap! Transaction hash: ${receipt.transactionHash}`, { appearance: "success" });
      await updateWeb3UserInfo(dispatch);
      await updateDenarisPrice(dispatch);
    } catch(err) {
      console.log(err);
      addToast(`Swap couldn't be completed`,{
        appearance: "error"
      });
    }
  }

  return (
    <div className="flex-grow h-screen 
    md:pb-44 md:pt-6 md:mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      {/* <ToastContainer /> */}
      
      <div className="flex flex-col sticky
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
              maxBalance={isBuying ? bnbHumanBalance : denarisHumanBalance}
              setMax={isBuying ? setMaxBNB : setMaxDENARIS}
              symbol={isBuying ? "BNB" : "DENARIS"}
              iconSource={isBuying ? "/BNB.png" : "/denaris.png"}
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
              maxBalance={!isBuying ? bnbHumanBalance : denarisHumanBalance}
              setMax={!isBuying ? setMaxBNB : setMaxDENARIS}
              symbol={!isBuying ? "BNB" : "DENARIS"}
              iconSource={!isBuying ? "/BNB.png" : "/denaris.png"}
              isFrom={false}
            />

            {/* Price */}
            <div className="flex my-3 flex-row justify-between w-full text-left">
              <p className="baseText text-iris">
                price
              </p>
              <p className="baseText text-gray-lightest">
                {parseFloat(denarisPrice).toFixed(8)} BNB per DENARIS
              </p>
            </div>

            {/* Action button */}
            <TerraeButton
              extraClass={`flex flex-row w-full mt-2 ${enoughFrom && fromValue>0 && "hover:scale-100"}`}
              isPrimary
              text={isBuying ? "BUY" : "SELL"}
              enabled={enoughFrom && fromValue>0 ? true : false}
              onClick={enoughFrom && fromValue>0 ? swap : ()=>{}}
            />

          </div>
      </div>
    </div>
  )
}

export default ExchangeWidget
