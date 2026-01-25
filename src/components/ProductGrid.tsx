import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: any[];
  onOpenCart: () => void;
  searchTerm: string;
  onReset: () => void;
}

const ProductGrid = ({ products, onOpenCart, searchTerm, onReset }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <p className="text-gray-400 font-medium">No results for "{searchTerm}"</p>
        <button onClick={onReset} className="text-purple-600 text-sm font-bold mt-2 hover:underline">
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onOpenCart={onOpenCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;