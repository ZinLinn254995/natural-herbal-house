import Link from 'next/link';

export default function Navbar() {
  const logo = "https://res.cloudinary.com/dzmgrtzem/image/upload/v1772444702/ChatGPT_Image_Mar_2_2026_04_43_51_PM_doowsr.png";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="font-black text-stone-800 tracking-tighter text-xl hidden md:block">NATURAL HERBAL HOUSE</span>
        </Link>
        <div className="flex gap-8 font-bold text-sm text-stone-600 uppercase tracking-widest">
          <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
          <Link href="/articles" className="hover:text-green-700 transition-colors">Articles</Link>
          <Link href="/contact" className="hover:text-green-700 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}