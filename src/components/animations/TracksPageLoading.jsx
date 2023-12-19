// icons
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";

import TrackLoading from "./TrackLoading";
import PageTitle from "../PageTitle";
const loadingTracks = new Array(30);
for (let i = 0; i < 30; i++) {
  loadingTracks[i] = i;
}
function TracksPageLoading({pageTitle}) {
  return (
    <div className="mx-3 h-full pb-20 mt-5">
      <div className="max-w-3xl">
        {/* <hr className="mb-2 border-slate-500"/> */}
        <PageTitle title={pageTitle} />
        <div
          id=""
          className="flex flex-row justify-start gap-3 mx-2 mb-4 text-slate-100"
        >
          <div className="flex flex-row items-center gap-1 cursor-pointer hover:text-cyan-500 transition-all duration-300">
            <BiTimeFive className="h-5 w-5" />
            <p>Newest</p>
          </div>
          <div className="flex flex-row items-center gap-1 cursor-pointer hover:text-cyan-500 transition-all duration-300">
            <AiOutlineFire className="h-5 w-5" />
            <p>Popular</p>
          </div>
        </div>
        <div className="mx-2">
          {loadingTracks.map((data, index) => {
            return <TrackLoading key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default TracksPageLoading;
