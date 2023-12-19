// import { usePlayList } from "./usePlayList";
// /* Referance for the future */
// export function usePlayPause() {
//   const {
//     setPlayNext,
//     setIsPlaying,
//     isplaying,
//     audioRef,
//     currentTime,
//     setCurrentTime,
//     animationRef,
//     progressBarRef,
//   } = usePlayList();
//   //const [currentTime, setCurrentTime] = useState(0);
  
//   //const audioRef = useRef(null);
//   //const animationRef = useRef(null);


//   function whilePlaying() {
    
//     progressBarRef.current.value = audioRef.current.currentTime;
    
//     setCurrentTime(progressBarRef.current.value);
//     // recurssivly call it in order to set the current time and progress bar
//     animationRef.current = requestAnimationFrame(whilePlaying);
//   }
//   const handlePlayPause = () => {
//     //cancelAnimationFrame(animationRef.current);
//     /// change the flag of the player
//     if (isplaying) {
//       // if is playing pause it
//       audioRef.current.pause();
//       setIsPlaying(false);
//       setPlayNext(false);
//       // cancel the animation which is called while playing
//       cancelAnimationFrame(animationRef.current);
//     } else {
//       // lets play it
//       audioRef.current.play();
//       setIsPlaying(true);
//       //setPlayNext(true);
//       // start the animation
//       animationRef.current = requestAnimationFrame(whilePlaying);
//     }
//   };

//   return {
//     handlePlayPause: handlePlayPause,
//   };
// }
