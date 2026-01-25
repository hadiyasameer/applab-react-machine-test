import { useCart } from "../hooks/useCart";
import QuantityStepper from "./QuantityStepper";

interface ProductCardProps {
  product: any;
  onOpenCart: () => void;
}

const ProductCard = ({ product, onOpenCart }: ProductCardProps) => {
  const { items, addItem, changeQuantity } = useCart();
  const cartItem = items.find((item) => item.productId === product.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="h-48 w-full bg-gray-50/50 flex items-center justify-center p-6">
        <img 
          src={product.image} 
          className="h-full w-full object-contain mix-blend-multiply" 
          alt={product.name} 
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
          <h3 className="text-sm font-bold text-gray-800 mt-1 line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex items-center justify-between mt-5">
          <span className="text-lg font-black text-purple-600">${product.price}</span>
          
          {cartItem ? (
            <div className="scale-90 origin-right">
              <QuantityStepper 
                quantity={cartItem.quantity}
                onChange={(newQty) => changeQuantity(product.id, newQty)}
              />
            </div>
          ) : (
            <button
              onClick={() => {
                addItem({ ...product, productId: product.id, quantity: 1 });
                onOpenCart();
              }}
              className="bg-purple-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-purple-700 active:scale-95 transition-all shadow-lg shadow-purple-100"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;