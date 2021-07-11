import Image from "next/image";

const SidebarRow = ({ src, Icon, title }) => (
  <div className="flex items-center space-x-2 pl-5 pt-3 py-3 hover:bg-iris cursor-pointer">
    {src && (
      <Image
        className="rounded-full"
        src={src}
        width={30}
        height={30}
        layout="fixed"
        alt=""
      />
    )}
    {Icon && (
      <Icon className="h-8 w-8 text-gray-lightest" />
    )}
    <p className="hidden sm:inline-flex smallText items-center text-gray-lightest">{title}</p>
  </div>
);

export default SidebarRow;
