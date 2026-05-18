"use client";

import { Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { CarFront } from "lucide-react";

const Navbar = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(true);


  const dummyUser = {
    name: "John Doe",
    email: "john@example.com",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d", // ডামি ইমেজ ইউআরএল
  };

  const handleSignOut = () => {
 
    setIsLoggedIn(false);
  };

  return (
    <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        
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

       
        <ul className="flex flex-wrap gap-5 text-sm font-medium text-slate-700 items-center">
          <li>
            <Link href="/" className="hover:text-cyan-500 transition">Home</Link>
          </li>
          <li>
            <Link href="/cars" className="hover:text-cyan-500 transition">Explore Cars</Link>
          </li>
        </ul>

    
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
           
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <div className="cursor-pointer transition hover:opacity-80">
                  <Avatar name={dummyUser.name} src={dummyUser.image} size="sm" />
                </div>
              </DropdownTrigger>
              
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-cyan-600">{dummyUser.email}</p>
                </DropdownItem>
                
                
                <DropdownItem key="add-car">
                  <Link href="/add-car" className="w-full block">Add Car</Link>
                </DropdownItem>
                <DropdownItem key="my-bookings">
                  <Link href="/my-bookings" className="w-full block">My Bookings</Link>
                </DropdownItem>
                <DropdownItem key="my-added-cars">
                  <Link href="/my-added-cars" className="w-full block">My Added Cars</Link>
                </DropdownItem>
                
                <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
           
            <ul className="flex items-center gap-4 text-sm font-medium">
              <li>
                <Link href="/login" className="text-slate-700 hover:text-cyan-500 transition">Login</Link>
              </li>
              <li>
                <Link href="/signup">
                  <Button size="sm" color="primary" className="rounded bg-cyan-500 text-white font-medium">
                    Register
                  </Button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;