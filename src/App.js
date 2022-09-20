import { Navbar, Order, Menu } from './pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/order' element={<Order />} />
          <Route path='/graphic' element={<Order />} />
          <Route path='/menu' element={<Menu />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
