import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const COLOR_MAP = {
  "Ivory":      "#FFFFF0",
  "Black":      "#111111",
  "Camel":      "#C19A6B",
  "Charcoal":   "#36454F",
  "Beige":      "#F0EBD8",
  "Dusty Rose": "#D4A5A5",
  "Champagne":  "#F7E7CE",
  "Cream":      "#FFFDD0",
  "Red":        "#DC2626",
  "Mocha":      "#6B4226",
  "Sage":       "#87AE73",
  "Tan":        "#C8A882",
  "White":      "#FFFFFF",
  "Blush":      "#F4B8C1",
  "One Size":   "#9CA3AF",
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const [hoveredColor, setHoveredColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const wishlisted = isWishlisted(product.id);
  const isOneSize = product.sizes.length === 1 && product.sizes[0] === "One Size";

  const handleQuickAdd = () => {
    const size = isOneSize ? product.sizes[0] : (selectedSize || product.sizes[0]);
    addItem({ ...product, selectedSize: size });
    showToast("Added to cart");
  };

  return (
    <div className="group relative">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#f0ede8]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Tag */}
        {product.tag && (
          <span className={`absolute top-3 left-3 text-[9px] font-semibold tracking-[0.3em] uppercase px-2.5 py-1 ${
            product.tag === "Sale" ? "bg-red-500 text-white" : "bg-[#0e0e0e] text-white"
          }`}>
            {product.tag}
          </span>
        )}

        {/* Wishlist — visible on hover */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-sm"
          aria-label="Toggle wishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill={wishlisted ? "#ca8a04" : "none"}
            viewBox="0 0 24 24"
            stroke={wishlisted ? "#ca8a04" : "#555"}
            strokeWidth={1.75}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Size chips + Quick Add */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {!isOneSize && (
            <div className="bg-white/96 px-3 pt-3 pb-2 flex gap-1.5 flex-wrap justify-center border-t border-gray-100">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s === selectedSize ? null : s)}
                  className={`w-9 h-8 text-[10px] border transition-colors ${
                    selectedSize === s ? "bg-black text-white border-black" : "border-gray-300 text-gray-700 hover:border-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#0e0e0e] text-white text-[10px] tracking-[0.35em] uppercase py-3.5 hover:bg-yellow-700 transition-colors font-medium"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/product/${product.id}`}
            className="text-[13px] font-medium text-[#111] hover:text-yellow-700 transition-colors leading-snug flex-1"
          >
            {product.name}
          </Link>
          <span className="text-[13px] font-semibold text-[#111] shrink-0">${product.price}</span>
        </div>

        {/* Color name */}
        <p className="text-[11px] text-gray-400 mt-1 min-h-[14px] transition-all">
          {hoveredColor || product.colors[0]}
          {!hoveredColor && product.colors.length > 1 && (
            <span className="text-gray-300 ml-1">+{product.colors.length - 1}</span>
          )}
        </p>

        {/* Swatches */}
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {product.colors.map((c) => (
            <button
              key={c}
              onMouseEnter={() => setHoveredColor(c)}
              onMouseLeave={() => setHoveredColor(null)}
              title={c}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                hoveredColor === c ? "ring-1 ring-offset-1 ring-gray-500 scale-110" : ""
              } ${c === "White" || c === "Ivory" || c === "Cream" ? "border border-gray-200" : ""}`}
              style={{ backgroundColor: COLOR_MAP[c] || "#ccc" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
