import { useNavigate } from 'react-router-dom';
import './QrReadConfirmation.css';

function QrReadConfirmation() {
    const navigate = useNavigate();
    return (
        <div className="confirmation-container">
        <h1 className="confirmation-title">Прочитан QR код!</h1>
        <button onClick={() => navigate(-1)} className="confirmation-back-button">
            Назад
        </button>
        </div>
    );
}

export default QrReadConfirmation;