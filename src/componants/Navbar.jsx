"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { CarFront } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* ১. লোগো সেকশন */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-950"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded bg-cyan-500 text-white">
            <CarFront size={22} />
          </span>
          <span>
            Velo<span className="text-cyan-500">Drive</span>
          </span>
        </Link>

        {/* ২. অল নেভিগেশন লিংকস (সব পেজ একসাথে শো করবে) */}
        <ul className="flex flex-wrap gap-6 text-sm font-medium text-slate-700 items-center">
          <li>
            <Link href="/" className="hover:text-cyan-500 transition">Home</Link>
          </li>
          <li>
            <Link href="/cars" className="hover:text-cyan-500 transition">Explore Cars</Link>
          </li>
          <li>
            <Link href="/add-car" className="hover:text-cyan-500 transition">Add Car</Link>
          </li>
          <li>
            <Link href="/my-bookings" className="hover:text-cyan-500 transition">My Bookings</Link>
          </li>
          <li>
            <Link href="/my-added-cars" className="hover:text-cyan-500 transition">My Added Cars</Link>
          </li>
        </ul>

        {/* ৩. অথেনটিকেশন বাটনস (লগইন ও রেজিস্টার) */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="text-slate-700 hover:text-cyan-500 transition">
            Login
          </Link>
          <Link href="/signup">
            <Button size="sm" className="rounded bg-cyan-500 text-white font-medium hover:bg-cyan-600 transition">
              Register
            </Button>
          </Link>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;