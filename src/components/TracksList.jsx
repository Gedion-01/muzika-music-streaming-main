// icons
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { usePlayList } from "../hooks/usePlayList";
import Track from "./Tracks";

function TracksList({ data, name }) {
  // console.log(data)
  const { isplaying, currentTrackIndex, currentData } = usePlayList();

  return (
    <section id="Tracks-list">
      <div
        id=""
        className="flex flex-row justify-start gap-3 mx-2 mb-4 text-slate-100 overflow-x-clip"
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
        {data.map((track, index) => {
          return (
            <Track
              playListData={data}
              key={index}
              track={track}
              // isCurrent={currentTrackIndex === index} && currentTrackIndex === index
              isCurrent={track._id === currentData._id}
              isPlaying={isplaying}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}

export default TracksList;
