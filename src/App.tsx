import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Login from './pages/Login';
import Product from './pages/ProductPage';
import Signup from './pages/Signup';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Product />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
