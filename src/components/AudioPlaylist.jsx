import React, { useState,  useRef, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';

const AudioPlaylist = ({ tracks }) => {
  const audioRef = useRef(null);
  const [ind, setInd] = useState()
  const [isPlaying, setIsPlaying] = useState(false);
  //
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playNext, setPlayNext] = useState(false)
  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setPlayNext(true)
    console.log('next index', nextIndex)
  };
  function setMindex(value) {
    setCurrentTrackIndex(value)
    audioRef.current.pause()
    setPlayNext(true)
    console.log(value)
  }
  
  const handlePlayPause = (value) => {
    setIsPlaying(!isPlaying);
    if(isPlaying) {
        audioRef.current.pause()
    }
    else {
        audioRef.current.play()
    }
  };
  const handleEnded = () => {
    setIsPlaying(false);
    setPlayNext(true)
    console.log('ended')
    if(currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1)
    }
    else {
      setCurrentTrackIndex(0)
    }
  };
  useEffect(() => {
    if (audioRef.current) {
      if (playNext) {
        setIsPlaying(true)
        audioRef.current.play();
        console.log('next--')
      } else {
        //audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);
  return (
    <div>
      <h2>Audio Playlist</h2>
      {tracks.map((track, index) => (
        <AudioPlayer
          key={index}
          track={track}
          isCurrent={currentTrackIndex === index}
          isnotCurrent={currentTrackIndex !== index}
          isPlaying={isPlaying}
          playNext={playNext}
          setMindex={setMindex}
          index={index}
          handlePlayPause={handlePlayPause}
        />
      ))}
      <div>
        <p>Name</p>
        <audio controls ref={audioRef} src={tracks[currentTrackIndex].url} onEnded={handleEnded}/>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
};

export default AudioPlaylist;
