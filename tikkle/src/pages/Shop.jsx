import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [activeCategory, setActiveCategory] = useState(params.get("category") || "All");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(300);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category");
    if (cat) setActiveCategory(cat);
  }, [location.search]);

  let filtered = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const priceMatch = p.price <= maxPrice;
    return catMatch && priceMatch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Shop All</h1>
        <p className="text-gray-500 text-sm">{filtered.length} pieces</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="mb-8">
            <h3 className="text-xs tracking-widest uppercase font-semibold mb-3">Category</h3>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    onClick={() => setActiveCategory(c)}
                    className={`text-sm ${activeCategory === c ? "text-yellow-600 font-semibold" : "text-gray-600 hover:text-black"} transition`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase font-semibold mb-3">Max Price: ${maxPrice}</h3>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-yellow-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$50</span><span>$300</span>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 text-sm px-3 py-2 outline-none focus:border-yellow-600"
            >
              <option value="default">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-20">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
