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

const Sidebar = ({ expanded, selected }) => {

  return (
    <div className={`pt-7 pb-2 max-w-[600px] 
      ${expanded && "xl:min-w-[300px]"}
      h-full mb-5
      bg-gray-dark border-r-[1px] border-gray-border transition duration-300`
    }>
      
      <SidebarRow expanded={expanded} Icon={LibraryIcon} title="Home"  isActive={selected==="HOME"}/>
      <SidebarRow expanded={expanded} Icon={SwitchHorizontalIcon} title="Exchange" isActive={selected==="EXCHANGE"}/>
      <SidebarRow expanded={expanded} Icon={PhotographIcon} title="Lands" isActive={selected==="LANDS"}/>
      <SidebarRow expanded={expanded} Icon={FlagIcon} title="Army" isActive={selected==="ARMY"}/>
      <SidebarRow expanded={expanded} Icon={FireIcon} title="Battle" isActive={selected==="BATTLE"}/>
      <SidebarRow expanded={expanded} Icon={ScaleIcon} title="Marketplace" isActive={selected==="MARKETPLACE"}/>
      <SidebarRow expanded={expanded} Icon={BeakerIcon} title="Alchemy" isActive={selected==="ALCHAMY"}/>
      <SidebarRow expanded={expanded} Icon={GiftIcon} title="Coffers" isActive={selected==="COFFERS"}/>
      
    </div>
  );
};

export default Sidebar;
