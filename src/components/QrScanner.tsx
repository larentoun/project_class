import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner, type IDetectedBarcode } from '@yudiel/react-qr-scanner';
import './QrScanner.css';

function QrScanner() {
  const navigate = useNavigate();
  const [result, setResult] = useState<string | null>(null);

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const decodedText = detectedCodes[0].rawValue;
      console.log('QR-code identified:', decodedText);
      setResult(decodedText);
      // TODO: do something with it
    }
  };

  const handleError = (error: unknown) => {
    console.error('QRScanner Error:', error);

    let errorMessage = 'Unknown error';

    if (error instanceof DOMException) {
      errorMessage = error.message || error.name;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = (error as { message?: string }).message ?? errorMessage;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    alert(`Ошибка доступа к камере: ${errorMessage}`);
  };

  const cameraConstraints: MediaTrackConstraints = {
    facingMode: 'environment',
    aspectRatio: {exact: 4 / 3},
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  return (
    <div className="qr-scanner-container">
      <h2 className="qr-scanner-title">QR-код сканнер 2</h2>
      <div className="qr-scanner-wrapper">
        <Scanner
          onScan={handleScan}
          onError={handleError}
          styles={{ container: { width: '100%' } }}
          constraints={cameraConstraints}
        />
      </div>
      {result && (
        <div className="qr-scanner-result">
          <p><strong>Распознанный QR-код:</strong> {result}</p>
        </div>
      )}
      <button onClick={() => navigate(-1)} className="qr-scanner-back-button">
        Назад
      </button>
    </div>
  );
}

export default QrScanner;