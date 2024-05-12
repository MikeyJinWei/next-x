"use client";

import { useSession } from "next-auth/react";
import { FaImage } from "react-icons/fa6";

const Input = () => {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <div className="w-full flex space-x-3 p-3 border-b border-neutral-200">
      <img
        src={session.user.image}
        alt="user-img"
        className="h-12 w-12 rounded-full cursor-pointer hover:brightness-95"
      />

      <div className="w-full divide-y divide-neutral-200">
        <textarea
          rows={2}
          placeholder="What's happening?"
          className="w-full min-h-[50px] text-neutral-700 tracking-wide border-none outline-none"
        ></textarea>

        <div className="flex items-center justify-between pt-2.5">
          <FaImage className="w-10 h-10 p-2 text-sky-600 rounded-xl hover:bg-sky-100 cursor-pointer" />
          <button className="px-4 py-1.5 rounded-full font-medium text-white bg-indigo-400 hover:brightness-95 disabled:opacity-50 shadow-md">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
