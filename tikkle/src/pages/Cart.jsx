import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem, updateQty, totalPrice, clearCart } = useCart();

  if (cart.length === 0) return (
    <div className="text-center py-32">
      <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
      <p className="text-gray-400 text-sm mb-8">Add some pieces to get started.</p>
      <Link to="/shop" className="bg-black text-white px-10 py-3 text-sm tracking-widest hover:bg-yellow-700 transition">
        SHOP NOW
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="divide-y divide-gray-100">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 py-6">
            <div className="w-24 h-32 bg-gray-100 overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Size: {item.selectedSize}</p>
                  {item.selectedColor && <p className="text-xs text-gray-400">Color: {item.selectedColor}</p>}
                </div>
                <p className="font-semibold">${item.price * item.qty}</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => item.qty > 1 ? updateQty(item.id, item.selectedSize, item.qty - 1) : removeItem(item.id, item.selectedSize)}
                    className="px-3 py-1 hover:bg-gray-100 transition text-sm"
                  >−</button>
                  <span className="px-3 py-1 text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)}
                    className="px-3 py-1 hover:bg-gray-100 transition text-sm"
                  >+</button>
                </div>
                <button
                  onClick={() => removeItem(item.id, item.selectedSize)}
                  className="text-xs text-gray-400 hover:text-red-500 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-100 pt-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">${totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Shipping</span>
          <span>{totalPrice >= 150 ? <span className="text-green-600">Free</span> : "$12"}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-100">
          <span>Total</span>
          <span>${totalPrice >= 150 ? totalPrice : totalPrice + 12}</span>
        </div>

        <button className="w-full bg-black text-white py-4 mt-8 text-sm tracking-widest hover:bg-yellow-700 transition">
          PROCEED TO CHECKOUT
        </button>
        <button onClick={clearCart} className="w-full text-xs text-gray-400 hover:text-red-500 transition mt-3">
          Clear Cart
        </button>
      </div>
    </div>
  );
}
