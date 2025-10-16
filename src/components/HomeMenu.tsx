import { Link } from 'react-router-dom';
import './HomeMenu.css'

function HomeMenu() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Меню</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/scanner" className='menu-button'>
          QR-код сканнер
        </Link>
        <Link to="/qr-list" className='menu-button'>
          Список QR кодов
        </Link>
      </div>
    </div>
  );
}

export default HomeMenu;