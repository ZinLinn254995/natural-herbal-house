export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-xl font-black mb-4">NATURAL HERBAL HOUSE</h2>
          <p className="text-stone-400 text-sm leading-relaxed">The finest quality cannabis selection for connoisseurs. Organic, pure, and potent.</p>
        </div>
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest text-green-500 mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm font-bold text-stone-400">
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Lab Results</li>
          </ul>
        </div>
        <div className="text-right">
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">© 2026 NATURAL HERBAL HOUSE</p>
          <p className="text-stone-600 text-[10px] mt-2 font-medium italic">Crafted for Excellence.</p>
        </div>
      </div>
    </footer>
  );
}