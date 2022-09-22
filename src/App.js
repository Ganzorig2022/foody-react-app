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
          <Route
            path='*'
            element={
              <h1 style={{ marginTop: '100px', textAlign: 'center' }}>
                404 PAGE NOT FOUND
              </h1>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
