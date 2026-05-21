import React from 'react';
import { Button } from "@heroui/react";

const DeleteConfirmModal = ({ isOpen, onClose, car, onDelete }) => {
   
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-sm border border-slate-700 shadow-2xl text-center">
                <h2 className="text-xl font-bold mb-2 text-white">Are you sure?</h2>
                <p className="text-slate-400 mb-6">
                    Delete <span className='text-white font-semibold'>{car?.name}</span>? 
                    This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                    <Button 
                        color="default" 
                        variant="flat" 
                        className="flex-1" 
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="danger" 
                        className="flex-1" 
                        onClick={() => onDelete(car._id)}
                    >
                        Delete Car
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;