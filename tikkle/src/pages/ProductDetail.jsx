import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="text-center py-32">
      <p className="text-gray-400">Product not found.</p>
      <Link to="/shop" className="text-yellow-600 text-sm mt-4 inline-block">Back to Shop</Link>
    </div>
  );

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize) { alert("Please select a size."); return; }
    addItem({ ...product, selectedSize, selectedColor: selectedColor || product.colors[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {product.tag && (
            <span className="text-xs tracking-widest uppercase text-yellow-600 mb-2">{product.tag}</span>
          )}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-400 text-sm mb-1">{product.category}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase font-semibold mb-2">
              Color: <span className="text-yellow-700 normal-case font-normal">{selectedColor || product.colors[0]}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-4 py-1.5 text-xs border transition ${selectedColor === c || (!selectedColor && c === product.colors[0]) ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase font-semibold mb-2">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-10 text-xs border transition ${selectedSize === s ? "border-black bg-black text-white" : "border-gray-300 hover:border-black"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`py-4 text-sm tracking-widest transition ${added ? "bg-green-600 text-white" : "bg-black hover:bg-yellow-700 text-white"}`}
          >
            {added ? "ADDED TO CART" : "ADD TO CART"}
          </button>

          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Free shipping on orders over $150. Easy returns within 30 days.
          </p>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
