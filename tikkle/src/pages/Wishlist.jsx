import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product) => {
    addItem({ ...product, selectedSize: product.sizes[0] });
    toggleWishlist(product);
    showToast("Moved to cart");
  };

  if (wishlist.length === 0) return (
    <div className="bg-[#fafaf8] min-h-[70vh] flex flex-col items-center justify-center px-8 py-32 text-center">
      <div className="w-24 h-24 rounded-full bg-[#f0ede8] flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-3">Your wishlist is empty</h2>
      <p className="text-gray-400 text-sm mb-10 max-w-xs">Save pieces you love and come back to them any time.</p>
      <Link
        to="/shop"
        className="bg-[#0e0e0e] text-white px-12 py-4 text-[10px] tracking-[0.4em] uppercase hover:bg-yellow-700 transition-colors font-medium"
      >
        Browse Products
      </Link>
    </div>
  );

  return (
    <div className="bg-[#fafaf8]">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-14 md:py-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-600 mb-3 font-medium">Saved Pieces</p>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl md:text-5xl font-bold">My Wishlist</h1>
            <span className="text-sm text-gray-400 pb-1">
              {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {wishlist.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative overflow-hidden aspect-[3/4] bg-[#f0ede8]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                {product.tag && (
                  <span className={`absolute top-3 left-3 text-[9px] font-semibold tracking-[0.3em] uppercase px-2.5 py-1 ${
                    product.tag === "Sale" ? "bg-red-500 text-white" : "bg-[#0e0e0e] text-white"
                  }`}>
                    {product.tag}
                  </span>
                )}

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Move to cart */}
                <button
                  onClick={() => handleMoveToCart(product)}
                  className="absolute inset-x-0 bottom-0 bg-[#0e0e0e] text-white text-[10px] tracking-[0.35em] uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-yellow-700"
                >
                  Move to Cart
                </button>
              </div>

              <div className="mt-3.5">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/product/${product.id}`} className="text-[13px] font-medium hover:text-yellow-700 transition-colors leading-snug flex-1">
                    {product.name}
                  </Link>
                  <span className="text-[13px] font-semibold shrink-0">${product.price}</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
