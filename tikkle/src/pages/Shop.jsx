import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

function SkeletonCard() {
  return (
    <div>
      <div className="aspect-[3/4] shimmer" />
      <div className="mt-3.5 space-y-2">
        <div className="h-3.5 shimmer w-4/5" />
        <div className="h-3 shimmer w-1/3" />
        <div className="flex gap-1.5 mt-2">
          {[1, 2, 3].map((i) => <div key={i} className="w-3.5 h-3.5 rounded-full shimmer" />)}
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [activeCategory, setActiveCategory] = useState(params.get("category") || "All");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(300);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get("category");
    if (cat) setActiveCategory(cat);
  }, [location.search]);

  let filtered = products.filter((p) => {
    return (activeCategory === "All" || p.category === activeCategory) && p.price <= maxPrice;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Page header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-14 md:py-20">
          <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-600 mb-3 font-medium">Collection</p>
          <h1 className="text-4xl md:text-5xl font-bold">Shop All</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="md:w-52 shrink-0">
            <div className="md:sticky md:top-36">
              {/* Category */}
              <div className="mb-10">
                <p className="text-[10px] tracking-[0.45em] uppercase font-semibold text-gray-400 mb-5">
                  Category
                </p>
                <ul className="space-y-2.5">
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        onClick={() => setActiveCategory(c)}
                        className={`text-sm transition-colors flex items-center gap-2 ${
                          activeCategory === c ? "text-black font-semibold" : "text-gray-400 hover:text-black"
                        }`}
                      >
                        {activeCategory === c && (
                          <span className="w-3 h-px bg-yellow-600 inline-block" />
                        )}
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div>
                <p className="text-[10px] tracking-[0.45em] uppercase font-semibold text-gray-400 mb-5">
                  Max Price
                </p>
                <p className="text-2xl font-bold mb-5 tracking-tight">${maxPrice}</p>
                <input
                  type="range"
                  min={50}
                  max={300}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-yellow-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-300 mt-2 tracking-widest">
                  <span>$50</span>
                  <span>$300</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-10">
              <p className="text-xs text-gray-400">
                {loading ? "—" : `${filtered.length} pieces`}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 hidden sm:block">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 text-xs px-4 py-2.5 outline-none focus:border-black transition-colors bg-white cursor-pointer"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-gray-300 text-5xl mb-6">∅</p>
                <p className="text-gray-400 text-sm">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
