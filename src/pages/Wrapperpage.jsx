import React from "react";
import Wrappermain from "../components/containers/Wrappermain";
import Navbar from "../components/Navbar";
import Wrappersecond from "../components/containers/Wrappersecond";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

import useAudioplayer from "../hooks/useAudioplayer";
import MyAudioPlayer from "../components/MyAudioPlayer";
import { usePlayList } from "../hooks/usePlayList";


function Wrapperpage() {
  const { refs, stateValue, methods } = useAudioplayer();
  const { currentData, playList, currentTrackIndex } = usePlayList();

  const { audioRef } = refs;
  const { currentTime, duration } = stateValue;
  const { handlePlayPause, handleEnded, changeRange, handleSliderChange, setCurrentTime } = methods;
  console.log('current time ', currentTime)
  return (
    <section>
      <Wrappermain>
        <Sidebar />
        <Wrappersecond>
          <Navbar />
          <Outlet />
          <MyAudioPlayer
            track={currentData.musicUrl}
            title={currentData.title}
            artist={currentData.artist}
            img={currentData.coverImageUrl}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            data={playList}
            audioRef={audioRef}
            // animationRef={animationRef}
            handlePlayPause={handlePlayPause}
            // handleEnded={handleEnded}
            changeRange={changeRange}
            currentTrackIndex={currentTrackIndex}
            handleSliderChange={handleSliderChange}
            duration={duration}
          />
        </Wrappersecond>
      </Wrappermain>
    </section>
  );
}

export default Wrapperpage;
