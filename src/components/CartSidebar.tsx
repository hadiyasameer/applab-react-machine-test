import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import QuantityStepper from "./QuantityStepper";

interface CartSidebarProps {
  onClose?: () => void;
}

const CartSidebar = ({ onClose }: CartSidebarProps) => {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const {
    items,
    subtotal,
    tax,
    discount,
    total,
    isMinValueMet,
    changeQuantity,
    removeItem
  } = useCart();

  const handleFinalRedirect = () => {
    onClose?.();
    navigate("/checkout");
  };

  return (
    <div className="bg-white h-full flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          {isCheckingOut ? "Confirm Order" : "Your Cart"}
        </h2>
        <button onClick={() => onClose?.()} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {items.length > 0 ? (
          <>
            {isCheckingOut && (
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
                <p className="text-sm text-purple-800 font-medium text-center">
                  Review your items before payment.
                </p>
              </div>
            )}

            {/* Items List */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                    <img src={item.image} className="max-h-full max-w-full object-contain" alt={item.name} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-800 truncate">{item.name}</h4>
                    <p className="text-purple-600 font-bold text-xs">${item.price}</p>

                    {!isCheckingOut ? (
                      <div className="flex items-center justify-between mt-2">
                        <QuantityStepper
                          quantity={item.quantity}
                          onChange={(q) => changeQuantity(item.productId, q)}
                        />
                        <button onClick={() => removeItem(item.productId)} className="text-xs text-red-500 hover:underline">Remove</button>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <span className="text-xs text-gray-500 font-medium">Quantity: {item.quantity}</span>
                        <span className="text-xs text-gray-500 mx-2">|</span>
                        <span className="text-xs text-gray-800 font-bold">Line Total: ${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary */}
      <div className="p-6 bg-gray-50 border-t space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600 font-bold">
            <span>Discount (10% Off)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-lg font-black border-t pt-3 mt-2 text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {!isMinValueMet && items.length > 0 && (
          <p className="text-[10px] text-red-500 text-center font-bold uppercase tracking-widest mt-2">
            Add ${(10 - subtotal).toFixed(2)} more to checkout
          </p>
        )}

        <button
          disabled={!isMinValueMet || items.length === 0}
          onClick={isCheckingOut ? handleFinalRedirect : () => setIsCheckingOut(true)}
          className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg mt-2 text-white disabled:bg-gray-300 ${isCheckingOut ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
            }`}
        >
          {isCheckingOut ? "Confirm & Pay Now" : "Checkout Now"}
        </button>

        {isCheckingOut && (
          <button
            onClick={() => setIsCheckingOut(false)}
            className="w-full text-xs text-gray-500 py-1 hover:text-gray-800 underline transition-colors"
          >
            Back to Edit Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;