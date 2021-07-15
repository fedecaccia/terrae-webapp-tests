import Image from "next/image";

import {
  ViewBoardsIcon,
  MenuIcon
} from "@heroicons/react/solid";
import AddressHeader from "./AddressHeader";
import { useSidebar, useDispatchSidebar } from '../context/Sidebar';

const Header = () => {
  const state = useSidebar();
  const dispatch = useDispatchSidebar();

  const dummyFunction = () => {}

  return (
    <div className="sticky z-50 top-0 pt-2 pb-2 px-5 bg-gray-dark 
    flex flex-row pd-2 lg:px-5 shadow-md justify-between">
      {/* border-b-[1px] border-gray-border  */}
      
      {/* Left */}
      <div className="flex items-center justify-start">
        
        <div className="flex items-center rounded-full bg-transparent py-2 pr-2"
          onClick={() => dispatch({
            type:"TOOGLE_SIDEBAR",
            payload: null
          })}
        >
          {
            state.expanded
            ? <ViewBoardsIcon className="h-8 w-8 text-gray-lightest cursor-pointer" />
            : <MenuIcon className="h-8 w-8 text-gray-lightest cursor-pointer" />
          }
        </div>
        
        <Image
          className="cursor-pointer"
          // add domain in config
          src="/TerraeLogo.png"
          width={142*0.9}
          height={45*0.9}
          layout="fixed"
          alt=""
        />
        
      </div>


      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">        
        <AddressHeader />
        <Image
          onClick={dummyFunction}
          className="rounded-full cursor-pointer"
          src={"/AvatarMarcoMadera01.png"}
          width="50"
          height="50"
          layout="fixed"
          alt=""
        />                
      </div>

    </div>
  );
};

export default Header;
