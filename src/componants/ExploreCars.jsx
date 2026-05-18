"use client";

import { Button } from "@heroui/react";
import { FiExternalLink } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { Users } from "lucide-react";
import Link from "next/link";

// 🎨 কার টাইপ অনুযায়ী ডাইনামিক স্টাইল (মোবাইল এবং ডেস্কটপ অপ্টিমাইজড)
const typeStyles = {
  SUV: {
    badge: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30",
    cardHover:
      "md:hover:border-cyan-500/40 md:hover:shadow-cyan-500/5 active:border-cyan-400 active:bg-cyan-950/20",
    buttonHover:
      "md:hover:bg-cyan-500 md:hover:text-slate-950 md:hover:border-cyan-500 md:hover:shadow-cyan-500/25 active:bg-cyan-600 active:scale-95",
    textHover: "group-hover:text-cyan-400",
  },

  Sedan: {
    badge: "text-teal-400 bg-teal-950/40 border-teal-500/30",
    cardHover:
      "md:hover:border-teal-500/40 md:hover:shadow-teal-500/5 active:border-teal-400 active:bg-teal-950/20",
    buttonHover:
      "md:hover:bg-teal-500 md:hover:text-slate-950 md:hover:border-teal-500 md:hover:shadow-teal-500/25 active:bg-teal-600 active:scale-95",
    textHover: "group-hover:text-teal-400",
  },

  Hatchback: {
    badge: "text-blue-400 bg-blue-950/40 border-blue-500/30",
    cardHover:
      "md:hover:border-blue-500/40 md:hover:shadow-blue-500/5 active:border-blue-400 active:bg-blue-950/20",
    buttonHover:
      "md:hover:bg-blue-500 md:hover:text-slate-950 md:hover:border-blue-500 md:hover:shadow-blue-500/25 active:bg-cyan-600 active:scale-95",
    textHover: "group-hover:text-blue-400",
  },

  Luxury: {
    badge:
      "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 bg-slate-950/40 border-cyan-500/40",
    cardHover:
      "md:hover:border-blue-500/40 md:hover:shadow-blue-500/10 active:border-cyan-400 active:bg-slate-900/80",
    buttonHover:
      "md:hover:bg-gradient-to-r md:hover:from-cyan-500 md:hover:to-blue-500 md:hover:text-slate-950 md:hover:border-transparent active:from-cyan-600 active:to-blue-600 active:scale-95",
    textHover:
      "group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent",
  },

  Default: {
    badge: "text-slate-300 bg-slate-900/40 border-white/10",
    cardHover:
      "md:hover:border-cyan-500/30 md:hover:shadow-cyan-500/5 active:border-cyan-400",
    buttonHover:
      "md:hover:bg-cyan-500 md:hover:text-slate-950 md:hover:border-cyan-500 active:bg-cyan-600 active:scale-95",
    textHover: "group-hover:text-cyan-400",
  },
};

const ExploreCars = ({ destination: car }) => {
  const {
    _id,
    image,
    imageUrl,
    dailyRentPrice,
    price,
    name,
    carName,
    type,
    rentalPeriod,
    pickupLocation,
    location,
    seatCapacity,
    availability,
  } = car;

  // fallback data
  const carImage =
    image ||
    imageUrl ||
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop";

  const carNameText = name || carName || "Rental Car";
  const rent = dailyRentPrice || price || 0;

  // availability logic
  const isAvailable = availability === "available" || !availability;
  const currentStyles = typeStyles[type] || typeStyles.Default;

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-slate-950 text-white transition-all duration-300 select-none
      ${
        isAvailable
          ? `border-white/10 ${currentStyles.cardHover}
             /* 💻 ডেস্কটপ হোভার অ্যানিমেশন */
             md:hover:-translate-y-1.5 md:hover:shadow-2xl md:hover:shadow-cyan-500/5
             
             /* 📱 মোবাইল টাচ রেসপন্স (স্টিকি হোভার করবে না) */
             active:translate-y-0 active:scale-[0.98] active:duration-700`
          : "border-white/5 opacity-50 cursor-not-allowed"
      }`}
    >
      {/* Glow effect (মোবাইল টাচ ও ডেস্কটপ হোভার দুইটাই রিঅ্যাক্ট করবে) */}
      {isAvailable && (
        <div className="pointer-events-none absolute -top-12 -right-12 -z-0 h-24 w-24 rounded-full bg-cyan-500/10 blur-[40px] transition-all duration-500 group-hover:h-32 group-hover:w-32 group-hover:bg-cyan-500/20 group-active:h-36 group-active:w-36 group-active:bg-cyan-400/30" />
      )}

      {/* Image section */}
      <div className="relative z-10 h-52 w-full overflow-hidden border-b border-white/5 bg-slate-900/40 p-2">
        <img
          className={`h-full w-full rounded-lg object-cover transition-transform duration-700 ease-out
          ${
            isAvailable
              ? "group-hover:scale-105 group-active:scale-100"
              : "grayscale"
          }`}
          alt={carNameText}
          src={carImage}
        />

        {/* Availability badge */}
        <span
          className={`absolute top-4 right-4 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize shadow-sm backdrop-blur-md
          ${
            isAvailable
              ? "border-emerald-500/30 bg-emerald-950/60 text-emerald-400"
              : "border-rose-500/30 bg-rose-950/60 text-rose-400"
          }`}
        >
          <span
            className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
              isAvailable
                ? "bg-emerald-400 animate-pulse"
                : "bg-rose-400"
            }`}
          ></span>

          {availability || "available"}
        </span>
      </div>

      {/* Content section */}
      <div className="relative z-10 flex flex-1 flex-col p-5">
        {/* Car type badge */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${currentStyles.badge}`}
          >
            {type || "Car"}
          </span>
        </div>

        {/* Car title */}
        <h2
          className={`mt-3 line-clamp-1 text-xl font-bold text-white transition-colors duration-300
          ${
            isAvailable
              ? currentStyles.textHover
              : "text-slate-500"
          }`}
        >
          {carNameText}
        </h2>

        {/* Info section */}
        <div className="mt-4 space-y-2 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <LuMapPin
              className={`shrink-0 ${
                isAvailable
                  ? "text-cyan-400 group-hover:text-cyan-300 transition-colors"
                  : "text-slate-600"
              }`}
              size={16}
            />
            <span className="truncate">
              {pickupLocation || location || "Pickup location"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Users
              className={`shrink-0 ${
                isAvailable
                  ? "text-cyan-400 group-hover:text-cyan-300 transition-colors"
                  : "text-slate-600"
              }`}
              size={16}
            />
            <span>{seatCapacity || 4} seats</span>
          </div>
        </div>

        {/* Price + button */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div>
            <h3
              className={`text-2xl font-extrabold ${
                isAvailable ? "text-white" : "text-slate-600"
              }`}
            >
              ${rent}
            </h3>
         <p className="text-xs font-medium capitalize text-slate-500">
  / {rentalPeriod || "day"}
</p>
          </div>

          <Link
            href={`/cars/${_id}`}
            className={!isAvailable ? "pointer-events-none" : ""}
          >
            <Button
              variant={isAvailable ? "bordered" : "flat"}
              disabled={!isAvailable}
              className={`rounded text-xs font-bold transition-all duration-300
              ${
                isAvailable
                  ? `border-white/20 bg-white/5 text-white backdrop-blur ${currentStyles.buttonHover}`
                  : "cursor-not-allowed border-none bg-white/5 text-slate-500"
              }`}
              endContent={
                isAvailable ? (
                  <FiExternalLink className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0" />
                ) : null
              }
            >
              {isAvailable ? "Details" : "Rented Out"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreCars;