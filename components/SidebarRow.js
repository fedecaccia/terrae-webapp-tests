import Image from "next/image";

const SidebarRow = ({ Icon, title, isActive, expanded }) => (
  <div className={`flex transition duration-300 items-center space-x-2 pl-5 pr-5 pt-3 py-3 hover:bg-iris cursor-pointer hover:scale-105 ${isActive && "bg-iris"}`}>
    {Icon && (
      <Icon className="h-8 w-8 text-gray-lightest" />
    )}
    { expanded && 
      <p className={"hidden sm:inline-flex baseText items-center text-gray-lightest"}>{title}</p>
    }
  </div>
);

export default SidebarRow;
