import CheckoutTabs from "../components/CheckoutTabs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto p-6 w-full flex-grow">
        <Header onOpenCart={() => {}} />

        <main className="py-8">
          <CheckoutTabs />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;