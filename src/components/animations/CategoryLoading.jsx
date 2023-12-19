import React from "react";

function CategoryLoading() {
  return (
    <div className="cursor-pointer mb-2 flex flex-col w-full h-full">
      <div
        id="catagory"
        className="w-full h-[120px] sm:h-full bg-slate-800 rounded-md relative overflow-hidden   before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_2s_infinite]"
      ></div>
      <div className="flex justify-center items-center mt-3.5">
        <h1 className="bg-slate-800 font-bold h-4 w-[65%] rounded-md relative overflow-hidden   before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_2s_infinite]"></h1>
      </div>
    </div>
  );
}

export default CategoryLoading;
