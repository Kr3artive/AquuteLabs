import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
