"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Loader2, ArrowRight, Leaf } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      // Supabase မှ products များကို နောက်ဆုံးတင်သမျှ အရင်ပြရန် fetch လုပ်ခြင်း
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Natural Theme */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <Leaf className="w-64 h-64 text-green-900 rotate-45 absolute -top-10 -left-10" />
          <Leaf className="w-96 h-96 text-green-900 -rotate-12 absolute -bottom-20 -right-20" />
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Natural Herbal House
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-stone-900 tracking-tighter leading-[0.9]">
            PREMIUM <br /> <span className="text-green-800">COLLECTION</span>
          </h1>
          <p className="text-stone-500 font-medium text-lg italic max-w-lg mx-auto">
            Experience the purest essence of nature, carefully curated for the highest quality and potency.
          </p>
        </div>
      </section>

      {/* Product Grid Section */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center justify-between mb-12 border-b border-stone-200 pb-6">
          <h2 className="text-sm font-black text-stone-400 uppercase tracking-[0.3em]">Our Inventory</h2>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            {products.length} Items Available
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-green-800" />
            <p className="text-stone-400 font-bold text-xs uppercase tracking-widest">Loading Herbals...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-stone-200">
            <p className="text-stone-400 font-bold">No products found in the shop.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full">
                  
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
                    <img 
                      src={product.media_urls?.[0] || "https://placehold.co/600x800?text=Natural+Herbal"} 
                      alt={product.strain_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                       <span className="bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                         THC: {product.thc_percent}%
                       </span>
                    </div>

                    {!product.is_in_stock && (
                      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[3px] flex items-center justify-center">
                        <span className="bg-white text-stone-900 px-8 py-3 rounded-full font-black text-xs tracking-tighter shadow-xl">
                          RESTOCKING SOON
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-4">
                      <p className="text-[10px] font-black text-green-700 uppercase tracking-widest mb-1">
                        {product.product_info || "Premium Grade"}
                      </p>
                      <h3 className="text-3xl font-black text-stone-800 group-hover:text-green-800 transition-colors uppercase tracking-tighter leading-none">
                        {product.strain_name}
                      </h3>
                    </div>

                    <div className="mt-auto pt-6 border-t border-stone-50 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-stone-400 uppercase">Starting at</span>
                         <span className="text-2xl font-black text-stone-900">
                           {product.pricing?.[0]?.price?.toLocaleString()} <span className="text-xs">MMK</span>
                         </span>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:bg-green-800 transition-colors">
                          <ArrowRight size={20} />
                       </div>
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