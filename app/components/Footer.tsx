import { Facebook, Phone } from "lucide-react"; // Icon များအတွက် import လုပ်ရန်

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-xl font-black mb-4 tracking-tighter uppercase">NATURAL HERBAL HOUSE</h2>
          <p className="text-stone-400 text-sm leading-relaxed font-medium">
            The finest quality cannabis selection for connoisseurs. Organic, pure, and potent.
          </p>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-widest text-green-500 mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm font-bold text-stone-400">
            {/* Facebook Link */}
            <li>
              <a
                href="https://m.me/61587729868096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-500 transition-colors group"
              >
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                <span>Facebook Messenger</span>
              </a>
            </li>

            {/* Viber Link */}
            <li>
              <a
                href="https://invite.viber.com/?g2=AQB7VHw66uKFylXx5AajrYS4ukmrCYC3bvz%2FWjwKENUv6rlbt7uBaCHDdsFmn3uq"
                className="flex items-center gap-3 hover:text-purple-500 transition-colors group"
              >
                <Phone size={18} className="group-hover:scale-110 transition-transform" />
                <span>Viber Channel</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="md:text-right">
          <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">© 2024 NATURAL HERBAL HOUSE</p>
          <p className="text-stone-600 text-[10px] mt-2 font-medium italic">Crafted for Excellence.</p>
        </div>
      </div>
    </footer>
  );
}