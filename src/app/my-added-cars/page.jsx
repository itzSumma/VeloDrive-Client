"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast, { Toaster } from 'react-hot-toast';
import EditCarModal from '@/componants/EditCarModal';
import DeleteConfirmModal from '@/componants/DeleteConfirmModal';



const MyAddedCars = () => {
  const { data: session } = authClient.useSession();
  const [cars, setCars] = useState([]);
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`http://localhost:5000/my-added-cars?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => setCars(data));
    }
  }, [session]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      dailyRentPrice: form.dailyRentPrice.value,
      availability: form.availability.value,
      description: form.description.value,
    };

    const loadingToast = toast.loading("Updating...");
    try {
      const res = await fetch(`http://localhost:5000/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success("Updated successfully!");
        setIsEditOpen(false);
        setCars(cars.map(c => c._id === id ? { ...c, ...updatedData } : c));
      } else {
        throw new Error();
      }
    } catch { 
        toast.dismiss(loadingToast);
        toast.error("Failed to update!"); 
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/cars/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully!");
        setCars(cars.filter(c => c._id !== id));
        setIsDeleteOpen(false);
      } else {
        throw new Error();
      }
    } catch { 
        toast.error("Failed to delete!"); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12 text-white">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8">My Added Cars</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-slate-900 border border-white/10 p-5 rounded-xl">
            <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold">{car.name}</h2>
            <p className="text-cyan-400 font-semibold mt-2">${car.dailyRentPrice}/day</p>
            
            <div className="flex gap-2 mt-4">
  {/* Edit Button: সুন্দর নীল আভা */}
  <Button 
    variant="flat" 
    className="flex-1 bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 font-semibold border border-blue-500/20" 
    onClick={() => { setSelectedCar(car); setIsEditOpen(true); }}
  >
    Edit
  </Button>

  {/* Delete Button: উজ্জ্বল লাল আভা */}
  <Button 
    variant="flat" 
    className="flex-1 bg-red-600/10 text-red-500 hover:bg-red-600/20 font-semibold border border-red-500/20" 
    onClick={() => { setCarToDelete(car); setIsDeleteOpen(true); }}
  >
    Delete
  </Button>
</div>
          </div>
        ))}
      </div>

      <EditCarModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        car={selectedCar} 
        onUpdate={handleUpdate} 
      />
      
      <DeleteConfirmModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        car={carToDelete} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default MyAddedCars;