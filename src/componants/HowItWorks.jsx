import { Search, CalendarDays, Key } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="text-cyan-400" size={28} />,
      stepNum: "01",
      title: "Choose Car",
      desc: "Browse our premium collection and pick the right car for your journey.",
    },
    {
      icon: <CalendarDays className="text-teal-400" size={28} />,
      stepNum: "02",
      title: "Set Date & Options",
      desc: "Select dates, driver requirements, and add your custom requests easily.",
    },
    {
      icon: <Key className="text-blue-400" size={28} />,
      stepNum: "03",
      title: "Drive Safely",
      desc: "Complete the checkout, get automated confirmation, and hit the road!",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            How It <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-slate-400 mt-3">Rent your dream ride in three simple, fully automated steps.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {steps.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center relative group">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 backdrop-blur transition-all duration-300 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                {item.icon}
                <span className="absolute -bottom-2 -right-2 text-xs font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent border border-white/10 bg-slate-950 px-1.5 py-0.5 rounded-md">
                  {item.stepNum}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">{item.desc}</p>

              {/* কলামগুলোর মাঝে সংযোগকারী ডটেড লাইন (শুধুমাত্র ডেস্কটপে দেখাবে) */}  {index < 2 && (
                <div className="hidden lg:block absolute top-8 left-[65%] w-[70%] border-t-2 border-dashed border-white/5 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;