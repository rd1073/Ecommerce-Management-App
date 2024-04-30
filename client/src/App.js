
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Admins from './components/Admins';
import Seller from './components/Seller';
import AddSeller from './components/AddSeller';




function App() {
  return (
    <div className="App">
        <Router>
      <div>
        
      


        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<MainMenu />} />
          <Route path="/admin" element={<Admins />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/add-seller" element={<AddSeller />} />





        </Routes>
        
      </div>
    </Router>
    </div>
  );
}

export default App;
