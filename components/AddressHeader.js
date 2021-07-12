function AddressHeader({ userAddress }) {

  const reduceAddress = (address) => {

    address = address.slice(0,1).toUpperCase() + address.slice(1);

    if (address.length < 8) return address;
    return address.slice(0,4) + "..." + address.slice(address.length-4, address.length);
  }

  return (
    <div className="rounded-full h-8 w-25 border-0 pl-5 pr-5
      bg-gray hover:bg-gray-light cursor-pointer text-gray-lightest ">
      <text className="addressText align-middle"> {userAddress ? reduceAddress(userAddress) : "Connect"}</text>
    </div>
  )
}

export default AddressHeader;
