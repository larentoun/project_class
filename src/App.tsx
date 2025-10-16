import { Routes, Route } from 'react-router-dom';
import HomeMenu from './components/HomeMenu';
import QrScanner from './components/QrScanner';
import QrList from './components/QrList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/scanner" element={<QrScanner />} />
        <Route path="/qr-list" element={<QrList />} />
        <Route path="*" element={<HomeMenu />} />
      </Routes>
    </div>
  );
}

export default App;