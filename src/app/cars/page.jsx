"use client";

import ExploreCars from "@/componants/ExploreCars"; 
import { useEffect, useState } from "react";

const carTypes = ["All", "SUV", "Sedan", "Hatchback", "Luxury"];

const ExploreCarPage = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    let ignore = false;

    queueMicrotask(async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (type !== "All") params.set("type", type);

      setLoading(true);
      
      try {
        const res = await fetch(`${BACKEND_URL}/cars?${params.toString()}`, {
          cache: "no-store",
        });
        
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

        if (!ignore) {
          setCars(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        if (!ignore) {
          setLoading(false);
        }
      }
    });

    return () => {
      ignore = true;
    };
  }, [search, type]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 bg-slate-950 text-white select-none relative overflow-hidden">
      
      {/* 🔮 ব্যাকগ্রাউন্ডে সূক্ষ্ম নিয়ন গ্লো ইফেক্ট */}
      <div className="absolute top-0 right-1/4 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />

      {/* ফিল্টার এবং হেডিং সেকশন */}
      <div className="relative z-10 mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Explore <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Cars</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">Search and filter the full DriveFleet rental inventory.</p>
        </div>
        
        {/* সার্চ ইনপুট এবং টাইপ সিলেক্ট ড্রপডাউন */}
        <div className="flex flex-col gap-3 sm:flex-row w-full md:w-auto">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by car name..."
            className="w-full sm:w-64 rounded-lg border border-white/10 bg-slate-900/40 px-4 py-2.5 text-sm text-white placeholder-slate-600 shadow-sm outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950"
          />
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full sm:w-40 rounded-lg border border-white/10 bg-slate-900/40 px-4 py-2.5 text-sm text-white shadow-sm outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950 cursor-pointer"
          >
            {carTypes.map((item) => (
              <option key={item} value={item} className="bg-slate-950 text-white">
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ডাইনামিক কন্টেন্ট রেন্ডারিং সেকশন */}
      <div className="relative z-10">
        {loading ? (
          /* 🔄 মডার্ন ডার্ক স্পিনার */
          <div className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
            <p className="mt-4 text-sm font-semibold text-slate-400 animate-pulse tracking-wide">Loading fleet...</p>
          </div>
        ) : cars.length > 0 ? (
          /* 🚗 কার গ্রিড লেআউট */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car) => (
              <ExploreCars key={car._id} destination={car} />
            ))}
          </div>
        ) : (
          /* 🔍 নো ম্যাচিং রেজাল্ট ফাউন্ড (Empty State) */
          <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/10 p-10 text-center backdrop-blur-sm">
            <div className="text-4xl mb-3 animate-bounce duration-1000 text-cyan-500/70">🔍</div>
            <h3 className="text-lg font-bold text-slate-200">No Cars Matched</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">
              Try adjusting your search terms or filter to find available vehicles.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExploreCarPage;