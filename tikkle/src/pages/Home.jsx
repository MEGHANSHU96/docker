import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const TICKER = [
  "New Collection SS 2025",
  "Free Shipping Over $150",
  "Bold · Modern · Inclusive",
  "Easy Returns · 30 Days",
  "New Drops Every Week",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const featured = products.filter((p) => p.tag === "New" || p.tag === "Bestseller").slice(0, 4);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#0e0e0e]">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-16 md:pb-28 w-full">
          <p className="text-[10px] tracking-[0.55em] uppercase text-yellow-500 mb-6 font-medium">
            New Collection — SS 2025
          </p>
          <h1
            className="font-bold text-white leading-[0.88] mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
            }}
          >
            Wear<br />Your<br />True Self
          </h1>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/shop"
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-10 py-4 text-[10px] tracking-[0.4em] uppercase transition-colors duration-300 font-medium"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="text-white/70 hover:text-white text-[10px] tracking-[0.4em] uppercase transition-colors border-b border-white/25 hover:border-white pb-px"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-3">
          <span className="text-white/30 text-[9px] tracking-[0.45em] uppercase -rotate-90 origin-center">Scroll</span>
          <div className="w-px h-12 bg-white/20" />
        </div>
      </section>

      {/* ── Ticker ── */}
      <div className="bg-[#0e0e0e] border-t border-white/5 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "ticker 22s linear infinite" }}>
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="text-white/50 text-[10px] tracking-[0.35em] uppercase mx-8 shrink-0">
              {item}
              <span className="text-yellow-600 mx-6">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured ── */}
      <section className="py-24 md:py-36 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-600 mb-3 font-medium">01 / Featured</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase group"
            >
              <span className="border-b border-black pb-px group-hover:text-yellow-600 group-hover:border-yellow-600 transition-colors">
                View All
              </span>
              <span className="text-gray-400 group-hover:text-yellow-600 transition-colors">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-12 md:hidden">
            <Link
              to="/shop"
              className="inline-block text-[10px] tracking-[0.35em] uppercase border-b border-black pb-px hover:text-yellow-600 hover:border-yellow-600 transition-colors"
            >
              View All Pieces
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Statement ── */}
      <section className="bg-[#0e0e0e] py-28 md:py-44">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="w-10 h-px bg-yellow-600 mx-auto mb-14" />
          <p className="text-[10px] tracking-[0.55em] uppercase text-yellow-500 mb-10 font-medium">
            Our Philosophy
          </p>
          <blockquote
            className="text-3xl md:text-5xl lg:text-[3.6rem] font-bold text-white leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "Fashion is not just clothing.<br className="hidden md:block" />
            It's a conversation."
          </blockquote>
          <p className="text-gray-500 mt-10 text-sm leading-relaxed max-w-md mx-auto">
            Tikkle blends street culture with high-fashion sensibility — pieces that spark dialogue and push boundaries.
          </p>
          <div className="w-10 h-px bg-yellow-600 mx-auto mt-14" />
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-24 md:py-36 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-[10px] tracking-[0.5em] uppercase text-yellow-600 mb-3 font-medium">02 / Shop</p>
            <h2 className="text-4xl md:text-5xl font-bold">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Tops",      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&auto=format&fit=crop" },
              { label: "Bottoms",   img: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=700&auto=format&fit=crop" },
              { label: "Dresses",   img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&auto=format&fit=crop" },
              { label: "Outerwear", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700&auto=format&fit=crop" },
            ].map((cat) => (
              <Link
                key={cat.label}
                to={`/shop?category=${cat.label}`}
                className="group relative overflow-hidden block aspect-[3/4]"
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-6">
                  <span className="text-white font-semibold text-base md:text-lg tracking-wide block leading-none">
                    {cat.label}
                  </span>
                  <span className="text-yellow-400 text-[10px] tracking-[0.35em] uppercase mt-2 block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 md:py-36 bg-[#f0ede8]">
        <div className="max-w-lg mx-auto text-center px-8">
          <p className="text-[10px] tracking-[0.55em] uppercase text-yellow-600 mb-5 font-medium">Exclusive Access</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Join the<br />Tikkle Circle
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            Be first to discover new drops, receive exclusive offers, and get style inspiration in your inbox.
          </p>
          {subscribed ? (
            <p className="text-green-800 font-medium tracking-wide text-sm">You're in — welcome to the circle.</p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="flex shadow-sm"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border border-gray-200 border-r-0 px-5 py-4 text-sm outline-none focus:border-black transition-colors bg-white min-w-0"
              />
              <button
                type="submit"
                className="bg-black text-white px-7 py-4 text-[10px] tracking-[0.35em] uppercase hover:bg-yellow-700 transition-colors font-medium whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
