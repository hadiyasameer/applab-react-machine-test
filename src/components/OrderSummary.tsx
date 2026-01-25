import { useCart } from "../hooks/useCart";
import QuantityStepper from "./QuantityStepper";

interface OrderSummaryProps {
  hideActions?: boolean;
}

const OrderSummary = ({ hideActions = false }: OrderSummaryProps) => {
  const { 
    items, 
    subtotal, 
    tax, 
    discount, 
    total, 
    changeQuantity, 
    removeItem 
  } = useCart();

  return (
    <div className="flex flex-col h-full">
      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.productId} className="flex justify-between items-center border-b border-gray-50 pb-3">
            <div className="flex gap-3">
              <img src={item.image} className="w-14 h-14 object-contain bg-gray-50 rounded-md p-1" alt={item.name} />
              <div>
                <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                <p className="text-xs text-purple-600 font-semibold">${item.price}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {!hideActions ? (
                <>
                  <QuantityStepper 
                    quantity={item.quantity} 
                    onChange={(q) => changeQuantity(item.productId, q)} 
                  />
                  <button 
                    onClick={() => removeItem(item.productId)} 
                    className="text-[10px] text-red-500 font-bold uppercase tracking-tighter hover:underline"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity}</p>
                  <p className="text-sm font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t-2 border-gray-100 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Tax (5%)</span>
          <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
            <span>Discount (10% Off)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-xl font-black text-gray-900 pt-3 mt-2 border-t border-gray-100">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;