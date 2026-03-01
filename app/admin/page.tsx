"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, Trash2, Package, Loader2, LogOut, 
  X, Database, Edit3, CheckCircle2, XCircle
} from "lucide-react";

export default function ProfessionalAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // --- Form States (Matched with Supabase Schema) ---
  const [strainName, setStrainName] = useState("");
  const [productInfo, setProductInfo] = useState("");
  const [thc, setThc] = useState("");
  const [cbd, setCbd] = useState("");
  const [sativa, setSativa] = useState(50);
  const [indica, setIndica] = useState(50);
  const [description, setDescription] = useState("");
  const [stockAmount, setStockAmount] = useState("");
  const [isInStock, setIsInStock] = useState(true);
  const [pricing, setPricing] = useState([{ size: "1g", price: "" }]);
  const [media, setMedia] = useState<string[]>([]);
  const [tempUrl, setTempUrl] = useState("");

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setStrainName(item.strain_name);
    setProductInfo(item.product_info);
    setThc(item.thc_percent.toString());
    setCbd(item.cbd_percent.toString());
    setSativa(item.sativa_percent);
    setIndica(item.indica_percent);
    setDescription(item.description);
    setStockAmount(item.stock_amount.toString());
    setIsInStock(item.is_in_stock);
    setPricing(item.pricing || [{ size: "1g", price: "" }]);
    setMedia(item.media_urls || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!strainName) return alert("Strain Name ထည့်ပေးပါ");
    setIsSubmitting(true);
    
    // Database Column များနှင့် ကိုက်ညီသော Payload
    const payload = {
      strain_name: strainName,
      product_info: productInfo,
      thc_percent: parseFloat(thc) || 0,
      cbd_percent: parseFloat(cbd) || 0,
      sativa_percent: sativa,
      indica_percent: indica,
      description: description,
      stock_amount: parseFloat(stockAmount) || 0,
      is_in_stock: isInStock,
      pricing: pricing,
      media_urls: media,
    };

    let result;
    if (editingId) {
      result = await supabase.from("products").update(payload).eq("id", editingId);
    } else {
      result = await supabase.from("products").insert([payload]);
    }

    if (result.error) {
      alert("Error: " + result.error.message + "\n(Tip: Check Supabase RLS settings)");
    } else {
      alert(editingId ? "Update လုပ်ပြီးပါပြီ" : "သိမ်းဆည်းပြီးပါပြီ");
      resetForm();
      fetchProducts();
    }
    setIsSubmitting(false);
  }

  const resetForm = () => {
    setEditingId(null); setStrainName(""); setProductInfo(""); setThc(""); setCbd("");
    setSativa(50); setIndica(50); setDescription(""); setStockAmount("");
    setIsInStock(true); setPricing([{ size: "1g", price: "" }]); setMedia([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-stone-800 flex items-center gap-2 uppercase tracking-tighter">
            <Package className="text-green-700" /> Natural Herbal House <span className="text-[10px] bg-stone-200 px-2 py-1 rounded">ADMIN</span>
          </h1>
          <button onClick={() => { supabase.auth.signOut(); window.location.href="/login"; }} className="text-stone-400 hover:text-red-500 font-bold flex items-center gap-2">
            <LogOut size={18}/> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* FORM SIDE */}
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-stone-100 space-y-6">
            <div className="flex justify-between items-center border-b border-stone-50 pb-4">
               <h2 className="font-black text-stone-800 uppercase tracking-widest text-xs flex items-center gap-2">
                {editingId ? <Edit3 size={16} className="text-blue-600"/> : <Plus size={16} className="text-green-600"/>}
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              {editingId && <button type="button" onClick={resetForm} className="text-[10px] font-black text-red-500 underline">CANCEL EDIT</button>}
            </div>

            <div className="space-y-4">
              <input value={strainName} onChange={e => setStrainName(e.target.value)} className="w-full p-4 bg-stone-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 font-bold" placeholder="Strain Name (e.g. OG Kush)"/>
              <input value={productInfo} onChange={e => setProductInfo(e.target.value)} className="w-full p-4 bg-stone-50 rounded-2xl outline-none" placeholder="Product Type (Bud, Indoor, Press)"/>

              <div className="grid grid-cols-2 gap-4">
                <input type="number" step="0.1" value={thc} onChange={e => setThc(e.target.value)} className="p-4 bg-stone-50 rounded-2xl outline-none" placeholder="THC %"/>
                <input type="number" step="0.1" value={cbd} onChange={e => setCbd(e.target.value)} className="p-4 bg-stone-50 rounded-2xl outline-none" placeholder="CBD %"/>
              </div>

              {/* Sativa/Indica Slider */}
              <div className="p-4 bg-stone-50 rounded-2xl space-y-3">
                <div className="flex justify-between text-[10px] font-black text-stone-500 uppercase">
                  <span>Sativa: {sativa}%</span>
                  <span>Indica: {indica}%</span>
                </div>
                <input type="range" value={sativa} onChange={e => {setSativa(Number(e.target.value)); setIndica(100 - Number(e.target.value))}} className="w-full accent-green-800 cursor-pointer"/>
              </div>

              {/* Stock Management */}
              <div className="grid grid-cols-2 gap-4">
                <input type="number" value={stockAmount} onChange={e => setStockAmount(e.target.value)} className="p-4 bg-stone-50 rounded-2xl outline-none font-bold" placeholder="Stock Amount (g)"/>
                <button type="button" onClick={() => setIsInStock(!isInStock)} className={`p-4 rounded-2xl font-black text-[10px] transition-all ${isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {isInStock ? "● IN STOCK" : "○ OUT OF STOCK"}
                </button>
              </div>

              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-4 bg-stone-50 rounded-2xl outline-none h-24" placeholder="Description..."/>

              {/* Pricing */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase ml-2">Pricing (Size & Price)</label>
                {pricing.map((tier, index) => (
                  <div key={index} className="flex gap-2">
                    <input placeholder="Size" value={tier.size} onChange={e => { const n = [...pricing]; n[index].size = e.target.value; setPricing(n); }} className="flex-1 p-3 bg-stone-50 rounded-xl outline-none text-sm"/>
                    <input type="number" placeholder="Price" value={tier.price} onChange={e => { const n = [...pricing]; n[index].price = e.target.value; setPricing(n); }} className="flex-1 p-3 bg-stone-50 rounded-xl outline-none text-sm font-bold"/>
                    {pricing.length > 1 && <button type="button" onClick={() => setPricing(pricing.filter((_, i) => i !== index))} className="text-red-400"><X size={18}/></button>}
                  </div>
                ))}
                <button type="button" onClick={() => setPricing([...pricing, { size: "", price: "" }])} className="text-green-700 text-[10px] font-black hover:underline">+ ADD PRICE TIER</button>
              </div>

              {/* Media */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input value={tempUrl} onChange={e => setTempUrl(e.target.value)} placeholder="Image URL..." className="flex-1 p-3 bg-stone-50 rounded-xl outline-none text-sm"/>
                  <button type="button" onClick={() => { if(tempUrl){ setMedia([...media, tempUrl]); setTempUrl(""); } }} className="bg-stone-800 text-white px-4 rounded-xl font-bold text-xs uppercase">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {media.map((url, i) => (
                    <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-stone-200">
                      <img src={url} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setMedia(media.filter((_, idx) => idx !== i))} className="absolute top-0 right-0 bg-red-500 text-white p-0.5"><X size={10}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button disabled={isSubmitting} className={`w-full py-5 rounded-[1.5rem] font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-lg ${editingId ? 'bg-blue-600' : 'bg-green-800'} text-white`}>
              {isSubmitting ? <Loader2 className="animate-spin"/> : editingId ? "UPDATE PRODUCT" : "SAVE PRODUCT"}
            </button>
          </form>

          {/* LIST VIEW SIDE */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-stone-800 flex items-center gap-2">
              <Database size={20} className="text-green-700"/> LIVE INVENTORY ({products.length})
            </h2>
            <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
              {products.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-3xl border border-stone-100 flex gap-4 items-center shadow-sm group">
                  <img src={item.media_urls?.[0]} className="w-16 h-16 rounded-2xl object-cover bg-stone-50" />
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-800 uppercase text-sm leading-none">{item.strain_name}</h3>
                    <p className="text-[9px] text-stone-400 font-black mt-1 uppercase">{item.product_info} • {item.stock_amount}g</p>
                    <div className={`text-[8px] font-black px-2 py-0.5 rounded-full inline-block mt-2 ${item.is_in_stock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      {item.is_in_stock ? 'IN STOCK' : 'OUT STOCK'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => startEdit(item)} className="p-2 text-stone-300 hover:text-blue-500 transition-colors"><Edit3 size={18}/></button>
                    <button onClick={async () => { if(confirm('Delete?')) { await supabase.from('products').delete().eq('id', item.id); fetchProducts(); } }} className="p-2 text-stone-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}