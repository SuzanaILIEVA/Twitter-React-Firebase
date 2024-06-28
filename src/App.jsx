
import Login from "./Pages/Login"
import Feed from "./Pages/Feed/index"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protected from "./Components/Protected"


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      
      <Route element={<Protected/>}>
      <Route path='/feed' element={<Feed/>}/>
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
