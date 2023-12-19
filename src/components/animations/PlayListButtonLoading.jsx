import React from "react";
import { FiMusic } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

function PlayListButtonLoading({ id, name, username, close }) {
  const location = useLocation()
  return (
    <Link to={`/playlist/${id}`} onClick={close}>
      <div
        className={` mr-5 mb-1 rounded-md flex flex-row items-center gap-1 transition-all duration-300 hover:bg-gray-900 ${location.pathname === `/playlist/${id}` ? 'bg-gray-900' : ""} `}
      >
        <div className="relative overflow-hidden h-12 w-12 m-1.5 flex items-center justify-center rounded-md bg-gray-800 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_2s_infinite]">
          
        </div>
        <div className="flex flex-col justify-between gap-4">
          <p className="relative overflow-hidden text-sm text-start bg-gray-800 rounded-md h-4 w-[111px] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_2s_infinite]">{''}</p>
          <p className="relative overflow-hidden text-xs text-start bg-gray-800 rounded-md h-2 w-[73px] before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_2s_infinite]"></p>
        </div>
      </div>
    </Link>
  );
}

export default PlayListButtonLoading;
