"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { CarFront } from "lucide-react";

const Navbar = () => {
  return (
    // ডাইনামিক ব্লার ও ট্রানজিশন ইফেক্টসহ স্টিকি ন্যাভবার
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md transition-all duration-300">
      {/* মোবাইলে লোগো ও বাটন দুই পাশে থাকবে এবং মেনু আইটেমগুলো নিচে সুন্দরভাবে সাজানো থাকবে */}
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 md:flex-nowrap">
        
        {/* ১. লোগো সেকশন */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-950 transition-transform active:scale-95"
        >
          {/* লোগো আইকনে আধুনিক ডাইনামিক গ্রেডিয়েন্ট ও হালকা শ্যাডো */}
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
            <CarFront size={22} />
          </span>
          <span className="tracking-tight">
            Velo<span className="text-cyan-500 font-extrabold drop-shadow-sm">Drive</span>
          </span>
        </Link>

        {/* ২. অল নেভিগেশন লিংকস (মোবাইলে স্ক্রোলযোগ্য এবং স্মুথ কালার হোভার) */}
        <ul className="flex items-center gap-x-5 gap-y-1 text-sm font-medium text-slate-600 order-3 w-full justify-start overflow-x-auto py-1 md:order-none md:w-auto md:overflow-visible md:py-0 no-scrollbar">
          <li>
            <Link href="/" className="hover:text-cyan-500 hover:underline underline-offset-4 decoration-2 transition-colors duration-200">Home</Link>
          </li>
          <li>
            <Link href="/cars" className="hover:text-cyan-500 hover:underline underline-offset-4 decoration-2 transition-colors duration-200 whitespace-nowrap">Explore Cars</Link>
          </li>
          <li>
            <Link href="/add-car" className="hover:text-cyan-500 hover:underline underline-offset-4 decoration-2 transition-colors duration-200 whitespace-nowrap">Add Car</Link>
          </li>
          <li>
            <Link href="/my-bookings" className="hover:text-cyan-500 hover:underline underline-offset-4 decoration-2 transition-colors duration-200 whitespace-nowrap">My Bookings</Link>
          </li>
          <li>
            <Link href="/my-added-cars" className="hover:text-cyan-500 hover:underline underline-offset-4 decoration-2 transition-colors duration-200 whitespace-nowrap">My Added Cars</Link>
          </li>
        </ul>

        {/* ৩. অথেনটিকেশন বাটনস (মোবাইল ও ডেক্সটপে সঠিক পজিশন ও ডাইনামিক কালার) */}
        <div className="flex items-center gap-3 text-sm font-medium order-2 md:order-none">
          <Link href="/login" className="text-slate-700 hover:text-cyan-500 transition-colors duration-200 py-1.5 px-3 rounded-md hover:bg-slate-50">
            Login
          </Link>
          <Link href="/signup">
            {/* রেজিস্টার বাটনে প্রিমিয়াম ডায়নামিক গ্রেডিয়েন্ট, শ্যাডো এবং ক্লিক অ্যানিমেশন */}
            <Button 
              size="sm" 
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-md shadow-cyan-500/20 active:scale-95"
            >
              Register
            </Button>
          </Link>
        </div>

      </nav>
    </div>
  );
};

export default Navbar;