import React from "react";
import MenubarDemo from "./MenubarDemo";

function PageTitle({title}) {
  return (
    <div className="mb-4 w-full">
      <h1 className="mx-3 text-slate-100 text-3xl font-extrabold">
        {title}
      </h1>
      {/* <MenubarDemo /> */}
    </div>
  );
}

export default PageTitle;
