"use client";

import NextImage from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { Users } from "lucide-react";
import BookingCar from "@/componants/BookingCar";
import { apiBaseUrl } from "@/lib/config";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/cars/${id}`, { cache: "no-store" })
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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 py-20 text-center text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
        <p className="mt-4 animate-pulse text-sm font-semibold tracking-wide text-slate-400">
          Loading car details...
        </p>
      </div>
    );
  }

  if (!car?._id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 py-20 text-center text-white">
        <div className="mb-3 text-4xl text-rose-500/80">404</div>
        <h3 className="text-lg font-bold text-slate-200">Car Not Found</h3>
        <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
          The vehicle you are looking for might have been unlisted or removed.
        </p>
      </div>
    );
  }

  const carImage =
    car.image ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";
  const isAvailable = car.availability === "available" || !car.availability;

  return (
    <main className="relative mx-auto min-h-screen max-w-7xl overflow-hidden bg-slate-950 px-4 py-10 text-white select-none">
      <div className="pointer-events-none absolute left-1/4 top-10 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 -z-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-900/20 shadow-2xl shadow-cyan-500/5">
        <NextImage
          className="h-[250px] w-full object-cover transition-transform duration-700 hover:scale-[1.01] sm:h-[380px] md:h-[460px]"
          alt={car.name}
          src={carImage}
          height={600}
          width={1100}
          priority
        />
      </div>

      <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-white/5 bg-slate-900/10 p-6 backdrop-blur-md md:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <span className="rounded border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-cyan-400 backdrop-blur">
              {car.type || "Vehicle"}
            </span>
            <span
              className={`rounded border px-3 py-1.5 capitalize backdrop-blur ${
                isAvailable
                  ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-400"
                  : "border-rose-500/30 bg-rose-950/40 text-rose-400"
              }`}
            >
              <span
                className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                  isAvailable ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                }`}
              />
              {car.availability || "Available"}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {car.name}
          </h1>

          <div className="mt-4 flex flex-wrap gap-5 border-b border-white/5 pb-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <LuMapPin className="text-cyan-400" size={16} />
              {car.pickupLocation || "Location N/A"}
            </span>
            <span className="flex items-center gap-2">
              <Users className="text-cyan-400" size={16} />
              {car.seatCapacity || 4} Seats
            </span>
          </div>

          <h2 className="mt-8 text-xl font-bold tracking-tight text-slate-200">
            Overview
          </h2>
          <p className="mt-3 text-sm font-normal leading-7 text-slate-400 md:text-base md:leading-8">
            {car.description || "No description provided for this vehicle."}
          </p>

          <div className="mt-8 border-t border-white/5 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Rental Rate
            </p>
            <p className="mt-1 text-3xl font-extrabold text-white">
              ${car.dailyRentPrice}
              <span className="text-sm font-medium text-slate-500"> / day</span>
            </p>
          </div>
        </section>

        <div className="h-fit lg:sticky lg:top-24">
          <BookingCar destination={car} />
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;
