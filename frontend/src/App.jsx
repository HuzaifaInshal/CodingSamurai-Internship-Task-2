import './App.css'
import Account from './componenets/Account'
import Main from './componenets/Main';
import Dashboard from './componenets/Dashboard';
import {BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
    <Routes>
          <Route exact path='/' element={<Main/>}/> 
          <Route path='/account' element={<Account/>}/>
          <Route path='/dash' element={<Dashboard/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
