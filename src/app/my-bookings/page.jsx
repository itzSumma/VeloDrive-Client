"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// 🎯 Better-Auth ক্লায়েন্ট অবজেক্ট ইম্পোর্ট
import { authClient } from "@/lib/auth-client"; 

const MyBookingsPage = () => {
  // 🎯 useSession হুক ব্যবহার করে কারেন্ট ইউজার ডাটা নেওয়া
  const { data: session, isPending } = authClient.useSession(); 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const SERVER_URL = "http://localhost:5000";

  // ডাটা ফেচিং ফাংশন
  const fetchMyBookings = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/bookings?email=${session.user.email}`);
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

  useEffect(() => {
    if (!isPending) {
      fetchMyBookings();
    }
  }, [session?.user?.email, isPending]);

  // লোডিং স্পিনার (রিকোয়ারমেন্ট অনুযায়ী)
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
        <p className="mt-4 text-sm font-semibold text-slate-400 animate-pulse">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10 bg-slate-950 text-white relative overflow-hidden select-none">
      {/* 🔮 ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-0 left-1/4 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* হেডার সেকশন */}
      <div className="relative z-10 mb-8 border-b border-white/5 pb-5">
        <h1 className="text-4xl font-extrabold tracking-tight">
          My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bookings</span>
        </h1>
        <p className="mt-2 text-slate-400">Track and manage your vehicle rental reservations.</p>
      </div>

      {/* ডাটা রেন্ডারিং এরিয়া */}
      <div className="relative z-10">
        {bookings.length > 0 ? (
          <>
            {/* 📱 ১. মোবাইল ভিউ (কার্ড লেআউট) */}
            <div className="grid gap-4 md:hidden">
              {bookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className="rounded-xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center">
                      {booking.carImage ? (
                        <img src={booking.carImage} alt={booking.carName} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xl">🚗</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-cyan-400 truncate">{booking.carName || "Premium Car"}</h3>
                      <p className="text-lg font-extrabold text-white mt-0.5">${booking.totalPrice}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                    <div>
                      <p className="text-slate-500 font-medium">Booking Date</p>
                      <p className="text-slate-300 font-semibold mt-0.5">
                        {booking.bookingDate 
                          ? new Date(booking.bookingDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) 
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium">Driver Requirement</p>
                      <span className={`inline-block mt-1 rounded-full px-2 py-0.5 font-medium border ${
                        booking.driverNeeded === "Yes" 
                          ? "border-purple-500/30 bg-purple-950/40 text-purple-400" 
                          : "border-slate-500/30 bg-slate-950/40 text-slate-400"
                      }`}>
                        {booking.driverNeeded === "Yes" ? "With Driver" : "Self Drive"}
                      </span>
                    </div>
                  </div>

                  {booking.specialNote && (
                    <div className="rounded-lg bg-slate-950/50 p-2 border border-white/5 text-xs">
                      <p className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Special Note:</p>
                      <p className="text-slate-400 mt-0.5 italic truncate">{booking.specialNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 💻 ②. ডেস্কটপ ভিউ (টেবিল লেআউট) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10 bg-slate-900/20 backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-950/60 text-sm font-semibold text-slate-400 whitespace-nowrap">
                    <th className="p-4 w-24">Vehicle</th> 
                    <th className="p-4">Car Name</th>
                    <th className="p-4">Booking Date</th>
                    <th className="p-4">Driver Needed</th>
                    <th className="p-4">Special Note</th>
                    <th className="p-4 text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/[0.02] transition-colors whitespace-nowrap">
                      <td className="p-4">
                        <div className="h-12 w-20 overflow-hidden rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center shadow-md">
                          {booking.carImage ? (
                            <img src={booking.carImage} alt={booking.carName || "Car"} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xl">🚗</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-cyan-400">{booking.carName || "Premium Car"}</td>
                      <td className="p-4 text-slate-300">
                        {booking.bookingDate 
                          ? new Date(booking.bookingDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) 
                          : <span className="text-slate-600 italic">N/A</span>}
                      </td>
                      <td className="p-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium border ${
                          booking.driverNeeded === "Yes" 
                            ? "border-purple-500/30 bg-purple-950/40 text-purple-400" 
                            : "border-slate-500/30 bg-slate-950/40 text-slate-400"
                        }`}>
                          {booking.driverNeeded === "Yes" ? "With Driver" : "Self Drive"}
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
          </>
        ) : (
          /* ডেটা না থাকলে ক্লিন স্টেট */
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