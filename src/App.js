import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import { useInfoContext } from './context/Context';

function App() {
  const {currentUser} = useInfoContext()  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={currentUser ? <Home/> : <Auth/>}/>
     </Routes>
     <ToastContainer />
    </div>
  );
}

export default App;
