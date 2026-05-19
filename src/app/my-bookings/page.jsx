"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔌 সরাসরি লোকাল ব্যাকএন্ড URL
  const SERVER_URL = "http://localhost:5000";
  
  // 👤 সাময়িকভাবে বুকিং টেস্ট করার জন্য একটি মক ইউজার আইডি (আপনার BookingCar-এর সাথে মিল রেখে)
  const mockUserId = "user_123"; 

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch(`${SERVER_URL}/bookings/${mockUserId}`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Could not load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [SERVER_URL]);

  // ⏳ ডার্ক লোডিং স্টেট
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
        <p className="mt-4 text-sm font-semibold text-slate-400 animate-pulse">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 bg-slate-950 text-white relative overflow-hidden select-none">
      {/* 🔮 নিয়ন ব্যাকগ্রাউন্ড ইফেক্ট */}
      <div className="absolute top-0 left-1/4 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mb-8 border-b border-white/5 pb-5">
        <h1 className="text-4xl font-extrabold tracking-tight">
          My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bookings</span>
        </h1>
        <p className="mt-2 text-slate-400">Track and manage your vehicle rental reservations.</p>
      </div>

      <div className="relative z-10">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/20 backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-slate-950/60 text-sm font-semibold text-slate-400">
                  <th className="p-4">Car ID</th>
                  <th className="p-4">Driver Needed</th>
                  <th className="p-4">Special Note</th>
                  <th className="p-4 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-cyan-400 text-xs">{booking.carId}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium border ${
                        booking.driverNeeded === "Yes" 
                          ? "border-purple-500/30 bg-purple-950/40 text-purple-400" 
                          : "border-slate-500/30 bg-slate-950/40 text-slate-400"
                      }`}>
                        {booking.driverNeeded}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs truncate text-slate-400">
                      {booking.specialNote || <span className="italic text-slate-600">No notes</span>}
                    </td>
                    <td className="p-4 text-right font-bold text-white">${booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* 🔍 বুকিং না থাকলে এম্পটি স্টেট */
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/10 p-10 text-center backdrop-blur-sm">
            <div className="text-4xl mb-3 text-cyan-500/70">📅</div>
            <h3 className="text-lg font-bold text-slate-200">No Bookings Yet</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-xs mx-auto">
              You haven't made any reservations. Explore our fleet to book a car!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;
