"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import { CarFront } from "lucide-react";

const Navbar = () => {
  return (
   
    <div className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 px-4 py-3 backdrop-blur-md transition-all duration-300 select-none">
    
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 md:flex-nowrap">
        
      
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-white transition-transform active:scale-95"
        >
        
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/10">
            <CarFront size={22} />
          </span>
          <span className="tracking-tight">
            Velo<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-extrabold drop-shadow-sm">Drive</span>
          </span>
        </Link>

        <ul className="flex items-center gap-x-5 gap-y-1 text-sm font-medium text-slate-400 order-3 w-full justify-start overflow-x-auto py-1 md:order-none md:w-auto md:overflow-visible md:py-0 no-scrollbar">
          <li>
            <Link href="/" className="md:hover:text-cyan-400 active:text-cyan-400 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/cars" className="md:hover:text-cyan-400 active:text-cyan-400 transition-colors duration-200 whitespace-nowrap">
              Explore Cars
            </Link>
          </li>
          <li>
            <Link href="/add-car" className="md:hover:text-cyan-400 active:text-cyan-400 transition-colors duration-200 whitespace-nowrap">
              Add Car
            </Link>
          </li>
          <li>
            <Link href="/my-bookings" className="md:hover:text-cyan-400 active:text-cyan-400 transition-colors duration-200 whitespace-nowrap">
              My Bookings
            </Link>
          </li>
          <li>
            <Link href="/my-added-cars" className="md:hover:text-cyan-400 active:text-cyan-400 transition-colors duration-200 whitespace-nowrap">
              My Added Cars
            </Link>
          </li>
        </ul>

        
        <div className="flex items-center gap-3 text-sm font-medium order-2 md:order-none">
          <Link href="/login" className="text-slate-300 md:hover:text-cyan-400 active:text-cyan-400 transition-colors duration-200 py-1.5 px-3 rounded-md md:hover:bg-white/5 active:bg-white/5">
            Login
          </Link>
          <Link href="/signup">
          
            <Button 
              size="sm" 
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold md:hover:from-cyan-400 md:hover:to-blue-400 md:hover:shadow-lg md:hover:shadow-cyan-500/20 transition-all duration-300 active:scale-95"
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