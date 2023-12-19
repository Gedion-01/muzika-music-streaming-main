import { useFetchData } from '../hooks/useFetchData'
import { useParams } from 'react-router-dom'

import PageTitle from '../components/PageTitle'
import TracksList from '../components/TracksList'
import TracksPageLoading from '../components/animations/TracksPageLoading'

function Generepage() {
    const { id } = useParams()
    
    const queryParams = {
        genere: id
    }
    const {data, isLoading} = useFetchData('/genere', queryParams)
    if(isLoading) {
        return (
            <TracksPageLoading pageTitle={id} />
        )
    }
  return (
    <div className="px-3 h-full pb-20 mt-5">
      <div className="max-w-3xl">
        <PageTitle title={id} />
        <TracksList data={data.data} name={id}/>
      </div>
    </div>
  )
}

export default Generepage