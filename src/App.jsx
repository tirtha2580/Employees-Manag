import { BrowserRouter,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Components/Users';
import './App.css'



function App() {
  return (
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );  
}

export default App;
