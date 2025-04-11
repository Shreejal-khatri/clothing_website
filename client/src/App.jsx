import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Item from './Item'; 
import WomanItem from './WomanItem'; 
import ItemDescription from './ItemDescription'; 
import ProfilePage from "./ProfilePage"; 
import Favourites from './Favourites';
import AdminDashboard from './AdminDashboard'; 
import Cart from './Cart';
import Notification from "./Notification"; 
import AboutUs from "./AboutUs";
import PaymentSuccess from "./PaymentSuccess"; 
import PaymentFailure from "./PaymentFailure"; 
import AdminLogin from './AdminLogin'; 
import AdminRegister from './AdminRegister';
import ItemExchange from './ItemExchange';
import ClientOrderStatus from './ClientOrderStatus';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path="/item" element={<Item />} /> 
        <Route path="/product/:id" element={<ItemDescription />} />
       <Route path='/woman-item' element={<WomanItem />} />
       <Route path="/profile" element={<ProfilePage />} />
       <Route path="/favourites" element={<Favourites />} /> {/* Add this route */}
       <Route path='/admin/dashboard' element={<AdminDashboard />} /> {/* Add this route */}
       <Route path="/cart" element={<Cart />} /> {/* Add the /cart route */}
       <Route path="/notifications" element={<Notification />} /> {/* Add this route */}
       <Route path="/about" element={<AboutUs />} /> {/* Add the AboutUs route */}
       <Route path="/payment-success" element={<PaymentSuccess />} />
       <Route path="/payment-failed" element={<PaymentFailure />} />
       <Route path='/admin/login' element={<AdminLogin />} /> {/* Add the AdminLogin route */}
       <Route path="/admin/register" element={<AdminRegister />} />
       <Route path="/item-exchange" element={<ItemExchange />} />
       <Route path="/order-status" element={<ClientOrderStatus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
