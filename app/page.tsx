"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link"; // Link တစ်ခုတည်းပဲ ထားပါ

// Icons တွေကို lucide-react ကနေ သီးသန့် ခွဲထုတ်ပြီး import လုပ်ပါ
import {
  Loader2,
  Leaf,
  Sparkles,
  Star,
  ArrowUpRight,
  Truck,
  ShieldCheck
} from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const logoUrl = "https://res.cloudinary.com/dzmgrtzem/image/upload/v1772444702/ChatGPT_Image_Mar_2_2026_04_43_51_PM_doowsr.png";

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products_with_rating")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB]">

      {/* --- ၁။ HERO SECTION (အပေါ်ဆုံးအပိုင်း) --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] blur-3xl">
            <img src={logoUrl} className="w-full h-full object-contain" alt="background-blur" />
          </div>
          <Leaf className="absolute top-20 -left-10 w-64 h-64 text-green-900/5 rotate-45" />
          <Leaf className="absolute bottom-20 -right-10 w-80 h-80 text-green-900/5 -rotate-12" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-12 flex flex-col items-center">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-green-500/30 transition-all duration-700"></div>
              <img
                src={logoUrl}
                className="w-40 h-40 md:w-56 md:h-56 relative z-10 transition-transform duration-700 group-hover:scale-105 object-contain"
                alt="Logo"
              />
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-stone-900 text-stone-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">
              <Sparkles size={12} className="text-yellow-500" />
              Est. 2024 • Premium Quality
            </span>
          </div>

          <div className="space-y-4 mb-10">
            <h1 className="text-6xl md:text-[7rem] font-black text-stone-900 tracking-tighter leading-[0.85] uppercase">
              Nature's <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-green-700 to-yellow-600">
                Gold Reserve
              </span>
            </h1>
            <p className="text-stone-500 font-medium text-lg md:text-xl italic max-w-2xl mx-auto leading-relaxed">
              "မိတ်ဆွေတို့အတွက် အရည်အသွေးကောင်းမွန်သည့် Cannabis များကို စျေးနှုန်းချိုသာစွာဖြင့် ရောင်းချပေးနေပါတယ်။
              အထူးလုံခြုံစိတ်ချရသော ပို့ဆောင်ရေးနည်းလမ်းများကို အသုံးပြုပြီး Customer များထံသို့ ပို့ဆောင်ပေးနေပါသဖြင့် ယုံကြည်စိတ်ချစွာ ဝယ်ယူအားပေးနိုင်ပါတယ်။"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-800 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-stone-900 transition-all shadow-xl hover:-translate-y-1"
            >
              Browse the Catalog
            </button>
            <button
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white border-2 border-stone-100 text-stone-800 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:border-green-800 transition-all"
            >
              Our COMMITMENT
            </button>
          </div>
        </div>
      </section>

      {/* --- ၂။ OUR PROCESS SECTION (ယုံကြည်မှုတည်ဆောက်သည့်အပိုင်း) --- */}
      <section id="process" className="py-24 bg-white px-6 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-black text-green-700 uppercase tracking-[0.4em]">
              Why Choose Us
            </h2>
            <p className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter">
              OUR COMMITMENT
            </p>
            <div className="w-12 h-1 bg-stone-900 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Fast Delivery */}
            <div className="space-y-6 text-center group">
              <div className="w-20 h-20 bg-stone-50 rounded-[2rem] flex items-center justify-center mx-auto border border-stone-100 group-hover:bg-green-800 group-hover:text-white transition-all duration-500 shadow-sm">
                <Truck size={32} />
              </div>
              <div className="space-y-2 px-4">
                <h3 className="text-xl font-black text-stone-800 uppercase tracking-tight">
                  Fast Delivery
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed font-medium">
                  အမြန်ဆုံး ပို့ဆောင်ပေးနိုင်ရန် စနစ်တကျ စီမံခန့်ခွဲထားပြီး အချိန်မီ ရောက်ရှိစေပါသည်။
                </p>
              </div>
            </div>

            {/* Trusted & Secure */}
            <div className="space-y-6 text-center group">
              <div className="w-20 h-20 bg-stone-50 rounded-[2rem] flex items-center justify-center mx-auto border border-stone-100 group-hover:bg-green-800 group-hover:text-white transition-all duration-500 shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-2 px-4">
                <h3 className="text-xl font-black text-stone-800 uppercase tracking-tight">
                  Trusted & Secure
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed font-medium">
                  ယုံကြည်စိတ်ချရသော စနစ်များဖြင့် ဝယ်ယူသူအချက်အလက်များကို လုံခြုံစွာ ကာကွယ်ပေးပါသည်။
                </p>
              </div>
            </div>

            {/* Premium Quality */}
            <div className="space-y-6 text-center group">
              <div className="w-20 h-20 bg-stone-50 rounded-[2rem] flex items-center justify-center mx-auto border border-stone-100 group-hover:bg-green-800 group-hover:text-white transition-all duration-500 shadow-sm">
                <Sparkles size={32} />
              </div>
              <div className="space-y-2 px-4">
                <h3 className="text-xl font-black text-stone-800 uppercase tracking-tight">
                  Premium Quality
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed font-medium">
                  အရည်အသွေးမြင့် ထုတ်ကုန်များကိုသာ စနစ်တကျ စစ်ဆေးပြီးမှ သုံးစွဲသူထံ ပေးပို့ပါသည်။
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- ၃။ PRODUCT GRID SECTION (ပစ္စည်းများပြသသည့်အပိုင်း) --- */}
      <main id="inventory" className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
              Catalog
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              {products.length} strains • {products.filter(p => p.is_in_stock).length} available
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-green-700" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Image - NO overlay */}
                <div className="aspect-[4/5] bg-stone-100 overflow-hidden">
                  <img
                    src={
                      product.media_urls?.[0] ||
                      "https://placehold.co/600x800/e7e5e4/a8a29e?text=No+Image"
                    }
                    alt={product.strain_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                  {/* Name & Status Row */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-stone-900 leading-tight">
                        {product.strain_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-stone-500 uppercase tracking-wide">
                          {product.product_info || "Medical Grade"}
                        </p>

                        {/* • Separator */}
                        <span className="text-stone-300 text-[10px]">•</span>

                        {/* Stock Status Badge */}
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${product.is_in_stock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${product.is_in_stock ? 'text-green-600' : 'text-red-500'}`}>
                            {product.is_in_stock ? 'In Stock' : 'Out Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* THC + CBD (Same Line) */}
                  <div className="text-sm font-medium text-green-800">
                    THC {product.thc_percent}% • CBD {product.cbd_percent || 0}%
                  </div>

                  {/* Indica / Sativa */}
                  <div className="text-xs text-stone-600">
                    Sativa {product.sativa_percent}% / Indica {product.indica_percent}%
                  </div>

                  {/* Rating + Sold (Same Row) */}
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <div className="flex items-center gap-2">

                      {/* ⭐ Star Icons */}
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => {
                          const rating = Math.round(Number(product.average_rating || 0));
                          return (
                            <Star
                              key={i}
                              size={14}
                              fill={i < rating ? "currentColor" : "none"}
                              className={i < rating ? "" : "text-stone-200"}
                            />
                          );
                        })}
                      </div>

                      {/* Rating Number */}
                      <span className="text-xs font-bold text-stone-500">
                        {product.average_rating?.toFixed?.(1) || "0.0"}
                      </span>
                    </div>

                    <div>
                      {product.sold_count || 0}g sold
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-stone-400">price</p>
                      <p className="text-2xl font-bold text-stone-900">
                        {product.pricing?.[0]?.price?.toLocaleString()} MMK
                      </p>
                    </div>

                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-800 text-white group-hover:bg-green-900 transition">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}