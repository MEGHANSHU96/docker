import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-white">
      <div className="overflow-hidden aspect-[3/4] bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 ${product.tag === "Sale" ? "bg-red-500 text-white" : "bg-yellow-600 text-white"}`}>
            {product.tag}
          </span>
        )}
        <button
          onClick={() => addItem({ ...product, selectedSize: product.sizes[0] })}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-xs tracking-widest py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          QUICK ADD
        </button>
      </div>
      <div className="mt-3">
        <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-yellow-700 transition">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-0.5">${product.price}</p>
      </div>
    </div>
  );
}
