import './styles/App.css'
import "./styles/Resposive.css"
import { HashRouter, Routes, Route, Link } from "react-router-dom"
import InputUser from './components/InputUser'
import Pokedex from './components/Pokedex'
import PokedexDetails from './components/PokedexDetails'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {


  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<InputUser />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokedex/:id' element={<PokedexDetails />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
