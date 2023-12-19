import React from "react";
import { useNavigate } from "react-router-dom";
function Catagory({name, imgurl}) {
  const navigate = useNavigate()
  console.log(name)
  function handleClick() {
    navigate(`/genere/${name}`)
  }
  return (
    <>
    <div className="cursor-pointer flex flex-col" onClick={() => handleClick()}>
          <img
          id="catagory"
          className="w-full h-[120px] sm:h-full rounded-md hover:brightness-75"
            src={imgurl}
          />
        
        <h1 className="mt-2 text-sm  text-center text-slate-300 font-bold">
          {name}
        </h1>
    </div>
    </>
  );
}

export default Catagory;
