import React, { useEffect, useRef, useState } from "react";
import { usePlayList } from "./usePlayList";

function useAudioplayer() {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const {
    playListLength,
    audioRef,
    progressBarRef,
    animationRef,
    // currentTime,
    // setCurrentTime,
    isplaying,
    setIsPlaying,
    currentTrackIndex,
    setCurrentTrackIndex,
    playNext,
    setPlayNext,
    playList,
    currentData
  } = usePlayList();
  
  //console.log(currentTime, '-')
  const handleSliderChange = (newValue) => {
    // console.log('changing')
    // setCurrentTime(newValue);
    // if (audioRef.current) {
    //   audioRef.current.currentTime = newValue;
    // }
  };

  // useEffect(() => {
  //   console.log('-+-')
  //   if (audioRef.current) {
  //     audioRef.current.addEventListener('timeupdate', () => {
  //       setCurrentTime(audioRef.current.currentTime);
  //     });
  //     audioRef.current.addEventListener('loadedmetadata', () => {
  //       setDuration(audioRef.current.duration);
  //     });
  //   }
  // }, []);
  function whilePlaying() {
    progressBarRef.current.value = audioRef.current.currentTime;
    if(audioRef?.current?.readyState) {
      setCurrentTime(progressBarRef.current.value);
    }
    //console.log(progressBarRef.current.value);
    // recurssivly call it in order to set the current time and progress bar
    animationRef.current = requestAnimationFrame(whilePlaying);
    if (audioRef.current.paused || audioRef.current.ended) {
      cancelAnimationFrame(animationRef.current);
    }
  }

  const handlePlayPause = () => {
    //cancelAnimationFrame(animationRef.current);
    console.log("anim--");
    // change the flag of the player
    setCurrentTime(0)
    if (isplaying) {
      console.log("was playing");
      audioRef.current.pause();
      setIsPlaying(false);
      setPlayNext(false);
      // cancel the animation which is called while playing
      cancelAnimationFrame(animationRef.current);
    }
    else {
      // lets play it
      console.log("start--------------------------");
      audioRef.current.play();
      setIsPlaying(true);
      setPlayNext(true);
      // start the animation
      //animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlayNext(true);
    cancelAnimationFrame(animationRef.current);
    console.log("ended");
    // advance to the next if it exist
    if (currentTrackIndex < playListLength - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };
  // change the audio file current playing time to the progress bar current value
  function changeRange() {
    console.log('range')
    audioRef.current.currentTime = progressBarRef.current.value;
    setCurrentTime(progressBarRef.current.value);
  }
  // if current track.name change run thiss
  console.log("/|");
  useEffect(() => {
    if (audioRef.current) {
      if (playNext) {
        setIsPlaying(true);
        audioRef.current.play();
        console.log("next-------------");
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        // audioRef.current.pause()
        console.log("cancel;");
        //cancelAnimationFrame(animationRef.current);
        
      }
    }
  }, [currentData.title, isplaying]); // there is a bug to be fixed 
  // if (!isplaying) {
  //   cancelAnimationFrame(animationRef.current);
  // }

  return {
    refs: {
      audioRef: audioRef,
      progressBarRef: progressBarRef,
      animationRef: animationRef,
    },
    stateValue: {
      isPlaying: isplaying,
      currentTime: currentTime,
      currentTrackIndex: currentTrackIndex,
      playNext: playNext,
      duration: duration,
    },
    methods: {
      handleEnded: handleEnded,
      changeRange: changeRange, // unused
      handlePlayPause: handlePlayPause,
      handleSliderChange: handleSliderChange,
      setCurrentTime: setCurrentTime
    },
  };
}

export default useAudioplayer;
