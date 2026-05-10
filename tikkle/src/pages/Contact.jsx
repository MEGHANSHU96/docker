import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase text-yellow-600 mb-2">Get In Touch</p>
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-400 text-sm mt-3">We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Info */}
        <div className="space-y-8">
          {[
            { label: "Email", value: "hello@tikkle.com" },
            { label: "Phone", value: "+91 98765 43210" },
            { label: "Address", value: "12 Fashion Street, Bandra West, Mumbai 400050" },
            { label: "Hours", value: "Mon – Fri, 10 AM – 6 PM IST" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs tracking-widest uppercase text-yellow-600 mb-1">{item.label}</p>
              <p className="text-sm text-gray-600">{item.value}</p>
            </div>
          ))}

          <div>
            <p className="text-xs tracking-widest uppercase text-yellow-600 mb-3">Follow Tikkle</p>
            <div className="flex gap-4">
              {["Instagram", "TikTok", "Pinterest"].map((s) => (
                <span key={s} className="text-sm text-gray-600 hover:text-black cursor-pointer transition">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        {sent ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Message Sent!</h3>
              <p className="text-sm text-gray-400">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", placeholder: "Your Name", type: "text" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "subject", placeholder: "Subject", type: "text" },
            ].map((f) => (
              <input
                key={f.name}
                type={f.type}
                placeholder={f.placeholder}
                required
                value={form[f.name]}
                onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-600 transition"
              />
            ))}
            <textarea
              rows={5}
              placeholder="Your message..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-600 transition resize-none"
            />
            <button type="submit" className="w-full bg-black text-white py-4 text-sm tracking-widest hover:bg-yellow-700 transition">
              SEND MESSAGE
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
