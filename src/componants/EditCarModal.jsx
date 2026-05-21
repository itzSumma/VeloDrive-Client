import React from "react";
import { Button } from "@heroui/react";

const EditCarModal = ({ isOpen, onClose, car, onUpdate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <form
        onSubmit={(e) => onUpdate(e, car._id)}
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
      >
        <h2 className="mb-4 text-xl font-bold text-white">Edit: {car?.name}</h2>

        <div className="space-y-4">
          <label className="block text-xs text-slate-400">
            Image URL
            <input
              name="image"
              defaultValue={car?.image}
              type="url"
              className="mt-1 w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none"
              required
            />
          </label>

          <label className="block text-xs text-slate-400">
            Car Type
            <select
              name="type"
              defaultValue={car?.type}
              className="mt-1 w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none"
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Luxury">Luxury</option>
            </select>
          </label>

          <label className="block text-xs text-slate-400">
            Pickup Location
            <input
              name="pickupLocation"
              defaultValue={car?.pickupLocation}
              type="text"
              className="mt-1 w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none"
              required
            />
          </label>

          <label className="block text-xs text-slate-400">
            Price ($/day)
            <input
              name="dailyRentPrice"
              defaultValue={car?.dailyRentPrice}
              type="number"
              className="mt-1 w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none"
              required
            />
          </label>

          <label className="block text-xs text-slate-400">
            Availability
            <select
              name="availability"
              defaultValue={car?.availability}
              className="mt-1 w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </label>

          <label className="block text-xs text-slate-400">
            Description
            <textarea
              name="description"
              defaultValue={car?.description}
              className="mt-1 w-full rounded border border-slate-600 bg-slate-800 p-2 text-white outline-none"
              rows={3}
              required
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <Button color="danger" variant="flat" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit" className="flex-1">
            Update Car
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCarModal;
