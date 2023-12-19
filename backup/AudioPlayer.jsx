import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ track, isCurrent, isnotCurrent, onTrackEnd, playNext, index,  setMindex }) => {
    console.log('is current', isCurrent, index)
  const [isPlaying, setIsPlaying] = useState(false);
  console.log('isPlaying', isPlaying)
  const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       if (isCurrent && isPlaying) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying, isCurrent]);
if (audioRef.current) {
    if (isnotCurrent) {
      
      audioRef.current.pause();
    }
  }
  console.log('playnext', playNext)
  useEffect(() => {
    if (audioRef.current) {
      if (isCurrent && playNext) {
        setIsPlaying(true)
        audioRef.current.play();
      } else {
        //audioRef.current.pause();
      }
    }
  }, [isCurrent, playNext]);
  const handlePlayPause = () => {
    //
    setMindex(index)
    //
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
    onTrackEnd();
    console.log('ended')
  };

  return (
    <div>
      <h3>{track.title}</h3>
      <audio controls ref={audioRef} src={track.url} onEnded={handleEnded} />
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;
