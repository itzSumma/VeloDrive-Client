"use client";

import { Button } from "@heroui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

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
  const { data: session } = authClient.useSession();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!session?.user?.email) {
      toast.error("You must be logged in to add a car.");
      return;
    }

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const rawCarData = Object.fromEntries(formData.entries());

    const carData = {
      ...rawCarData,
      dailyRentPrice: Number(rawCarData.dailyRentPrice),
      seatCapacity: Number(rawCarData.seatCapacity),
      bookingCount: 0,
      ownerEmail: session.user.email,
      ownerName: session.user.name || "Anonymous",
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://velo-drive-server.vercel.app"}/cars`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(carData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      toast.success("Car added successfully.");
      router.push("/my-added-cars");
    } catch (error) {
      toast.error("Failed to connect to server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white select-none">
        <div className="pointer-events-none absolute left-1/2 top-1/4 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

        <main className="relative z-10 mx-auto max-w-5xl px-4 py-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Add{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              New Car
            </span>
          </h1>
          <p className="mt-2 text-slate-400">
            List your vehicle for DriveFleet customers.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 grid gap-6 rounded-xl border border-white/10 bg-slate-900/20 p-6 backdrop-blur-md md:grid-cols-2 md:p-8"
          >
            {fields.map(([name, label, placeholder]) => (
              <label
                key={name}
                className="grid gap-2 text-sm font-semibold text-slate-300"
              >
                {label}
                <input
                  required
                  name={name}
                  type={
                    name === "dailyRentPrice" || name === "seatCapacity"
                      ? "number"
                      : "text"
                  }
                  placeholder={placeholder}
                  className="rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 font-normal text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
                />
              </label>
            ))}

            <label className="grid gap-2 text-sm font-semibold text-slate-300">
              Car Type
              <select
                required
                name="type"
                className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 font-normal text-white outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-300">
              Availability Status
              <select
                required
                name="availability"
                className="rounded-lg border border-white/10 bg-slate-950 px-4 py-3 font-normal text-white outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-slate-300 md:col-span-2">
              Description
              <textarea
                required
                name="description"
                rows={5}
                placeholder="Describe features, condition, rental notes, and comfort details."
                className="resize-none rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 font-normal text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-slate-950/80"
              />
            </label>

            <Button
              type="submit"
              isLoading={loading}
              disabled={loading}
              className={`py-6 text-base font-bold text-slate-950 transition-all duration-300 md:col-span-2 ${
                loading
                  ? "cursor-not-allowed rounded-lg bg-slate-800 text-slate-500 shadow-none"
                  : "rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/10 active:scale-[0.98] md:hover:from-cyan-400 md:hover:to-blue-400"
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
