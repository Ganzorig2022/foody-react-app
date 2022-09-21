import { Navbar, Order, Menu, Login } from './pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/order' element={<Order />} />
          {/* <Route path='/graphic' element={<Graphic />} /> */}
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
