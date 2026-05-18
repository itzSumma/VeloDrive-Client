import { ShieldCheck, Headphones, CalendarX, Car } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <ShieldCheck className="text-cyan-400" size={32} />,
      title: "Secure Payment",
      desc: "Fully automated, encrypted, and secure transaction methods.",
    },
    {
      icon: <Headphones className="text-teal-400" size={32} />,
      title: "24/7 Support",
      desc: "Our dedicated team is ready to assist you at any time of the day.",
    },
    {
      icon: <CalendarX className="text-blue-400" size={32} />,
      title: "Free Cancellation",
      desc: "Flexible booking policies. Cancel anytime before pickup hassle-free.",
    },
    {
      icon: <Car className="text-emerald-400" size={32} />,
      title: "Luxury Fleet",
      desc: "Choose from a wide variety of high-end premium vehicles.",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">DriveFleet</span>
          </h2>
          <p className="text-slate-400 mt-3">We provide the ultimate premium rental experience with unmatched flexibility and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div key={index} className="p-6 rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-1 group">
              <div className="p-3 bg-slate-950 border border-white/5 rounded-lg w-fit transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mt-4 mb-2 text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;