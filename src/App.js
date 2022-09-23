import { Navbar, Order, Menu, Login, SignUp, ForgotPassword, Graphic } from './pages';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const style = {
    marginTop: '100px',
    textAlign: 'center',
  };
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/order" element={<PrivateRoute />}>
            <Route path="/order" element={<Order />} />
          </Route>
          <Route path="/menu" element={<PrivateRoute />}>
            <Route path="/menu" element={<Menu />} />
          </Route>
          <Route path="*" element={<h1 style={style}>404 PAGE NOT FOUND</h1>} />
          <Route path="/foody-react-app" element={<SignUp />} />
          <Route path="/graphic" element={<Graphic />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
