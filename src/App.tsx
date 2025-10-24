import { Routes, Route } from 'react-router-dom';
import HomeMenu from './components/HomeMenu';
import QrScanner from './components/QrScanner';
import QrList from './components/QrList';
import QrReadConfirmation from './components/QrReadConfirmation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/scanner" element={<QrScanner />} />
        <Route path="/qr-list" element={<QrList />} />
        <Route path="/qr-read" element={<QrReadConfirmation />} />
        <Route path="*" element={<HomeMenu />} />
      </Routes>
    </div>
  );
}

export default App;