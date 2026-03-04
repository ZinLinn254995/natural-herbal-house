// app/articles/page.tsx
import { Newspaper, Hourglass } from "lucide-react";

export default function ArticlesPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-stone-100 rounded-[2.5rem] flex items-center justify-center mb-8 animate-pulse text-green-800">
                <Newspaper size={48} strokeWidth={1.5} />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                Articles <span className="text-green-700">Coming Soon</span>
            </h1>

            <p className="max-w-md text-stone-500 font-medium leading-relaxed mb-8">
                Cannabis Indoor/Outdoor စိုက်ပျိုးနည်းများနှင့် ဗဟုသုတ ဆောင်းပါးကောင်းများကို မကြာမီ တင်ဆက်ပေးပါမည်။
            </p>

            <div className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-stone-900/20">
                <Hourglass size={14} className="animate-spin" />
                Stay Tuned
            </div>
        </div>
    );
}