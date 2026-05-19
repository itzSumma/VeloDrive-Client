import React from 'react';
import { Button } from "@heroui/react";

const EditCarModal = ({ isOpen, onClose, car, onUpdate }) => {
    // যদি মোডাল ওপেন না থাকে, তবে কিছুই রেন্ডার হবে না
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <form 
                onSubmit={(e) => onUpdate(e, car._id)} 
                className="bg-slate-900 p-6 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl"
            >
                <h2 className="text-xl font-bold mb-4 text-white">Edit: {car?.name}</h2>
                
                <div className="space-y-4">
                    <label className="block text-xs text-slate-400">
                        Price ($/day)
                        <input 
                            name="dailyRentPrice" 
                            defaultValue={car?.dailyRentPrice} 
                            type="number" 
                            className="w-full p-2 mt-1 bg-slate-800 rounded border border-slate-600 outline-none text-white" 
                            required 
                        />
                    </label>
                    
                    <label className="block text-xs text-slate-400">
                        Availability
                        <select 
                            name="availability" 
                            defaultValue={car?.availability} 
                            className="w-full p-2 mt-1 bg-slate-800 rounded border border-slate-600 outline-none text-white"
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
                            className="w-full p-2 mt-1 bg-slate-800 rounded border border-slate-600 outline-none text-white" 
                            rows={3} 
                            required 
                        />
                    </label>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button 
                        color="danger" 
                        variant="flat" 
                        className="flex-1" 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="primary" 
                        type="submit" 
                        className="flex-1"
                    >
                        Update Car
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditCarModal;