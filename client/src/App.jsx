import Additem from "./component/additem"
import ShowItem from "./component/showitem"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ShowItem />} />
          <Route path="/additem" element={<Additem />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
