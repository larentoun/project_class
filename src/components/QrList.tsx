import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './QrList.css';

function QrList() {
  const navigate = useNavigate();
  const qrValue = window.location.origin + '/qr-read';

  return (
    <div className="qr-list-container">
      <h2 className="qr-list-title">Список QR кодов</h2>
      <div className="qr-code-container">
        <QRCodeSVG
          value={qrValue}
          size={256}
          level="H"
        />
      </div>
      <button onClick={() => navigate(-1)} className="qr-list-back-button">
        Назад
      </button>
    </div>
  );
}

export default QrList;