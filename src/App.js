import { Navbar, Order, Menu, Login, SignUp, ForgotPassword } from './pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/order' element={<Order />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          {/* <Route path='/graphic' element={<Graphic />} /> */}
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
