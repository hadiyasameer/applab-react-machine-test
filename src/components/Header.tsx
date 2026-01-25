import { useCart } from '../hooks/useCart';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenCart: () => void;
}

const Header = ({ onOpenCart }: HeaderProps) => {
  const { items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isCartPage = location.pathname === '/cart' || location.pathname === '/checkout';

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="flex justify-between items-center mb-8">
      <h1
        className="text-3xl font-bold text-purple-700 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/')}
      >
        TechStore
      </h1>
      <div className="flex items-center">
        {isCartPage ? (
          <button
            onClick={() => navigate('/')}
            className="text-sm font-bold text-gray-500 hover:text-purple-600 transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span className="border-b border-transparent hover:border-purple-600">
              Back to Shopping
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenCart}
            className="relative bg-white px-6 py-2 rounded-full shadow-md border border-purple-100 font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            <span>View Cart</span>
            {itemCount > 0 && (
              <span className="flex items-center justify-center bg-purple-600 text-white text-[10px] font-bold w-5 h-5 rounded-full animate-popIn">
                {itemCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;