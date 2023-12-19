import React from "react";

function TrackLoading() {
  return (
    <div>
      <div
        className={`relative overflow-hidden grid grid-cols-7  items-center h-13 py-1 gap-3 text-slate-200 font-sans text-sm rounded-md mb-2  before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_2s_infinite]`}
      >
        <div className="col-span-5 sm:col-span-4 md:col-span-3">
          <div className="flex flex-row gap-3 items-center">
            <button className="ml-2 h-5 w-5 rounded-md bg-slate-800"></button>
            <div className="bg-slate-800 w-11 h-11 rounded-md">
              {/* image */}
            </div>
            <div className="w-[50%] flex flex-col items-center gap-1">
              <p className="text-sm font-medium bg-slate-800 w-full h-3 rounded-md"></p>
              <p className="text-xs font-light bg-slate-800 w-full h-3 rounded-md"></p>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-1 text-slate-100 w-[70%]">
          <h3 className="text-end bg-slate-800 h-5 w-full rounded-md"></h3>
        </div>
        <div className="hidden sm:col-span-2 sm:flex items-center justify-center">
          <p className="bg-slate-800 h-5 w-[50%] rounded-md"></p>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-4 mr-3">
          {/* <AiOutlineHeart className="h-5 w-5 cursor-pointer" />
          <SlOptions className="cursor-pointer" /> */}
          <div className="bg-slate-800 h-5 w-5 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default TrackLoading;
