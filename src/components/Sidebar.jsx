import { SiCoinmarketcap } from "react-icons/si";
import { HiHome } from "react-icons/hi";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/">
        <SiCoinmarketcap className="w-16 h-16 p-3 hover:bg-neutral-100 rounded-xl cursor-pointer transition-all duration-300 ease-in-out" />
      </Link>

      <Link
        href="/"
        className="flex items-center w-fit gap-2 p-3 rounded-xl hover:bg-neutral-100 cursor-pointer transition-all duration-300 ease-in-out"
      >
        <HiHome className="w-7 h-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>

      <button className="hidden xl:inline w-48 h-9 mt-4 rounded-full font-semibold text-white bg-indigo-400 hover:brightness-95 shadow-md cursor-pointer transition-all duration-300 ease-in-out">
        Sign In
      </button>
    </div>
  );
};

export default Sidebar;
