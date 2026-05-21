"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  CarFront,
  ChevronDown,
  LogOut,
  PlusCircle,
  ReceiptText,
  UserCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Logout failed.");
      return;
    }

    setMenuOpen(false);
    toast.success("Logged out successfully.");
  };

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
            Velo
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-extrabold text-transparent drop-shadow-sm">
              Drive
            </span>
          </span>
        </Link>

        <ul className="order-3 flex w-full items-center justify-start gap-x-5 gap-y-1 overflow-x-auto py-1 text-sm font-medium text-slate-400 no-scrollbar md:order-none md:w-auto md:flex-nowrap md:overflow-visible md:py-0">
          <li>
            <Link
              href="/"
              className="transition-colors duration-200 md:hover:text-cyan-400 active:text-cyan-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/cars"
              className="whitespace-nowrap transition-colors duration-200 md:hover:text-cyan-400 active:text-cyan-400"
            >
              Explore Cars
            </Link>
          </li>
          {!isPending && !session?.user && (
            <>
              <li>
                <Link
                  href="/add-car"
                  className="whitespace-nowrap transition-colors duration-200 md:hover:text-cyan-400 active:text-cyan-400"
                >
                  Add Car
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="whitespace-nowrap transition-colors duration-200 md:hover:text-cyan-400 active:text-cyan-400"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/my-added-cars"
                  className="whitespace-nowrap transition-colors duration-200 md:hover:text-cyan-400 active:text-cyan-400"
                >
                  My Added Cars
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="order-2 flex items-center gap-3 text-sm font-medium md:order-none">
          {!isPending && session?.user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-slate-200 transition-colors md:hover:border-cyan-500/30 md:hover:bg-white/10"
              >
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-300">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle2 size={20} />
                  )}
                </span>
                <span className="hidden text-sm md:block">
                  <span className="block max-w-32 truncate font-semibold">
                    {session.user.name || "Account"}
                  </span>
                  <span className="block max-w-32 truncate text-xs text-slate-400">
                    {session.user.email}
                  </span>
                </span>
                <ChevronDown size={16} className="text-slate-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-md">
                  <Link
                    href="/add-car"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-200 transition-colors hover:bg-white/5"
                  >
                    <PlusCircle size={16} className="text-cyan-400" />
                    Add Car
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-200 transition-colors hover:bg-white/5"
                  >
                    <ReceiptText size={16} className="text-cyan-400" />
                    My Bookings
                  </Link>
                  <Link
                    href="/my-added-cars"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-200 transition-colors hover:bg-white/5"
                  >
                    <CarFront size={16} className="text-cyan-400" />
                    My Added Cars
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-rose-300 transition-colors hover:bg-rose-500/10"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-slate-300 transition-colors duration-200 md:hover:bg-white/5 md:hover:text-cyan-400 active:bg-white/5 active:text-cyan-400"
              >
                Login
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-slate-950 transition-all duration-300 md:hover:from-cyan-400 md:hover:to-blue-400 md:hover:shadow-lg md:hover:shadow-cyan-500/20 active:scale-95"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
