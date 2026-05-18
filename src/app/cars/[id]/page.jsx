"use client";


// 🚀 'Image' এর নাম পরিবর্তন করে 'NextImage' দেওয়া হলো কনফ্লিক্ট এড়াতে
import NextImage from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { Users } from "lucide-react";
import BookingCar from "@/componants/BookingCar";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔌 সরাসরি লোকাল ব্যাকএন্ড URL
  const SERVER_URL = "http://localhost:5000";

  useEffect(() => {
    fetch(`${SERVER_URL}/cars/${id}`, { cache: "no-store" })
      .then((res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON. Make sure backend is running.");
        }
        return res.json();
      })
      .then(setCar)
      .catch((err) => console.error("Error fetching car:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // ⏳ ডার্ক লোডিং স্টেট অ্যানিমেশন
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white py-20 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
        <p className="mt-4 text-sm font-semibold text-slate-400 animate-pulse tracking-wide">Loading car details...</p>
      </div>
    );
  }

  // ⚠️ কার না পাওয়া গেলে ডার্ক এরর স্টেট
  if (!car?._id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white py-20 text-center">
        <div className="text-4xl mb-3 text-rose-500/80">⚠️</div>
        <h3 className="text-lg font-bold text-slate-200">Car Not Found</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">The vehicle you are looking for might have been unlisted or removed.</p>
      </div>
    );
  }

  const carImage = car.image || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";
  const isAvailable = car.availability === "available" || !car.availability;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 bg-slate-950 text-white select-none relative overflow-hidden">
      
      {/* 🔮 ব্যাকগ্রাউন্ডে নিয়ন গ্লো ইফেক্টস */}
      <div className="absolute top-10 left-1/4 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -z-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* 🏎️ কার ইমেজ সেকশন - এখানে NextImage ব্যবহার করা হয়েছে */}
      <div className="relative z-10 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/20 shadow-2xl shadow-cyan-500/5">
        <NextImage 
          className="h-[250px] sm:h-[380px] md:h-[460px] w-full object-cover transition-transform duration-700 hover:scale-[1.01]" 
          alt={car.name} 
          src={carImage} 
          height={600} 
          width={1100} 
          priority
        />
      </div>

      {/* মেইন গ্রিড লেআউট */}
      <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        
        {/* বাম পাশের ইনফরমেশন সেকশন */}
        <section className="rounded-xl border border-white/5 bg-slate-900/10 p-6 md:p-8 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <span className="rounded border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-cyan-400 backdrop-blur">
              {car.type || "Vehicle"}
            </span>
            <span className={`rounded border px-3 py-1.5 backdrop-blur capitalize ${
              isAvailable 
                ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-400" 
                : "border-rose-500/30 bg-rose-950/40 text-rose-400"
            }`}>
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              {car.availability || "Available"}
            </span>
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {car.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-5 text-sm text-slate-400 border-b border-white/5 pb-6">
            <span className="flex items-center gap-2">
              <LuMapPin className="text-cyan-400" size={16} /> 
              {car.pickupLocation || "Location N/A"}
            </span>
            <span className="flex items-center gap-2">
              <Users className="text-cyan-400" size={16} /> 
              {car.seatCapacity || 4} Seats
            </span>
          </div>

          <h2 className="mt-8 text-xl font-bold tracking-tight text-slate-200">Overview</h2>
          <p className="mt-3 text-sm md:text-base leading-7 md:leading-8 text-slate-400 font-normal">
            {car.description || "No description provided for this vehicle."}
          </p>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rental Rate</p>
            <p className="mt-1 text-3xl font-extrabold text-white">
              ${car.dailyRentPrice}
              <span className="text-sm font-medium text-slate-500"> / day</span>
            </p>
          </div>
        </section>

        {/* ডান পাশের স্টিকি বুকিং কার্ড */}
        <div className="h-fit lg:sticky lg:top-24">
          <BookingCar destination={car} />
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;