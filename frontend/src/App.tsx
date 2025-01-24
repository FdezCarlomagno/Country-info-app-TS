import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CountryList from './components/CountryList'
import { CountryInfo } from "./components/CountryInfo"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />}/>
        <Route path="/country-info/:countryCode" element={<CountryInfo />}/>
      </Routes>
    </Router>
  )
}

export default App