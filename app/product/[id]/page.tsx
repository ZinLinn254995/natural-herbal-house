"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, Info, Package, AlertCircle, Loader2, Star } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  // --- Simulation States for New Review ---
  const [simOrderId, setSimOrderId] = useState("");
  const [simRating, setSimRating] = useState(5);
  const [simComment, setSimComment] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    async function fetchProductData() {
      setLoading(true);
      const { data: productData } = await supabase
        .from("products_with_rating")
        .select("*")
        .eq("id", id)
        .single();

      if (!productData) {
        router.push("/");
        return;
      }

      const { data: reviewData } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", id)
        .order("created_at", { ascending: false });

      setProduct(productData);
      setReviews(reviewData || []);
      setActiveImage(productData.media_urls?.[0] || "");
      setLoading(false);
    }
    fetchProductData();
  }, [id, router]);

  // --- Helpful Counter Logic (Fixed for Database Sync) ---
  async function handleHelpfulClick(reviewId: any) {
  // ၁။ UI မှာ ချက်ချင်းတိုးပြမယ် (Optimistic Update)
  setReviews(prev => prev.map(rev => 
    rev.id === reviewId ? { ...rev, helpful_count: (rev.helpful_count || 0) + 1 } : rev
  ));

  // ၂။ Simulation review (fake-id) ဖြစ်နေရင် database update ကို ကျော်မယ်
  if (typeof reviewId === 'string' && reviewId.startsWith("fake-")) {
    return;
  }

  // ၃။ Database update
  const { error } = await supabase.rpc('increment_helpful_count', { 
    review_id_input: Number(reviewId) 
  });
  
  if (error) {
    console.error("Database Error:", error);
    // Error တက်ရင် UI ကို မူလအတိုင်း ပြန်နှုတ်မယ်
    setReviews(prev => prev.map(rev => 
      rev.id === reviewId ? { ...rev, helpful_count: Math.max(0, (rev.helpful_count || 0) - 1) } : rev
    ));
    alert("Helpful count update လုပ်လို့မရပါဘူး။");
  }
}

  // --- Simulation Submit Logic ---
  async function handleSimSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!simOrderId || !simComment) return alert("ကျေးဇူးပြု၍ အချက်အလက်စုံလင်စွာ ဖြည့်ပေးပါ။");

    setIsChecking(true);

    setTimeout(() => {
      const fakeNewReview = {
        id: `fake-${Date.now()}`, // Simulation id ကို string နဲ့ ပေးထားခြင်း
        user_name: "Verified Customer",
        rating: simRating,
        comment: simComment,
        created_at: new Date().toISOString(),
        helpful_count: 0
      };

      setReviews(prev => [fakeNewReview, ...prev]);
      setIsChecking(false);
      setSimOrderId(""); 
      setSimComment(""); 
      setSimRating(5);
      alert(`Order ID #${simOrderId} ကို စစ်ဆေးပြီးပါပြီ။`);
    }, 2000);
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-green-800" size={40} />
    </div>
  );

  if (!product) return null;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
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
          
          {product.media_urls && product.media_urls.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.media_urls.map((url: string, i: number) => (
                <button key={i} onClick={() => setActiveImage(url)} className={`w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${activeImage === url ? 'border-green-800 scale-95' : 'border-stone-100'}`}>
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
              
              {product.sold_count > 0 && (
                <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-2 rounded-full border border-orange-100">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest">{product.sold_count}g Sold</span>
                </div>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-stone-900 tracking-tighter uppercase leading-[0.9] mb-4">
              {product.strain_name}
            </h1>

            <div className="flex items-center gap-2">
               <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.round(Number(averageRating)) ? "currentColor" : "none"} className={i < Math.round(Number(averageRating)) ? "" : "text-stone-200"} />
                  ))}
               </div>
               <span className="text-xs font-black text-stone-400 uppercase tracking-widest">
                  {averageRating} ({reviews.length} Verified Reviews)
               </span>
            </div>
          </div>

          <div className="bg-stone-50 rounded-[2.5rem] p-8 border border-stone-100 grid grid-cols-2 gap-8">
  
  {/* THC */}
  <div className="space-y-1">
    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
      THC Content
    </p>
    <p className="text-4xl font-black text-stone-900">
      {product.thc_percent}%
    </p>
  </div>

  {/* CBD */}
  <div className="space-y-1">
    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
      CBD Content
    </p>
    <p className="text-4xl font-black text-stone-900">
      {product.cbd_percent}%
    </p>
  </div>

  {/* Sativa / Indica */}
  <div className="col-span-2 pt-4 border-t border-stone-200">
    
    {/* Text */}
    <div className="flex justify-between text-[11px] font-bold uppercase mb-3">
      <span className="text-green-800">
        Sativa {product.sativa_percent}%
      </span>
      <span className="text-orange-500">
        Indica {product.indica_percent}%
      </span>
    </div>

    {/* Dual Progress Bar */}
    <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden flex">
      <div
        className="h-full bg-green-800 transition-all duration-700"
        style={{ width: `${product.sativa_percent}%` }}
      />
      <div
        className="h-full bg-orange-500 transition-all duration-700"
        style={{ width: `${product.indica_percent}%` }}
      />
    </div>

  </div>
</div>

          <div className="space-y-4">
            <h3 className="font-black text-stone-900 uppercase text-xs tracking-[0.2em]">Description</h3>
            <p className="text-stone-500 leading-relaxed font-medium text-lg">
              {product.description || "No description available for this product."}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-stone-900 uppercase text-xs tracking-[0.2em]">Select Quantity</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.pricing?.map((tier: any, i: number) => (
                <div key={i} className="p-5 bg-white rounded-2xl border-2 border-stone-100 flex justify-between items-center group hover:border-green-800 transition-all cursor-pointer shadow-sm">
                  <span className="font-black text-stone-600 group-hover:text-green-800 transition-colors uppercase">{tier.size}</span>
                  <span className="font-black text-stone-900 text-lg">{tier.price?.toLocaleString()} MMK</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-8 pt-16 border-t border-stone-100">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-stone-900 text-lg tracking-tight">Ratings & Reviews</h3>
                <span className="text-stone-400 font-medium text-sm">({reviews.length})</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-[2rem] border border-stone-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold text-xs shrink-0 border border-stone-200 uppercase">
                      {rev.user_name?.charAt(0)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-stone-800 text-sm">{rev.user_name}</span>
                        <span className="text-[10px] text-stone-400 font-medium">
                          {new Date(rev.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star key={starIdx} size={10} fill={starIdx < rev.rating ? "currentColor" : "none"} className={starIdx < rev.rating ? "" : "text-stone-100"} />
                          ))}
                        </div>
                        <div className="h-2 w-[1px] bg-stone-200"></div>
                        <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">Verified Purchase</span>
                      </div>

                      <p className="text-stone-700 text-[13px] leading-relaxed pt-1">{rev.comment}</p>
                      
                      <div className="flex items-center gap-4 pt-3">
                        <button onClick={() => handleHelpfulClick(rev.id)} className="flex items-center gap-1.5 text-stone-400 hover:text-stone-900 transition-all active:scale-90">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${rev.helpful_count > 0 ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-stone-50 border border-stone-100'}`}>
                            <span className="text-[12px]">👍</span>
                          </div>
                          <div className="flex items-center gap-1 font-black uppercase tracking-tighter text-[10px]">
                            <span>Helpful</span>
                            {rev.helpful_count > 0 && <span className="text-stone-900 ml-0.5">{rev.helpful_count}</span>}
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulation Review Form Section */}
            <div className="mt-16 bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Package size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-2xl bg-green-800 flex items-center justify-center text-white">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 uppercase text-xs tracking-[0.2em]">Customer Voice</h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Verified Purchase Only</p>
                  </div>
                </div>

                <form onSubmit={handleSimSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-stone-400 uppercase ml-2 tracking-widest">Order ID Received</label>
                      <input value={simOrderId} onChange={(e) => setSimOrderId(e.target.value)} placeholder="#12345" className="w-full p-4 bg-stone-50 rounded-2xl outline-none border border-stone-50 text-sm font-bold focus:bg-white focus:ring-2 focus:ring-green-800 transition-all" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-stone-400 uppercase ml-2 tracking-widest">Rate our quality</label>
                      <div className="flex items-center justify-between h-[52px] bg-stone-50 px-5 rounded-2xl border border-stone-50">
                        <div className="flex text-yellow-500 gap-1.5">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button key={num} type="button" onClick={() => setSimRating(num)} className="hover:scale-125 transition-transform active:scale-95">
                              <Star size={18} fill={num <= simRating ? "currentColor" : "none"} className={num <= simRating ? "" : "text-stone-200"} />
                            </button>
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-stone-400">{simRating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-stone-400 uppercase ml-2 tracking-widest">Your experience</label>
                    <textarea value={simComment} onChange={(e) => setSimComment(e.target.value)} placeholder="What did you like about this strain?" className="w-full p-5 bg-stone-50 rounded-[2rem] outline-none border border-stone-50 text-sm h-32 focus:bg-white focus:ring-2 focus:ring-green-800 transition-all resize-none" />
                  </div>

                  <button disabled={isChecking} className={`w-full py-6 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.3em] transition-all flex justify-center items-center gap-3 shadow-lg shadow-stone-100 ${isChecking ? 'bg-stone-100 text-stone-400' : 'bg-stone-900 text-white hover:bg-green-900 active:scale-95'}`}>
                    {isChecking ? (
                      <><Loader2 className="animate-spin" size={16}/><span>Verifying Order ID...</span></>
                    ) : (
                      "Post Review"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <button disabled className="w-full py-7 bg-stone-200 text-stone-400 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 cursor-not-allowed group relative overflow-hidden">
            <AlertCircle size={24}/> 
            <span>BUY BUTTON DISABLED</span>
          </button>
        </div>
      </div>
    </main>
  );
}