"use client";
import React, { useState } from "react";
interface PageData {
  id: number;
  name: string;
  description: string;
}

export default function PageContentManager() {
  const [pages, setPages] = useState<PageData[]>([
    { id: 1, name: "About Us", description: "Learn more about our company" },
    { id: 2, name: "Contact", description: "Reach out to us" },
    { id: 3, name: "Shipping Policy", description: "Info on how we ship items" },
    { id: 4, name: "Returns Policy", description: "Details on returning products" },
    { id: 5, name: "Privacy Policy", description: "Our data usage policy" },
    { id: 6, name: "Terms & Conditions", description: "Legal terms and conditions" },
    { id: 7, name: "FAQ", description: "Common questions answered" },
  ]);

  const [newPage, setNewPage] = useState<PageData>({
    id: 0,
    name: "",
    description: "",
  });

  const handleAddPage = () => {
    if (newPage.name && newPage.description) {
      setPages([...pages, { ...newPage, id: Date.now() }]);
      setNewPage({ id: 0, name: "", description: "" });
    }
  };

  const handleDelete = (id: number) => {
    setPages(pages.filter((p) => p.id !== id));
  };

  const handleChange = (
    id: number,
    key: keyof PageData,
    value: string
  ) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p))
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Page Content Managr</h2>

      {/* Existing Pages */}
      <ul className="space-y-3">
        {pages.map((page) => (
          <li
            key={page.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-gray-200 p-4 rounded-lg"
          >
            <input
              type="text"
              value={page.name}
              onChange={(e) =>
                handleChange(page.id, "name", e.target.value)
              }
              className="border border-gray-300 p-2 rounded-md w-full md:w-[30%] text-sm"
              placeholder="Page Name"
            />
            <input
              type="text"
              value={page.description}
              onChange={(e) =>
                handleChange(page.id, "description", e.target.value)
              }
              className="border border-gray-300 p-2 rounded-md w-full md:w-[50%] text-sm"
              placeholder="Description"
            />
            <button
              onClick={() => handleDelete(page.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Page */}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2">Add New Page</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <input
            type="text"
            placeholder="Page Name"
            className="border border-gray-300 p-2 rounded-md w-full md:w-[30%]"
            value={newPage.name}
            onChange={(e) =>
              setNewPage({ ...newPage, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="border border-gray-300 p-2 rounded-md w-full md:w-[50%]"
            value={newPage.description}
            onChange={(e) =>
              setNewPage({ ...newPage, description: e.target.value })
            }
          />
          <button
            onClick={handleAddPage}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md hover:bg-[#e28700]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
