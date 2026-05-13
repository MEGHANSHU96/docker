import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-white">
      {/* Top rule */}
      <div className="border-t border-white/5" />

      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3
            className="text-2xl tracking-[0.12em] font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TIKKLE
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Bold pieces for the generation that refuses to blend in. Street culture meets high-fashion sensibility.
          </p>
          <div className="flex gap-5 mt-8">
            {["Instagram", "TikTok", "Pinterest"].map((s) => (
              <span
                key={s}
                className="text-[10px] tracking-[0.3em] uppercase text-gray-600 hover:text-yellow-500 cursor-pointer transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.45em] uppercase mb-6 text-yellow-500">
            Quick Links
          </h4>
          <ul className="space-y-3.5">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
              { to: "/cart", label: "Cart" },
              { to: "/wishlist", label: "Wishlist" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="text-[10px] font-semibold tracking-[0.45em] uppercase mb-6 text-yellow-500">
            Info
          </h4>
          <ul className="space-y-3.5 text-sm text-gray-500">
            {["Shipping & Returns", "Size Guide", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item}>
                <span className="hover:text-white cursor-pointer transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} Tikkle. All rights reserved.
        </p>
        <p className="text-[10px] text-gray-700 tracking-widest uppercase">
          Bold · Modern · Inclusive
        </p>
      </div>
    </footer>
  );
}
