import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { usePlayList } from "../hooks/usePlayList";

import useAudioplayer from "../hooks/useAudioplayer";
import { data } from "autoprefixer";
import MenubarOption from "./MenubarOption";
// import { usePlayPause } from "../hooks/usePlayPause";
//
function Track({
  playListData,
  track,
  isCurrent,
  index,
  isPlaying,
}) {
  
  const { methods } = useAudioplayer();
  const {handlePlayPause} = methods
  //console.log('is current', isCurrent, isPlaying)
  const {
    setPlayNext,
    setCurrentData,
    setPlayList,
    setPlayListLength,
    setCurrentTrackIndex,
    currentData,
    setIsPlaying
  } = usePlayList();

  function playPause() {
    setCurrentTrackIndex(index);
    // getData(track)
    setCurrentData(track);
    setPlayListLength(playListData.length);
    setPlayList(playListData);
    console.log('play/pause')
    // only after play pause logic is finished we procced to setPlayNext to true
    handlePlayPause();
    // currently using the audio file title to check if it is already playing
    if(currentData.title !== track.title) {
      setPlayNext(true)
    }
  }
  
  return (
    <div>
      <div
        className={`grid grid-cols-7  items-center h-13 py-1 gap-3 text-slate-200 font-sans text-sm rounded-md mb-2 hover:bg-gray-800 transition-all duration-300 ${
          isPlaying && isCurrent ? "bg-gray-800" : ""
        }`}
      >
        <div className="col-span-5 sm:col-span-4 md:col-span-3">
          <div className="flex flex-row gap-3 items-center">
            <button onClick={() => playPause()}>
              {isPlaying && isCurrent ? (
                <BsPauseFill className="ml-2 h-5 w-5 cursor-pointer" />
              ) : (
                <BsFillPlayFill className="ml-2 h-5 w-5 cursor-pointer" />
              )}
            </button>
            <div className="">
              <img src={`${track.coverImageUrl}`} className="w-10 h-10 rounded-md" />
            </div>
            <div className="">
              <p className="text-sm font-medium">{track.title}</p>
              <p className="text-xs font-light">{track.artist}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-1 text-slate-100">
          <h3 className="text-end">3:45</h3>
        </div>
        <div className="hidden sm:col-span-2 sm:flex items-center justify-center">
          <p>{track.genere}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-4 mr-3">
          <AiOutlineHeart className="hidden lg:block h-5 w-5 cursor-pointer" />
          {/* <SlOptions className="cursor-pointer" /> */}
          <MenubarOption songid={track._id}/>
        </div>
      </div>
    </div>
  );
}

export default Track;
