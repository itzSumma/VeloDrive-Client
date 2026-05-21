"use client";

import ExploreCars from "@/componants/ExploreCars";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "@/lib/config";

const carTypes = ["All", "SUV", "Sedan", "Hatchback", "Luxury"];

const ExploreCarPage = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    queueMicrotask(async () => {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (type !== "All") params.set("type", type);

      setLoading(true);

      try {
        const res = await fetch(`${apiBaseUrl}/cars?${params.toString()}`, {
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
    <main className="relative mx-auto min-h-screen max-w-7xl overflow-hidden bg-slate-950 px-4 py-10 text-white select-none">
      <div className="pointer-events-none absolute right-1/4 top-0 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[130px]" />

      <div className="relative z-10 mb-10 flex flex-col gap-5 border-b border-white/5 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Explore{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Cars
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Search and filter the full DriveFleet rental inventory.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by car name..."
            className="w-full rounded-lg border border-white/10 bg-slate-900/40 px-4 py-2.5 text-sm text-white shadow-sm outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-cyan-500/50 focus:bg-slate-950 sm:w-64"
          />
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full cursor-pointer rounded-lg border border-white/10 bg-slate-900/40 px-4 py-2.5 text-sm text-white shadow-sm outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950 sm:w-40"
          >
            {carTypes.map((item) => (
              <option key={item} value={item} className="bg-slate-950 text-white">
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
            <p className="mt-4 animate-pulse text-sm font-semibold tracking-wide text-slate-400">
              Loading fleet...
            </p>
          </div>
        ) : cars.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car) => (
              <ExploreCars key={car._id} destination={car} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/10 p-10 text-center backdrop-blur-sm">
            <div className="mb-3 text-4xl text-cyan-500/70">Search</div>
            <h3 className="text-lg font-bold text-slate-200">No Cars Matched</h3>
            <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
              Try adjusting your search terms or filter to find available
              vehicles.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ExploreCarPage;
