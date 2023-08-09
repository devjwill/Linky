import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Templates from './pages/templates';
import FAQ from './pages/faq';
import ContactUs from './pages/contactUs';
import Admin from './pages/admin';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={user ? <Navigate to="/admin"/> : <Login/>} />
            <Route path="/signup" element={user ? <Navigate to="/admin"/> : <Signup/>} />
            <Route path="/templates" element={<Templates/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/admin" element={user ? <Admin/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
