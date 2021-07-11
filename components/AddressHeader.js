function AddressHeader({ userAddress }) {
  return (
    <div className="rounded-full h-8 w-25 border-0 pl-5 pr-5
      bg-gray hover:bg-gray-light cursor-pointer text-gray-lightest ">
      <text className="smallText"> {userAddress ? userAddress : "Connect"}</text>
    </div>
  )
}

export default AddressHeader;
