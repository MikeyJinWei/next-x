"use client";

import { SiCoinmarketcap } from "react-icons/si";
import { HiHome } from "react-icons/hi";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Sidebar = () => {
  // 存取 data 命名成 session
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div className="h-screen flex flex-col justify-between p-3">
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

        {/* 依 session truthy falsy 渲染按鈕 */}
        {session ? (
          <button
            onClick={() => signOut()}
            className="hidden xl:inline w-48 h-9 mt-4 rounded-full font-semibold text-white bg-indigo-400 hover:brightness-95 shadow-md cursor-pointer transition-all duration-300 ease-in-out"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => signIn()}
            className="hidden xl:inline w-48 h-9 mt-4 rounded-full font-semibold text-white bg-indigo-400 hover:brightness-95 shadow-md cursor-pointer transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        )}
      </div>

      {/* 使用者資訊 */}
      {session && (
        <div className="flex items-center p-3 text-sm text-gray-700 cursor-pointer rounded-xl hover:bg-gray-100 transition-all duration-200">
          <img
            src={session.user.image}
            alt="user-img"
            className="h-12 w-12 xl:mr-2 rounded-full "
          />
          <div className="hidden xl:inline">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-neutral-500">@{session.user.username}</p>
            <p className="text-neutral-500">{session.user.email}</p>
          </div>
          <HiOutlineDotsHorizontal className="hidden xl:inline w-5 h-5 xl:ml-8" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
