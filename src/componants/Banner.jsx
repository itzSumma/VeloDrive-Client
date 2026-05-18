import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ডে হালকা একটি গ্লো ইফেক্ট (ডিজাইন সুন্দর করার জন্য) */}
      <div className="absolute top-1/4 right-0 -z-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 -z-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] md:px-12">
        
        {/* বাম পাশ: কন্টেন্ট এরিয়া */}
        <div className="flex flex-col items-start gap-6 text-left">
          <p className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 uppercase">
            ⚡ Premium rentals for everyday journeys
          </p>
          
          <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.15] md:text-6xl lg:text-7xl">
            Rent the right car <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 bg-clip-text text-transparent">
              for every road.
            </span>
          </h1>
          
          <p className="max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            Browse available cars, compare rent prices, and book your ride with a clean, secure, and fully automated rental experience.
          </p>

          <div className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto">
            <Link 
              href="/cars" 
              className="w-full sm:w-auto text-center rounded bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95"
            >
              Explore Cars
            </Link>
            <Link 
              href="/add-car" 
              className="w-full sm:w-auto text-center rounded border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-95"
            >
              Add Your Car
            </Link>
          </div>
        </div>

        {/* ডান পাশ: মডার্ন কার ইমেজ এরিয়া */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* ইমেজের পেছনে একটি চমৎকার শ্যাডো/লাইট রিং */}
          <div className="absolute h-64 w-64 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-3xl"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" 
            alt="Premium Rental Car" 
            className="relative z-15 w-full max-w-[550px] object-contain rounded-xl shadow-2xl border border-white/10 bg-slate-900/40 p-2 transition-transform duration-500 hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;