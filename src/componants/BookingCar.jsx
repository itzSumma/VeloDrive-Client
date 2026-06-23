"use client";

import { Button, Card } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const BookingCar = ({ destination: car }) => {
  const router = useRouter();
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;
  const rent = car.dailyRentPrice || car.price || 0;

  const handleBooking = async () => {
    if (!userEmail) {
      toast.error("Please login first to book a car!");
      router.push(`/login?redirect=${encodeURIComponent(`/cars/${car._id}`)}`);
      return;
    }

    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();
      if (!tokenData?.token) throw new Error("Your session has expired. Please log in again.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://velo-drive-server-mauve.vercel.app"}/bookings`,
        {
        method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          carId: car._id,
          driverNeeded,
          specialNote,
        }),
      });
      console.log(res);
      if (!res.ok) {
        toast.error("Booking failed. Please try again.");
        return;
      }

      toast.success("You booked successfully!");
      setSpecialNote("");
      setDriverNeeded("No");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="relative overflow-hidden rounded-xl border border-white/5 bg-slate-900/20 p-6 text-white shadow-xl shadow-cyan-500/5 backdrop-blur-md select-none">
      <div className="pointer-events-none absolute -bottom-10 -left-10 -z-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-[40px]" />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Starting from
        </p>
        <h2 className="mt-1 text-3xl font-extrabold text-white">
          ${rent}
          <span className="text-sm font-medium text-slate-500"> / day</span>
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          for {car.name || "this vehicle"}
        </p>

        <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-300">
          Driver Needed
          <select
            value={driverNeeded}
            onChange={(event) => setDriverNeeded(event.target.value)}
            className="cursor-pointer rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 font-normal text-white outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
          >
            <option value="No" className="bg-slate-950">
              No (Self Drive)
            </option>
            <option value="Yes" className="bg-slate-950">
              Yes (With Driver)
            </option>
          </select>
        </label>

        <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-300">
          Special Note
          <textarea
            value={specialNote}
            onChange={(event) => setSpecialNote(event.target.value)}
            rows={4}
            className="resize-none rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2.5 font-normal text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950"
            placeholder="Pickup time, route, or driver notes..."
          />
        </label>

        <Button
          onClick={handleBooking}
          isLoading={loading}
          disabled={loading}
          className={`mt-6 w-full py-6 text-base font-bold text-slate-950 transition-all duration-300 ${
            loading
              ? "cursor-not-allowed rounded-lg bg-slate-800 text-slate-500 shadow-none"
              : "rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/10 active:scale-[0.98] md:hover:from-cyan-400 md:hover:to-blue-400"
          }`}
        >
          {loading ? "Booking Vehicle..." : "Book Now"}
        </Button>
      </div>
    </Card>
  );
};

export default BookingCar;
