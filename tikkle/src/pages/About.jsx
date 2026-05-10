export default function About() {
  const team = [
    { name: "Aanya Sharma", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop" },
    { name: "Marcus Reid", role: "Head of Design", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop" },
    { name: "Leila Nour", role: "Brand Strategist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop"
          alt="About"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-yellow-400 mb-3">Our Story</p>
          <h1 className="text-5xl font-bold">About Tikkle</h1>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-xs tracking-widest uppercase text-yellow-600 mb-3">Who We Are</p>
        <h2 className="text-3xl font-bold mb-6">Fashion For The Bold Generation</h2>
        <p className="text-gray-500 leading-relaxed text-sm mb-4">
          Tikkle was born in 2021 from a simple belief: fashion should speak for you. Founded by Aanya Sharma in a small studio in Mumbai, the brand quickly grew into a global voice for street-meets-luxury style.
        </p>
        <p className="text-gray-500 leading-relaxed text-sm">
          We design for the 18–35 generation — people who scroll TikTok and read Vogue in the same minute, who dress for themselves and no one else. Every Tikkle piece is intentional, inclusive, and unapologetically bold.
        </p>
      </section>

      {/* Values */}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Bold by Design", desc: "Every piece is crafted to make a statement, not blend in." },
            { title: "Inclusive Sizing", desc: "XS to 3XL across all collections. Fashion has no size limit." },
            { title: "Conscious Crafting", desc: "We partner with ethical manufacturers and use sustainable fabrics wherever possible." },
          ].map((v) => (
            <div key={v.title}>
              <div className="w-8 h-0.5 bg-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet The Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((m) => (
            <div key={m.name} className="text-center group">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-semibold text-sm">{m.name}</h3>
              <p className="text-xs text-yellow-600 mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
