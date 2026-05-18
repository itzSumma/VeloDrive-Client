"use client";

import { Button, Card } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingCar = ({ destination: car }) => {
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔌 সরাসরি লোকাল ব্যাকএন্ড URL
  const SERVER_URL = "http://localhost:5000";

  const rent = car.dailyRentPrice || car.price || 0;

  const handleBooking = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/bookings`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          carId: car._id,
          driverNeeded,
          specialNote,
          totalPrice: rent,
          // userId: "mock_user_id_here" // ব্যাকএন্ডে যদি ইউজার আইডি লাগে, এখানে পাস করতে পারেন
        }),
      });

      if (!res.ok) {
        toast.error("Booking failed. Please try again.");
        return;
      }

      toast.success("You booked successfully!");
      setSpecialNote(""); // বুকিং শেষ হলে টেক্সট এরিয়া ক্লিয়ার হবে
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔮 গ্লাস-মরফিজম ডার্ক থিম কার্ড লেআউট
    <Card className="rounded-xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-md text-white shadow-xl shadow-cyan-500/5 relative overflow-hidden select-none">
      
      {/* ব্যাকগ্রাউন্ডে সূক্ষ্ম নিয়ন গ্লো */}
      <div className="absolute -bottom-10 -left-10 -z-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-[40px] pointer-events-none" />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Starting from</p>
        <h2 className="mt-1 text-3xl font-extrabold text-white">
          ${rent}
          <span className="text-sm font-medium text-slate-500"> / day</span>
        </h2>
        <p className="mt-1 text-xs text-slate-400">for {car.name || "this vehicle"}</p>

        {/* ড্রাইভার রিকোয়ারমেন্ট সিলেক্ট অপশন */}
        <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-300">
          Driver Needed
          <select
            value={driverNeeded}
            onChange={(event) => setDriverNeeded(event.target.value)}
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 font-normal text-white outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80 cursor-pointer"
          >
            <option value="No" className="bg-slate-950">No (Self Drive)</option>
            <option value="Yes" className="bg-slate-950">Yes (With Driver)</option>
          </select>
        </label>

        {/* স্পেশাল নোট টেক্সট এরিয়া */}
        <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-300">
          Special Note
          <textarea
            value={specialNote}
            onChange={(event) => setSpecialNote(event.target.value)}
            rows={4}
            className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2.5 font-normal text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950 resize-none"
            placeholder="Pickup time, route, or driver notes..."
          />
        </label>

        {/* 🏎️ সাবমিট বাটন */}
        <Button
          onClick={handleBooking}
          isLoading={loading}
          disabled={loading}
          className={`mt-6 w-full font-bold text-slate-950 transition-all duration-300 py-6 text-base rounded-lg
            ${loading 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none" 
              : "bg-gradient-to-r from-cyan-500 to-blue-500 md:hover:from-cyan-400 md:hover:to-blue-400 shadow-lg shadow-cyan-500/10 active:scale-[0.98]"
            }`}
        >
          {loading ? "Booking Vehicle..." : "Book Now"}
        </Button>
      </div>
    </Card>
  );
};

export default BookingCar;