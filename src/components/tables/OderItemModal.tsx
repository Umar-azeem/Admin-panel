// components/ui/modal/Modal.tsx
"use client";
import React from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const OrderItemModal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-2xl p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-lg"
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h2>

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default OrderItemModal;
