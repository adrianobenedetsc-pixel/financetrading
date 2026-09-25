import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Wallets from './pages/Wallets';
import Chart from './pages/Chart';
import Prices from './pages/Prices';
import Data from './pages/Data';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/data" element={<Data />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
