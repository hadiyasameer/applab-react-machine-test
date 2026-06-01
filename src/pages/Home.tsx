import { useState } from "react";
import ProductList from "../components/ProductList";
import CartSidebar from "../components/CartSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-6">
        <Header onOpenCart={() => setIsCartOpen(true)} />

        <HeroSection />

        <ProductList onOpenCart={() => setIsCartOpen(true)} />
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CartSidebar onClose={() => setIsCartOpen(false)} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;