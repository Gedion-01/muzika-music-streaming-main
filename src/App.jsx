import { Routes, Route, Router } from "react-router-dom"
import Wrapperpage from "./pages/Wrapperpage"
import Homepage from "./pages/Homepage"
import Searchpage from "./pages/Searchpage"
import Generepage from "./pages/Generepage"
import PlayListpage from "./pages/PlayListpage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Wrapperpage />}>
          <Route index element={<Homepage />}/>
          <Route path="/search" element={<Searchpage />} />
          <Route path='genere/:id' element={<Generepage />} />
          <Route path='/playlist/:id' element={<PlayListpage />} />
          {/* to do */}
          <Route path='/folder/:folderid/:playlistid' element={'playlist folder page'}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
