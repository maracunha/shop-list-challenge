import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Product from './pages/ProductPage';

const App = () => {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
