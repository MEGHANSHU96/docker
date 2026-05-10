import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const featured = products.filter((p) => p.tag === "New" || p.tag === "Bestseller").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 text-yellow-400">New Collection — SS 2025</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Wear Your<br />True Self
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-md mx-auto">
            Bold pieces for the generation that refuses to blend in.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-3 text-sm tracking-widest transition"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-yellow-600 mb-2">Curated For You</p>
          <h2 className="text-4xl font-bold">Featured Pieces</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="border border-black px-10 py-3 text-sm tracking-widest hover:bg-black hover:text-white transition">
            VIEW ALL
          </Link>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="bg-black text-white py-24 text-center px-6">
        <p className="text-xs tracking-[0.4em] uppercase text-yellow-500 mb-4">Our Philosophy</p>
        <h2 className="text-4xl md:text-5xl font-bold max-w-3xl mx-auto leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          Fashion is not just clothing. It's a conversation.
        </h2>
        <p className="text-gray-400 mt-6 max-w-xl mx-auto text-sm leading-relaxed">
          Tikkle blends street culture with high-fashion sensibility — pieces that spark dialogue and push boundaries.
        </p>
      </section>

      {/* Category Tiles */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Tops", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop" },
            { label: "Bottoms", img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&auto=format&fit=crop" },
            { label: "Dresses", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop" },
            { label: "Outerwear", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop" },
          ].map((cat) => (
            <Link key={cat.label} to={`/shop?category=${cat.label}`} className="group relative aspect-square overflow-hidden">
              <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition" />
              <span className="absolute bottom-4 left-4 text-white font-semibold text-lg tracking-wide">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-20 text-center px-6">
        <p className="text-xs tracking-widest uppercase text-yellow-600 mb-2">Stay In The Loop</p>
        <h2 className="text-3xl font-bold mb-3">Join The Tikkle Circle</h2>
        <p className="text-gray-500 text-sm mb-8">Get early access to drops, exclusive offers, and style inspiration.</p>
        {subscribed ? (
          <p className="text-green-600 font-medium">You're in! Welcome to the circle.</p>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border border-gray-300 px-4 py-3 text-sm outline-none focus:border-yellow-600"
            />
            <button type="submit" className="bg-black text-white px-8 py-3 text-sm tracking-widest hover:bg-yellow-700 transition">
              SUBSCRIBE
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
