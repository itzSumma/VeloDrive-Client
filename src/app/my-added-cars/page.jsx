"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import EditCarModal from "@/componants/EditCarModal";
import DeleteConfirmModal from "@/componants/DeleteConfirmModal";
import AuthGuard from "@/componants/AuthGuard";
import LoadingScreen from "@/componants/LoadingScreen";
import { apiBaseUrl } from "@/lib/config";

const MyAddedCars = () => {
  const { data: session, isPending } = authClient.useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      const loadCars = async () => {
        try {
          setLoading(true);
          const res = await fetch(
            `${apiBaseUrl}/my-added-cars?email=${session.user.email}`
          );
          const data = await res.json();
          setCars(data);
        } catch {
          toast.error("Failed to load your added cars.");
        } finally {
          setLoading(false);
        }
      };

      loadCars();
    }
  }, [session]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      image: form.image.value,
      type: form.type.value,
      pickupLocation: form.pickupLocation.value,
      dailyRentPrice: Number(form.dailyRentPrice.value),
      availability: form.availability.value,
      description: form.description.value,
    };

    const loadingToast = toast.loading("Updating...");
    try {
      const res = await fetch(`${apiBaseUrl}/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success("Updated successfully!");
        setIsEditOpen(false);
        setCars(cars.map((c) => (c._id === id ? { ...c, ...updatedData } : c)));
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
      const res = await fetch(`${apiBaseUrl}/cars/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully!");
        setCars(cars.filter((c) => c._id !== id));
        setIsDeleteOpen(false);
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to delete!");
    }
  };

  if (isPending || (session?.user?.email && loading)) {
    return <LoadingScreen message="Loading your added cars..." />;
  }

  return (
    <AuthGuard message="Checking your garage access...">
      <div className="min-h-screen bg-slate-950 p-6 text-white md:p-12">
        <h1 className="mb-8 text-3xl font-bold">My Added Cars</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <div
              key={car._id}
              className="rounded-xl border border-white/10 bg-slate-900 p-5"
            >
              <img
                src={car.image}
                alt={car.name}
                className="mb-4 h-40 w-full rounded-lg object-cover"
              />
              <h2 className="text-xl font-bold">{car.name}</h2>
              <p className="mt-1 text-sm text-slate-400">{car.pickupLocation}</p>
              <p className="mt-2 font-semibold text-cyan-400">
                ${car.dailyRentPrice}/day
              </p>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="flat"
                  className="flex-1 border border-blue-500/20 bg-blue-600/10 font-semibold text-blue-500 hover:bg-blue-600/20"
                  onClick={() => {
                    setSelectedCar(car);
                    setIsEditOpen(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="flat"
                  className="flex-1 border border-red-500/20 bg-red-600/10 font-semibold text-red-500 hover:bg-red-600/20"
                  onClick={() => {
                    setCarToDelete(car);
                    setIsDeleteOpen(true);
                  }}
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
    </AuthGuard>
  );
};

export default MyAddedCars;
