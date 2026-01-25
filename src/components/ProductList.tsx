import { useProductFilter } from "../hooks/useProductFilter";
import ProductGrid from "./ProductGrid";

interface ProductListProps {
  onOpenCart: () => void;
}

const ProductList = ({ onOpenCart }: ProductListProps) => {
  const { search, setSearch, category, setCategory, categories, filteredProducts,setSortBy } = useProductFilter();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 border p-2.5 rounded-lg outline-purple-600 focus:ring-2 focus:ring-purple-100 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2.5 rounded-lg outline-purple-600 cursor-pointer bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="border p-2.5 rounded-lg outline-purple-600 cursor-pointer bg-white"
          onChange={(e) => setSortBy(e.target.value)} 
        >
          <option value="default">Sort by Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <ProductGrid
        products={filteredProducts}
        onOpenCart={onOpenCart}
        searchTerm={search}
        onReset={() => { setSearch(''); setCategory('All'); }}
      />
    </div>
  );
};

export default ProductList;