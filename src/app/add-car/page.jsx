"use client";

import { Button } from '@heroui/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

  const SERVER_URL = "http://localhost:5000"; 

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // 🚀 ১. এখানে লোডিং ট্রু করা হলো (আগে কমেন্ট করা ছিল)

    const formData = new FormData(event.currentTarget);
    const rawCarData = Object.fromEntries(formData.entries());

    // 🚀 ২. ডাটাবেজে পাঠানোর আগে প্রাইস ও সিট সংখ্যাকে Number-এ রূপান্তর করা হলো
    const carData = {
      ...rawCarData,
      dailyRentPrice: Number(rawCarData.dailyRentPrice),
      seatCapacity: Number(rawCarData.seatCapacity),
    };

    try {
      const response = await fetch(`${SERVER_URL}/cars`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(carData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Something went wrong!");
        return;
      }

      toast.success("Car added successfully to MongoDB.");
      router.push("/my-added-cars"); 
    } catch (error) {
      toast.error("Failed to connect to server.");
      console.error(error);
    } finally {
      setLoading(false); // কাজ শেষে লোডিং ফলস হয়ে যাবে
    }
  };

  return (
    <div>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-950">Add Car</h1>
        <p className="mt-2 text-slate-600">List your vehicle for VeloDrive customers.</p>
        
        <form onSubmit={onSubmit} className="mt-8 grid gap-5 rounded border border-slate-200 bg-white p-6 md:grid-cols-2">
          {fields.map(([name, label, placeholder]) => (
            <label key={name} className="grid gap-2 text-sm font-semibold text-slate-700">
              {label}
              <input 
                required 
                name={name}
                // দাম এবং সিট সংখ্যার ফিল্ডে টাইপ 'number' দেওয়া ভালো
                type={name === "dailyRentPrice" || name === "seatCapacity" ? "number" : "text"}
                placeholder={placeholder} 
                className="rounded border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500" 
              />
            </label>
          ))}
          
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Car Type
            <select required name="type" className="rounded border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500 bg-white">
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
          </label>
          
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Availability Status
            <select required name="availability" className="rounded border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500 bg-white">
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>
          
          <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
            Description
            <textarea required name="description" rows={5} placeholder="Describe features, condition, rental notes, and comfort details." className="rounded border border-slate-300 px-4 py-3 font-normal outline-none focus:border-cyan-500" />
          </label>
          
          <Button 
            type="submit" 
            isLoading={loading}
            disabled={loading}
            className={`md:col-span-2 font-semibold text-white transition-all duration-300 py-6 text-base rounded-lg
              ${loading 
                ? "bg-slate-400 cursor-not-allowed shadow-none" 
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-md shadow-cyan-500/20 active:scale-[0.98]"
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