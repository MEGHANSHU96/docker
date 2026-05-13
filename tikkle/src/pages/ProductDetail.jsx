import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function buildGallery(imageUrl) {
  const base = imageUrl.split("?")[0];
  return [
    `${base}?w=700&auto=format&fit=crop&crop=top`,
    `${base}?w=700&auto=format&fit=crop&crop=center`,
    `${base}?w=700&auto=format&fit=crop&crop=bottom`,
  ];
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    setSelectedSize("");
    setSelectedColor("");
    setActiveImg(0);
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const stored = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const updated = [product.id, ...stored.filter((i) => i !== product.id)].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    const recentIds = updated.filter((i) => i !== product.id).slice(0, 4);
    setRecentlyViewed(products.filter((p) => recentIds.includes(p.id)));
  }, [product?.id]);

  if (!product) return (
    <div className="text-center py-40">
      <p className="text-gray-300 text-5xl mb-6">404</p>
      <p className="text-gray-400 text-sm mb-6">Product not found.</p>
      <Link to="/shop" className="text-[10px] tracking-[0.35em] uppercase border-b border-black pb-px hover:text-yellow-600 hover:border-yellow-600 transition-colors">
        Back to Shop
      </Link>
    </div>
  );

  const gallery = buildGallery(product.image);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    if (!selectedSize) { alert("Please select a size."); return; }
    addItem({ ...product, selectedSize, selectedColor: selectedColor || product.colors[0] });
    showToast("Added to cart");
  };

  return (
    <div className="bg-[#fafaf8]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gray-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="aspect-[3/4] bg-[#f0ede8] overflow-hidden">
              <img src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3 mt-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 aspect-[3/4] overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-yellow-600" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center md:py-6">
            {product.tag && (
              <span className="text-[10px] tracking-[0.45em] uppercase text-yellow-600 mb-4 font-medium">
                {product.tag}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{product.name}</h1>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gray-400 mb-6">{product.category}</p>
            <p className="text-3xl font-bold mb-10 tracking-tight">${product.price}</p>

            {/* Color */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.45em] uppercase font-medium mb-3 text-gray-500">
                Color — <span className="text-black">{selectedColor || product.colors[0]}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 text-xs border transition-all ${
                      selectedColor === c || (!selectedColor && c === product.colors[0])
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.45em] uppercase font-medium mb-3 text-gray-500">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-13 min-w-[3rem] px-3 py-2.5 text-xs border transition-all ${
                      selectedSize === s
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-[#0e0e0e] hover:bg-yellow-700 text-white py-4 text-[10px] tracking-[0.4em] uppercase transition-colors font-medium"
              >
                Add to Cart
              </button>
              <button
                onClick={() => { toggleWishlist(product); showToast(isWishlisted(product.id) ? "Removed from wishlist" : "Saved to wishlist"); }}
                className={`w-14 border flex items-center justify-center transition-all ${
                  wishlisted ? "border-yellow-600 bg-yellow-50" : "border-gray-200 hover:border-gray-400"
                }`}
                aria-label="Toggle wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill={wishlisted ? "#ca8a04" : "none"}
                  viewBox="0 0 24 24"
                  stroke={wishlisted ? "#ca8a04" : "#555"}
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-6 leading-relaxed">
              Free shipping on orders over $150 · Easy returns within 30 days.
            </p>

            {/* Details accordion-style row */}
            <div className="mt-10 border-t border-gray-100 pt-6 grid grid-cols-3 text-center gap-4">
              {[
                { label: "Free Returns", icon: "↩" },
                { label: "Secure Payment", icon: "🔒" },
                { label: "Ethically Made", icon: "✦" },
              ].map(({ label, icon }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className="text-base">{icon}</span>
                  <span className="text-[9px] tracking-[0.25em] uppercase text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-28 md:mt-36">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Recently Viewed</h2>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {recentlyViewed.map((p) => (
                <div key={p.id} className="min-w-[180px] md:min-w-[220px] max-w-[220px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-28 md:mt-36">
            <h2 className="text-2xl md:text-3xl font-bold mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
