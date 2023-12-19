import React, { useEffect, useState } from "react";
import "../App.css";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import {Sliderrange} from "./Sliderrange";
//
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { usePlayList } from "../hooks/usePlayList";

function MyAudioPlayer({
  track,
  title,
  artist,
  img,
  currentTime,
  setCurrentTime,
  audioRef,
  handlePlayPause,
  data,
  currentTrackIndex,
  handleSliderChange,
  // duration,
  changeRange
}) {
  const { setCurrentData, isplaying, setPlayNext, setCurrentTrackIndex, progressBarRef, animationRef } =
    usePlayList();
  
  //console.log(track, index)
  //console.log(currentTime)
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    console.log('yes')
    const seconds = Math.floor(audioRef.current.duration);
    if(progressBarRef.current) {
      progressBarRef.current.max = seconds;
    }
    setDuration(seconds);
    setCurrentTime(0)
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState]);
  function calculateTime(secs) {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }
  
  //console.log('index', index, data) 
  return (
    <>
      <div className="fixed z-10 left-0 right-0 bottom-0 bg-gray-900 h-16 text-slate-50 font-sans flex items-center justify-center">
      
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 items-center max-w-5xl mx-5">
          <div className="col-span-1 flex flex-row justify-center items-center">
            <audio
              ref={audioRef}
              src={track}
              preload="metadata"
              onEnded={() => {
                cancelAnimationFrame(animationRef)
                if (currentTrackIndex < data.length - 1) {
                  const nextData = data[currentTrackIndex + 1];
                  setCurrentData(nextData);
                  setPlayNext(true);
                  setCurrentTrackIndex(currentTrackIndex + 1);
                  console.log("ended");
                } else {
                  setCurrentData(data[0]);
                  setPlayNext(true)
                  setCurrentTrackIndex(0);
                  
                }
              }}
            ></audio>
            <button className="text-slate-400 hover:text-slate-50 transition-all duration-300">
              <BiSkipPrevious className="h-10 w-10" />
            </button>
            <button onClick={handlePlayPause} className="text-slate-50 hover:scale-105 transition-all duration-100">
              {isplaying ? (
                <BiPauseCircle className="h-9 w-9" />
              ) : (
                <BiPlayCircle className="h-9 w-9" />
              )}
            </button>
            <button className="text-slate-400 hover:text-slate-50 transition-all duration-300">
              <BiSkipNext className="h-10 w-10" />
            </button>
          </div>

          <div className="col-span-3 w-full">
            <div className="flex flex-row items-center">
              <div className="mx-2 text-xs text-end">
                { calculateTime(currentTime) }
              </div>
              <input
                ref={progressBarRef}
                type="range"
                name=""
                id=""
                className="inline w-full"
                defaultValue={0}
                onChange={changeRange}
              />
              {/* <Sliderrange myRef={progressBarRef} value={currentTime} max={duration} onChangev={handleSliderChange} /> */}
              <div className="mx-2 text-xs">
                {/* {duration && !isNaN(duration) && calculateTime(duration)} */}
                { duration > 0 ? calculateTime(duration) : '0:00'}
              </div>
            </div>
          </div>
          {/* duration */}

          <div className="col-span-2 hidden sm:flex flex-row items-center justify-center gap-3">
            <div className={`${img ? '' : 'hidden'}`}>
              <img src={img} className="h-12 w-12" />
            </div>
            <div className="">
              <p className="text-sm font-medium ">{title}</p>
              <p className="text-xs">{artist}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAudioPlayer;
