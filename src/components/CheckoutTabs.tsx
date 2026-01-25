import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "../hooks/useCart";
import { clearCart } from "../app/cartSlice";
import  OrderSummary  from "./OrderSummary";

const CheckoutTabs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isMinValueMet, items } = useCart();

  const [step, setStep] = useState(0);
  const [shippingData, setShippingData] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({ name: "", email: "", address: "" });

  const steps = ["Cart Review", "Shipping", "Payment Summary"];

  // Form Validation 
  const validate = () => {
    const newErrors = { name: "", email: "", address: "" };
    let isValid = true;

    if (!shippingData.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    }

    if (!shippingData.address.trim()) {
      newErrors.address = "Shipping address is required";
      isValid = false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(shippingData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (validate()) setStep((s) => s + 1);
    } else if (step === steps.length - 1) {
      handleFinish();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleFinish = () => {
    dispatch(clearCart());
    alert("Order Placed Successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between relative max-w-2xl mx-auto">
        {steps.map((label, index) => (
          <div key={label} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                index <= step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-xs mt-2 font-semibold ${
                index <= step ? "text-purple-600" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-0" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[450px] flex flex-col">
         {/* CART REVIEW  */}
        {step === 0 && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800">Review Your Items</h2>
            <OrderSummary />
          </div>
        )}

        {/* SHIPPING FORM */}
        {step === 1 && (
          <div className="space-y-6 max-w-md mx-auto w-full animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800">Shipping Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={shippingData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full p-3 border rounded-xl outline-none transition-all ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-purple-500"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={shippingData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className={`w-full p-3 border rounded-xl outline-none transition-all ${
                    errors.email ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-purple-500"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingData.address}
                  onChange={handleInputChange}
                  placeholder="Street address, City, ZIP"
                  className={`w-full p-3 border rounded-xl outline-none transition-all ${
                    errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-purple-500"
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>
        )}

        {/* PAYMENT*/}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
              <h3 className="text-sm font-bold text-purple-900 mb-1">Shipping to:</h3>
              <p className="text-sm text-purple-800">{shippingData.name}</p>
              <p className="text-xs text-purple-700">{shippingData.address}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <OrderSummary hideActions={true} />
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-6 py-2 font-bold text-gray-400 hover:text-purple-600 disabled:opacity-0 transition-all uppercase text-sm tracking-wider"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={step === 0 && (!isMinValueMet || items.length === 0)}
          className="px-10 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:bg-gray-200 disabled:text-gray-400 shadow-xl shadow-purple-100 transition-all active:scale-95"
        >
          {step === steps.length - 1 ? "Place Order Now" : "Continue to Next Step →"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutTabs;