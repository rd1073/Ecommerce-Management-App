
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Admins from './components/Admins';
import Seller from './components/Seller';
import AddSeller from './components/AddSeller';
import Navbar from './components/Navbar';
import Customer from './components/Customer';
import Order from './components/Orders';
import Product from './components/Products';
import AddProduct from './components/AddProduct';




function App() {
  return (
    <div className="App">
      
        <Router>
      <div>
      
        
      


        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<MainMenu />} />
          <Route path="/admin" element={<Admins />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/products" element={<Product />} />



          <Route path="/add-seller" element={<AddSeller />} />
          <Route path="/add-product" element={<AddProduct />} />






        </Routes>
        
      </div>
    </Router>
    </div>
  );
}

export default App;
