import { useNavigate } from 'react-router-dom';
import './QrScanner.css';

function QrScanner() {
  const navigate = useNavigate();

  return (
    <div className="qr-scanner-container">
      <h2 className="qr-scanner-title">QR-код сканнер</h2>
      <div className="qr-scanner-placeholder">
        <p>Здесь будет отображаться видео с камеры для сканирования QR-кода</p>
      </div>
      <button onClick={() => navigate(-1)} className="qr-scanner-back-button">
        Назад
      </button>
    </div>
  );
}

export default QrScanner;