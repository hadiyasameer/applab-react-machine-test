import { useState, useMemo } from "react";
import products from "../data/products.json";

export const useProductFilter = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [search, category, sortBy]);

  return { search, setSearch, category, setCategory, categories, filteredProducts, setSortBy };
};