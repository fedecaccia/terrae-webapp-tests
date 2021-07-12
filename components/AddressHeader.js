import askMetamaskConnection from "../web3/connection";
import askMetamaskDisconnection from "../web3/disconnection";
import { useWeb3, useDispatchWeb3 } from '../context/Web3';
import updateWeb3UserInfo from "../web3/balances";

function AddressHeader() {

  const userWeb3 = useWeb3();
  const dispatch = useDispatchWeb3();

  const reduceAddress = (address) => {

    address = address.slice(0,1).toUpperCase() + address.slice(1);

    if (address.length < 8) return address;
    return address.slice(0,4) + "..." + address.slice(address.length-4, address.length);
  }

  return (
    <div className="flex flex-col rounded-full h-8 w-25 border-0 pl-5 pr-5
      bg-gray hover:bg-gray-light cursor-pointer text-gray-lightest text-center justify-center"
      onClick={userWeb3.address
                ? () => askMetamaskDisconnection(dispatch)
                : () => {
                  let connected = askMetamaskConnection({ userWeb3, dispatch }); if(connected) updateWeb3UserInfo(dispatch)
                }
              }
      >
      <p className="addressText"> {userWeb3.address ? reduceAddress(userWeb3.address) : "Connect"}</p>
    </div>
  )
}

export default AddressHeader;
