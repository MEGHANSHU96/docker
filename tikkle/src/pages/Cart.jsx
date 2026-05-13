import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeItem, updateQty, totalPrice, clearCart } = useCart();

  if (cart.length === 0) return (
    <div className="bg-[#fafaf8] min-h-[70vh] flex flex-col items-center justify-center px-8 py-32 text-center">
      <div className="w-24 h-24 rounded-full bg-[#f0ede8] flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
      <p className="text-gray-400 text-sm mb-10 max-w-xs">Looks like you haven't added anything yet. Explore our latest pieces.</p>
      <Link
        to="/shop"
        className="bg-[#0e0e0e] text-white px-12 py-4 text-[10px] tracking-[0.4em] uppercase hover:bg-yellow-700 transition-colors font-medium"
      >
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-8 py-14 md:py-16">
          <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-600 mb-3 font-medium">Your Selection</p>
          <h1 className="text-4xl md:text-5xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          {/* Items */}
          <div className="divide-y divide-gray-100">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-5 py-7">
                <div className="w-20 h-28 bg-[#f0ede8] overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">Size: {item.selectedSize}</p>
                      {item.selectedColor && <p className="text-xs text-gray-400">Color: {item.selectedColor}</p>}
                    </div>
                    <p className="font-bold text-sm shrink-0">${item.price * item.qty}</p>
                  </div>
                  <div className="flex items-center gap-5 mt-5">
                    <div className="flex items-center border border-gray-200 bg-white">
                      <button
                        onClick={() => item.qty > 1 ? updateQty(item.id, item.selectedSize, item.qty - 1) : removeItem(item.id, item.selectedSize)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm text-gray-600"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      className="text-[10px] tracking-[0.2em] uppercase text-gray-300 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white border border-gray-100 p-7 sticky top-36">
              <h3 className="text-[10px] tracking-[0.45em] uppercase font-semibold text-gray-400 mb-7">Order Summary</h3>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={totalPrice >= 150 ? "text-green-700 font-medium" : "font-medium"}>
                    {totalPrice >= 150 ? "Free" : "$12"}
                  </span>
                </div>
                {totalPrice < 150 && (
                  <p className="text-[10px] text-gray-400 tracking-wide bg-[#fafaf8] px-3 py-2">
                    Add ${150 - totalPrice} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between font-bold text-base mt-7 pt-7 border-t border-gray-100">
                <span>Total</span>
                <span>${totalPrice >= 150 ? totalPrice : totalPrice + 12}</span>
              </div>

              <button className="w-full bg-[#0e0e0e] text-white py-4 mt-7 text-[10px] tracking-[0.4em] uppercase hover:bg-yellow-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full text-[10px] tracking-[0.25em] uppercase text-gray-300 hover:text-red-500 transition-colors mt-4 py-1"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
