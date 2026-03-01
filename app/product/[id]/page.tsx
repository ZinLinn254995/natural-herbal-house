"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, Info, Percent, Package, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error:", error);
        router.push("/"); // ပစ္စည်းမရှိရင် Home ကို ပြန်ပို့မည်
      } else {
        setProduct(data);
        setActiveImage(data.media_urls?.[0] || "");
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-green-800" size={40} />
    </div>
  );

  if (!product) return null;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-stone-400 font-bold text-sm mb-12 hover:text-green-800 transition-colors group">
        <div className="p-2 rounded-full border border-stone-100 group-hover:border-green-800">
          <ChevronLeft size={18}/>
        </div>
        BACK TO COLLECTION
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Media Section */}
        <div className="space-y-6">
          <div className="rounded-[3rem] overflow-hidden bg-stone-50 border border-stone-100 shadow-2xl aspect-[4/5]">
            <img src={activeImage} className="w-full h-full object-cover transition-all duration-500" alt={product.strain_name} />
          </div>
          
          {/* Thumbnail Gallery */}
          {product.media_urls && product.media_urls.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.media_urls.map((url: string, i: number) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(url)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === url ? 'border-green-800 scale-95' : 'border-stone-100'}`}
                >
                  <img src={url} className="w-full h-full object-cover" alt={`Preview ${i}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-green-800 font-black text-[10px] uppercase tracking-widest bg-green-50 px-4 py-2 rounded-full">
                {product.product_info || "Natural Herbal"}
              </span>
              {product.is_in_stock ? (
                <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">● In Stock</span>
              ) : (
                <span className="text-red-500 font-bold text-[10px] uppercase tracking-widest">○ Out of Stock</span>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter uppercase leading-[0.9]">
              {product.strain_name}
            </h1>
          </div>

          {/* THC/CBD Stats Card */}
          <div className="bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100 grid grid-cols-2 gap-8 relative overflow-hidden">
            <div className="space-y-1">
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">THC Content</p>
               <p className="text-4xl font-black text-stone-900">{product.thc_percent}%</p>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">CBD Content</p>
               <p className="text-4xl font-black text-stone-900">{product.cbd_percent}%</p>
            </div>
            {/* Sativa/Indica Bar */}
            <div className="col-span-2 pt-4 border-t border-stone-200">
               <div className="flex justify-between text-[10px] font-black text-stone-500 uppercase mb-3">
                 <span>Sativa {product.sativa_percent}%</span>
                 <span>Indica {product.indica_percent}%</span>
               </div>
               <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-800 transition-all duration-1000" style={{ width: `${product.sativa_percent}%` }}></div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-stone-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
               Description
            </h3>
            <p className="text-stone-500 leading-relaxed font-medium text-lg">
              {product.description || "No description available for this product."}
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="space-y-4">
            <h3 className="font-black text-stone-900 uppercase text-xs tracking-[0.2em]">Select Quantity</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.pricing?.map((tier: any, i: number) => (
                <div key={i} className="p-5 bg-white rounded-2xl border-2 border-stone-100 flex justify-between items-center group hover:border-green-800 transition-all cursor-pointer">
                  <span className="font-black text-stone-600 group-hover:text-green-800 transition-colors uppercase">{tier.size}</span>
                  <span className="font-black text-stone-900 text-lg">{tier.price?.toLocaleString()} MMK</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button disabled className="w-full py-7 bg-stone-200 text-stone-400 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 cursor-not-allowed group relative overflow-hidden">
            <AlertCircle size={24}/> 
            <span>BUY BUTTON DISABLED</span>
          </button>
        </div>
      </div>
    </main>
  );
}