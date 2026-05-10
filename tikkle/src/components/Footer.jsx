import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-2xl tracking-widest font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>TIKKLE</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Bold. Modern. Inclusive.<br />Fashion that moves with you.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-yellow-500">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {["/shop", "/about", "/contact", "/cart"].map((path) => (
              <li key={path}><Link to={path} className="hover:text-white transition capitalize">{path.replace("/", "")}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-yellow-500">Follow Us</h4>
          <div className="flex gap-4 text-gray-400 text-sm">
            {["Instagram", "TikTok", "Pinterest"].map((s) => (
              <span key={s} className="hover:text-white cursor-pointer transition">{s}</span>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-8">&copy; {new Date().getFullYear()} Tikkle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
