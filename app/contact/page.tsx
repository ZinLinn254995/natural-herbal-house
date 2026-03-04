// app/contact/page.tsx
import { MessageCircle, Facebook, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
    const contactLinks = [
        {
            name: "Facebook Messenger",
            icon: <Facebook size={32} />,
            url: "https://m.me/61587729868096", // သင့် Page ID
            color: "bg-blue-600",
            description: "Chat with Aura Flora (Official Seller) on Facebook",
            label: "Start Chat"
        },
        {
            name: "Viber Channel",
            icon: <MessageCircle size={32} />,
            url: "https://invite.viber.com/?g2=AQB7VHw66uKFylXx5AajrYS4ukmrCYC3bvz%2FWjwKENUv6rlbt7uBaCHDdsFmn3uq&lang=en", // သင့် Viber URI ထည့်ရန်
            color: "bg-[#7360f2]",
            description: "Join our community for daily updates",
            label: "Join Channel"
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        Get In <span className="text-green-700">Touch</span>
                    </h1>
                    <p className="text-stone-500 font-bold uppercase text-xs tracking-[0.2em]">
                        ကျွန်ုပ်တို့နှင့် တိုက်ရိုက်ဆက်သွယ်ရန်
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contactLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white p-10 rounded-[3rem] border border-stone-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${link.color} opacity-[0.03] rounded-bl-[5rem] group-hover:scale-150 transition-transform duration-700`} />

                            <div className={`w-16 h-16 ${link.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-${link.color}/20 group-hover:scale-110 transition-transform`}>
                                {link.icon}
                            </div>

                            <h3 className="text-2xl font-black text-stone-900 mb-2 uppercase tracking-tight">
                                {link.name}
                            </h3>
                            <p className="text-stone-400 font-medium text-sm mb-8">
                                {link.description}
                            </p>

                            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-stone-900 group-hover:text-green-700 transition-colors">
                                {link.label} <ArrowUpRight size={16} />
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center">
                    {/* Glassmorphism Badge */}
                    <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative flex items-center gap-3 px-6 py-2.5 bg-white rounded-full border border-stone-100 shadow-sm">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-800">
                                Open 24/7
                            </span>
                        </div>
                    </div>

                    {/* Main Text Content */}
                    <div className="mt-8 text-center space-y-2">
                        <h4 className="text-3xl font-black text-stone-900 tracking-tighter uppercase">
                            We never <span className="text-green-600">Sleep.</span>
                        </h4>
                    </div>

                    {/* Minimalist Support Line */}
                    <div className="mt-10 flex items-center gap-4 text-stone-300">
                        <div className="h-[1px] w-12 bg-current"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Support Team</span>
                        <div className="h-[1px] w-12 bg-current"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}