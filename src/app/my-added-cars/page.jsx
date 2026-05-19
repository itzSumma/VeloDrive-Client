"use client";
import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const MyAddedCars = () => {
  const { data: session } = authClient.useSession();
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:5000/my-added-cars?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setCars(data));
    }
  }, [session]);

  const openEditPopup = (car) => {
    setSelectedCar(car);
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white">
      <h1 className="text-3xl font-bold mb-8">My Added Cars</h1>

      {/* কার্ড লিস্ট */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-slate-900 border border-white/10 p-5 rounded-xl hover:border-cyan-500/50 transition-all">
            <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold">{car.name}</h2>
            <p className="text-slate-400 text-sm mt-1">Location: {car.pickupLocation}</p>
            <p className="text-slate-400 text-sm">Type: {car.type}</p>
            <p className="text-slate-400 text-sm">Seats: {car.seatCapacity}</p>
            <p className="text-cyan-400 font-semibold mt-2">${car.dailyRentPrice}/day</p>
            <p className="text-sm mt-1">Status: 
                <span className={car.availability === 'available' ? 'text-green-400 ml-1' : 'text-red-400 ml-1'}>
                    {car.availability.toUpperCase()}
                </span>
            </p>
            
            <Button color="primary" variant="flat" className="mt-4 w-full" onClick={() => openEditPopup(car)}>
              Edit Car
            </Button>
          </div>
        ))}
      </div>

      {/* এডিট পপআপ */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Edit: {selectedCar?.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400">Price ($/day)</label>
                <input defaultValue={selectedCar?.dailyRentPrice} type="number" className="w-full p-2 bg-slate-800 rounded border border-slate-600 outline-none mt-1" />
              </div>
              <div>
                <label className="text-xs text-slate-400">Availability</label>
                <select defaultValue={selectedCar?.availability} className="w-full p-2 bg-slate-800 rounded border border-slate-600 outline-none mt-1">
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400">Description</label>
                <textarea defaultValue={selectedCar?.description} className="w-full p-2 bg-slate-800 rounded border border-slate-600 outline-none mt-1" rows={3} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button color="danger" variant="flat" className="flex-1" onClick={() => setIsPopupOpen(false)}>Cancel</Button>
              <Button color="primary" className="flex-1" onClick={() => setIsPopupOpen(false)}>Update</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedCars;