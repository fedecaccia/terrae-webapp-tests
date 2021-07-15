import {
  FlagIcon,
  ScaleIcon,
  BeakerIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import {
  LibraryIcon,
  SwitchHorizontalIcon,
  PhotographIcon,
  FireIcon,
} from "@heroicons/react/solid";
import SidebarRow from "./SidebarRow";
import { useSidebar } from '../context/Sidebar';

const Sidebar = ({ selected }) => {
  const state = useSidebar();

  return (
    <div className="flex flex-col h-screen overflow-hidden ">
    <div className={`pt-7 pb-2 max-w-[600px] 
      ${state.expanded && "xl:min-w-[300px]"}
      h-full mb-5
      bg-gray-dark transition duration-300`
      // border-r-[1px] border-gray-border 
    }>
      
      <SidebarRow expanded={state.expanded} Icon={LibraryIcon} title="Home"  isActive={selected==="HOME"}/>
      <SidebarRow expanded={state.expanded} Icon={SwitchHorizontalIcon} title="Exchange" isActive={selected==="EXCHANGE"}/>
      <SidebarRow expanded={state.expanded} Icon={PhotographIcon} title="Lands" isActive={selected==="LANDS"}/>
      <SidebarRow expanded={state.expanded} Icon={FlagIcon} title="Army" isActive={selected==="ARMY"}/>
      <SidebarRow expanded={state.expanded} Icon={FireIcon} title="Battle" isActive={selected==="BATTLE"}/>
      <SidebarRow expanded={state.expanded} Icon={ScaleIcon} title="Marketplace" isActive={selected==="MARKETPLACE"}/>
      <SidebarRow expanded={state.expanded} Icon={BeakerIcon} title="Alchemy" isActive={selected==="ALCHAMY"}/>
      <SidebarRow expanded={state.expanded} Icon={GiftIcon} title="Coffers" isActive={selected==="COFFERS"}/>
      
    </div>
    </div>
  );
};

export default Sidebar;
