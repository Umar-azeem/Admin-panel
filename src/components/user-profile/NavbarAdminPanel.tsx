"use client";
import React, { useState } from "react";
interface MenuItem {
  id: number;
  label: string;
  link: string;
  isDropdown?: boolean;
  status?: "HOT" | "NEW" | "";
}
export default function NavbarAdminPanel() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: 1, label: "New Arrivals", link: "/new", isDropdown: true, status: "HOT" },
    { id: 2, label: "Men", link: "/men", isDropdown: true },
    { id: 3, label: "Women", link: "/women", isDropdown: true },
    { id: 4, label: "Kids", link: "/kids", isDropdown: true },
    { id: 5, label: "Home", link: "/home", isDropdown: true },
    { id: 6, label: "Wear Your Voice", link: "/voice", isDropdown: true },
    { id: 7, label: "Big & Tall", link: "/big", isDropdown: false },
    { id: 8, label: "Minor Fault", link: "/fault", isDropdown: false },
    { id: 9, label: "Clearance", link: "/clearance", isDropdown: false },
  ]);
  const [newItem, setNewItem] = useState<MenuItem>({
    id: 0,
    label: "",
    link: "",
    isDropdown: false,
    status: "",
  });

  const handleAddItem = () => {
    if (newItem.label && newItem.link) {
      setMenuItems([...menuItems, { ...newItem, id: Date.now() }]);
      setNewItem({ id: 0, label: "", link: "", isDropdown: false, status: "" });
    }
  };

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleChange = (id: number, key: keyof MenuItem, value: any) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className=" text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Navbar Menu Manager
          </h2>
      {/* Current Navbar Items */}
      <ul className="space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border text-gray-800 dark:text-white/90 border-gray-400 p-4 rounded-lg"
          >
            <input
              type="text"
              value={item.label}
              onChange={(e) =>
                handleChange(item.id, "label", e.target.value)
              }
              className="border border-gray-300 rounded-md p-2 w-full md:w-[25%] text-sm"
              placeholder="Label"
            />
            <input
              type="text"
              value={item.link}
              onChange={(e) =>
                handleChange(item.id, "link", e.target.value)
              }
              className="border border-gray-300 rounded-md p-2 w-full md:w-[40%] text-sm"
              placeholder="Link"
            />
            <select
              value={item.status || ""}
              onChange={(e) =>
                handleChange(item.id, "status", e.target.value)
              }
              className="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option value="">None</option>
              <option value="HOT">HOT</option>
              <option value="NEW">NEW</option>
            </select>
            <label className="flex items-center text-sm gap-2">
              <input
                type="checkbox"
                checked={item.isDropdown}
                onChange={(e) =>
                  handleChange(item.id, "isDropdown", e.target.checked)
                }
              />
              Dropdown
            </label>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Add New Item */}
      <div className="mt-6 border-t pt-4 text-gray-800 dark:text-white/90 border-gray-400 p-4">
        <h3 className="font-semibold mb-2">Add New Menu Item</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <input
            type="text"
            placeholder="Label"
            className="border border-gray-300 p-2 rounded-md w-full md:w-[25%]"
            value={newItem.label}
            onChange={(e) =>
              setNewItem({ ...newItem, label: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Link"
            className="border border-gray-300 p-2 rounded-md w-full md:w-[40%]"
            value={newItem.link}
            onChange={(e) =>
              setNewItem({ ...newItem, link: e.target.value })
            }
          />
          <select
            value={newItem.status}
            onChange={(e) =>
              setNewItem({ ...newItem, status: e.target.value as "HOT" | "NEW" | "" })
            }
            className="border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="">None</option>
            <option value="HOT">HOT</option>
            <option value="NEW">NEW</option>
          </select>
          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              checked={newItem.isDropdown}
              onChange={(e) =>
                setNewItem({ ...newItem, isDropdown: e.target.checked })
              }
            />
            Dropdown
          </label>
          <button
            onClick={handleAddItem}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-full hover:bg-[#e28700]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
