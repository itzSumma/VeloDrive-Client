"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";

const MyAddedCars = () => {
  const { data: session } = authClient.useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:5000/my-added-cars?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          setCars(data);
          setLoading(false);
        });
    }
  }, [session?.user?.email]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white">
      <h1 className="text-3xl font-bold mb-8">My Added Cars</h1>
      
      {loading ? (
        <p className="text-slate-400 animate-pulse">Loading your fleet...</p>
      ) : cars.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-700 rounded-xl">
          <p className="text-slate-400">You haven't added any cars yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="bg-slate-900 border border-white/10 p-5 rounded-xl hover:border-cyan-500/50 transition-all">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold">{car.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{car.type} • {car.seatCapacity} Seats</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-cyan-400 font-semibold">${car.dailyRentPrice}/day</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${car.availability === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {car.availability.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedCars;