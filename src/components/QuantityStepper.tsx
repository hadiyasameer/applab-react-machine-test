import type { FC } from "react";

interface Props {
  quantity: number;
  onChange: (newQuantity: number) => void;
}

const QuantityStepper: FC<Props> = ({ quantity, onChange }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-1 space-x-3">
      <button
        onClick={() => onChange(quantity - 1)}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
      >
        –
      </button>
      
      <span className="font-bold text-sm min-w-[20px] text-center">
        {quantity}
      </span>

      <button
        onClick={() => onChange(quantity + 1)}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-purple-50 hover:text-purple-600 transition-colors"
        disabled={quantity >= 5}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;