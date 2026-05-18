"use client";

import { Button } from '@heroui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const fields = [
  ["name", "Car Name", "Toyota Corolla"],
  ["dailyRentPrice", "Daily Rent Price", "75"],
  ["image", "Image URL", "https://example.com/car.jpg"],
  ["seatCapacity", "Seat Capacity", "4"],
  ["pickupLocation", "Pickup Location", "Dhaka Airport"],
];

const AddCarPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ⚠️ ডেভেলপমেন্ট ও প্রোডাকশনের জন্য গ্লোবাল ব্যাকএন্ড URL ভেরিয়েবল
  const SERVER_URL = "http://localhost:5000"; 

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const formData = new FormData(event.currentTarget);
    const rawCarData = Object.fromEntries(formData.entries());

    // 🚀 ডেটাবেজে পাঠানোর আগে প্রাইস ও সিট সংখ্যাকে Number-এ রূপান্তর
    const carData = {
      ...rawCarData,
      dailyRentPrice: Number(rawCarData.dailyRentPrice),
      seatCapacity: Number(rawCarData.seatCapacity),
    };

    try {
      const response = await fetch(`${SERVER_URL}/cars`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(carData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      toast.success("Car added successfully to MongoDB.");
      router.push("/my-added-cars"); 
    } catch (error) {
      toast.error("Failed to connect to server.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white select-none relative overflow-hidden">
      
      {/* 🔮 ব্যাকগ্রাউন্ডে নিয়ন গ্লো ইফেক্ট */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <main className="mx-auto max-w-5xl px-4 py-10 relative z-10">
        {/* টাইটেল গ্রেডিয়েন্ট টেক্সট */}
        <h1 className="text-4xl font-extrabold tracking-tight">
          Add <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">New Car</span>
        </h1>
        <p className="mt-2 text-slate-400">List your vehicle for VeloDrive customers.</p>
        
        {/* 🛠️ ডার্ক মোড এবং মডার্ন বর্ডার ইনপুট ফর্ম */}
        <form 
          onSubmit={onSubmit} 
          className="mt-8 grid gap-6 rounded-xl border border-white/5 bg-slate-900/20 p-6 md:p-8 backdrop-blur-md md:grid-cols-2"
        >
          {fields.map(([name, label, placeholder]) => (
            <label key={name} className="grid gap-2 text-sm font-semibold text-slate-300">
              {label}
              <input 
                required 
                name={name}
                type={name === "dailyRentPrice" || name === "seatCapacity" ? "number" : "text"}
                placeholder={placeholder} 
                className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 font-normal text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80" 
              />
            </label>
          ))}
          
          {/* কার টাইপ সিলেক্ট */}
          <label className="grid gap-2 text-sm font-semibold text-slate-300">
            Car Type
            <select 
              required 
              name="type" 
              className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 font-normal text-white outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
            >
              <option value="SUV" className="bg-slate-950">SUV</option>
              <option value="Sedan" className="bg-slate-950">Sedan</option>
              <option value="Hatchback" className="bg-slate-950">Hatchback</option>
              <option value="Luxury" className="bg-slate-950">Luxury</option>
            </select>
          </label>
          
          {/* অ্যাভেইলঅ্যাবিলিটি সিলেক্ট */}
          <label className="grid gap-2 text-sm font-semibold text-slate-300">
            Availability Status
            <select 
              required 
              name="availability" 
              className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 font-normal text-white outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
            >
              <option value="available" className="bg-slate-950">Available</option>
              <option value="unavailable" className="bg-slate-950">Unavailable</option>
            </select>
          </label>
          
          {/* ডেসক্রিপশন টেক্সট এরিয়া */}
          <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">
            Description
            <textarea 
              required 
              name="description" 
              rows={5} 
              placeholder="Describe features, condition, rental notes, and comfort details." 
              className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 font-normal text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80 resize-none" 
            />
          </label>
          
          {/* 🏎️ সাবমিট বাটন (প্রিমিয়াম নিয়ন লুক ও মোবাইল টাচ ফিডব্যাক সহ) */}
          <Button 
            type="submit" 
            isLoading={loading}
            disabled={loading}
            className={`md:col-span-2 font-bold text-slate-950 transition-all duration-300 py-6 text-base rounded-lg
              ${loading 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-r from-cyan-500 to-blue-500 md:hover:from-cyan-400 md:hover:to-blue-400 shadow-lg shadow-cyan-500/10 active:scale-[0.98]"
              }`}
          >
            {loading ? "Processing, Please Wait..." : "Add Car to Fleet"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddCarPage;
