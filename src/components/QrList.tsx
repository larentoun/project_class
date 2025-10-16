import { useNavigate } from 'react-router-dom';
import './QrList.css';

function QrList() {
  const navigate = useNavigate();

  return (
    <div className="qr-list-container">
      <h2 className="qr-list-title">Список QR кодов</h2>
      <p>Здесь будет список QR-кодов.</p>
      <button onClick={() => navigate(-1)} className="qr-list-back-button">
        Назад
      </button>
    </div>
  );
}

export default QrList;