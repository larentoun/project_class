import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsQR, { type QRCode } from 'jsqr';
import './QrScanner.css';

function QrScanner() {
  const navigate = useNavigate();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
            advanced: [{ 
              //@ts-expect-error low support
              focusMode: 'continuous' }]
          }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          await videoRef.current.play();

          scanFrame();
        }
      } catch (err) {
        console.error('Ошибка доступа к камере:', err);
        setError(`Ошибка доступа к камере: ${(err as Error).message || 'Неизвестная ошибка'}`);
      }
    };

    const scanFrame = () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

          const code: QRCode | null = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            console.log('QR-код распознан:', code.data);
            setResult(code.data);
            cancelAnimationFrame(animationFrameId);
            stream?.getTracks().forEach(track => track.stop());
          }
        }
        animationFrameId = requestAnimationFrame(scanFrame);
      }
    };

    startCamera();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  if (error) {
    return (
      <div className="qr-scanner-container">
        <h2 className="qr-scanner-title">QR-код сканнер</h2>
        <div className="qr-scanner-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="qr-scanner-retry-button">
            Повторить
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="qr-scanner-back-button">
          Назад
        </button>
      </div>
    );
  }

  return (
    <div className="qr-scanner-container">
      <h2 className="qr-scanner-title">QR-код сканнер jsqr2</h2>
      <div className="qr-scanner-wrapper">
        <video
          ref={videoRef}
          style={{ width: '100%', maxWidth: '500px', height: 'auto', maxHeight: '70vh', objectFit: 'cover', border: '2px solid #007bff', borderRadius: '5px' }}
          playsInline
          muted
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
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