import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import './App.css'

function App() {

  

  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
