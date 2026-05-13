import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

export default function Navbar() {
  const { totalItems } = useCart();
  const { totalWishlisted } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const searchResults = searchQuery.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const toggleSearch = () => { setSearchOpen((p) => !p); setSearchQuery(""); };

  return (
    <nav className="sticky top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-[#0e0e0e] py-2 text-center">
        <p className="text-[10px] tracking-[0.45em] uppercase text-white/55">
          Free Shipping on Orders Over $150
        </p>
      </div>

      {/* Main bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl tracking-[0.15em] font-bold text-[#0e0e0e]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TIKKLE
          </Link>

          <div className="hidden md:flex items-center gap-9 text-[11px] font-medium tracking-[0.18em] uppercase">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-600 relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-yellow-600"
                    : "text-gray-500 hover:text-black transition-colors relative"
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {/* Search */}
            <button onClick={toggleSearch} aria-label="Search" className="text-gray-500 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative text-gray-500 hover:text-black transition-colors" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {totalWishlisted > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {totalWishlisted}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-500 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[20px] w-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button className="md:hidden text-gray-500 hover:text-black transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="bg-white border-b border-gray-100 px-8 py-4">
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-1.5 text-sm outline-none bg-transparent border-b border-gray-200 focus:border-black transition-colors"
              />
              <button onClick={toggleSearch} className="text-gray-300 hover:text-black transition-colors shrink-0" aria-label="Close search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 shadow-xl z-50 mt-1 overflow-hidden">
                {searchResults.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleResultClick(p.id)}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-[#fafaf8] transition-colors w-full text-left border-b border-gray-50 last:border-0"
                  >
                    <div className="w-9 h-12 bg-gray-100 overflow-hidden shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{p.category}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 shrink-0">${p.price}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-white border-b border-gray-100 px-8 py-6 flex flex-col gap-5 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-[11px] tracking-[0.2em] uppercase font-medium ${isActive ? "text-yellow-600" : "text-gray-500 hover:text-black"} transition-colors`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-[11px] tracking-[0.2em] uppercase font-medium ${isActive ? "text-yellow-600" : "text-gray-500 hover:text-black"} transition-colors`
            }
          >
            Wishlist {totalWishlisted > 0 && `(${totalWishlisted})`}
          </NavLink>
        </div>
      )}
    </nav>
  );
}
