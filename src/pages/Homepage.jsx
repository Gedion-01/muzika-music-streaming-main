// icons
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import Track from "../components/Tracks";
import { useFetchData } from "../hooks/useFetchData";

import TracksPageLoading from "../components/animations/TracksPageLoading";
import PageTitle from "../components/PageTitle";
import TracksList from "../components/TracksList";

import AddtoPlayListDialog from "../components/AddtoPlayListDialog";
function Homepage() {
  const { data, isLoading } = useFetchData('/tracks')
  
  console.log(data);
  if (isLoading) {
    return (
      <TracksPageLoading pageTitle={'All Tracks'} />
    );
  }
  
  return (
    <div className="px-3 h-full pb-20 mt-5">
      
      <div className="max-w-3xl">
        
        <PageTitle title={'All Tracks'} />
        <TracksList data={data.data} name/>
      </div>
    </div>
  );
}

export default Homepage;
