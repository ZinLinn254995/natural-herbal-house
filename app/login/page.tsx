"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error ပြရန်

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Error အဟောင်းကို ရှင်းထုတ်ပါ

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage("Login မှားယွင်းနေပါသည်- " + error.message);
      setLoading(false);
    } else {
      // Alert မပြဘဲ Admin Panel ဆီ တန်းဝင်သွားပါမယ်
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm border border-stone-200">
        <h1 className="text-2xl font-bold mb-6 text-stone-800 text-center">Admin Login</h1>
        
        {/* Error ပြရန်နေရာ */}
        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
            {errorMessage}
          </div>
        )}

        <input 
          type="email" placeholder="Email" value={email} required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4 outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <input 
          type="password" placeholder="Password" value={password} required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-xl mb-6 outline-none focus:ring-2 focus:ring-green-500 transition-all"
        />
        <button 
          disabled={loading}
          className="w-full bg-green-800 text-white py-3 rounded-xl font-bold hover:bg-green-900 transition-all disabled:bg-stone-300 shadow-lg shadow-green-900/20"
        >
          {loading ? "စစ်ဆေးနေပါသည်..." : "Login ဝင်မည်"}
        </button>
      </form>
    </div>
  );
}