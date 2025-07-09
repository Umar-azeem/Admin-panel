// components/ActionButtons.tsx
"use client";
import React from "react";

interface ActionButtonsProps {
  onSave?: () => void;
  onChange?: () => void;
  onDelete?: () => void;
  isSaved?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSave,
  onChange,
  onDelete,
  isSaved = false,
}) => {
  return (
    <>
      {isSaved ? (
        <p className="text-green-600 mt-2 font-medium">Saved ✅</p>
      ) : (
        <div className="flex row gap-2 lg:inline-flex lg:w-auto mt-2">
          {onSave && (
            <button
              onClick={onSave}
              className="flex items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white text-xs font-medium text-green-600 shadow-theme-xs hover:bg-gray-50 hover:text-green-700 dark:border-gray-700 dark:bg-gray-800 dark:text-green-500 dark:hover:bg-white/[0.03]"
            >
              Save
            </button>
          )}
          {onChange && (
            <button
              onClick={onChange}
              className="flex items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white text-xs font-medium text-[#FF9900] shadow-theme-xs hover:bg-gray-50 hover:text-[#d67d00] dark:border-gray-700 dark:bg-gray-800 dark:text-[#FF9900] dark:hover:bg-white/[0.03]"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white text-xs font-medium text-red-500 shadow-theme-xs hover:bg-gray-50 hover:text-red-700 dark:border-gray-700 dark:bg-gray-800 dark:text-red-600 dark:hover:bg-white/[0.03]"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ActionButtons;
