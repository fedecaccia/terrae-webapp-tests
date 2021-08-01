import Image from "next/image";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import BigNumber from "bignumber.js";

function BalanceHeader() {

  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const DENARIS_DECIMALS = 18;  
  const weiToEth = denaris => (BigNumber(denaris).dividedBy(10**DENARIS_DECIMALS).toFixed(4));

  return (
    <div className="flex flex-row pl-5 pr-5 gap-2 text-gray-lightest text-center justify-center">
      <Image
        className=""
        objectFit="cover"
        src={"/denaris.png"}
        width={25}
        height={25}
        layout="fixed"
        alt=""
      />
      <p className="addressText"> {weiToEth(userWeb3.balances.tden)}</p>
    </div>
  )
}

export default BalanceHeader;
