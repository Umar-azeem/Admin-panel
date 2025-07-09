"use client";
import React, { useState } from "react";
const categories = ["Men", "Women", "Kids"];
const colors = ["Red", "Black", "White", "Green", "Blue", "Gray"];
const sizes = ["S", "M", "L", "XL", "XXL"];

export default function AdminUploadPanel() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "Men",
    selectedColors: [] as string[],
    selectedSizes: [] as string[],
    image: null as File | null,
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const handleCheckboxChange = (
    type: "selectedColors" | "selectedSizes",
    value: string
  ) => {
    setForm((prev) => {
      const alreadySelected = prev[type].includes(value);
      return {
        ...prev,
        [type]: alreadySelected
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, image: file || null }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("colors", JSON.stringify(form.selectedColors));
    formData.append("sizes", JSON.stringify(form.selectedSizes));
    if (form.image) formData.append("image", form.image);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        alert("✅ Product uploaded!");
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-6 border">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Upload Product
        </h2>

        {/* Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Product Title
          </label>
          <input
            type="text"
            placeholder="e.g. Premium Red Tee"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Price (PKR)
          </label>
          <input
            type="number"
            placeholder="e.g. 699"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>

        {/* Category - Custom Dropdown */}
        <div className="relative">
          <label className="block font-semibold text-gray-700 mb-1">
            Category
          </label>
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-between items-center"
          >
            {form.category}
            <svg
              className="w-2.5 h-2.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <ul className="py-2 text-sm text-gray-700">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ ...form, category: cat });
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Colors */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Select Colors
          </label>
          <div className="flex flex-wrap gap-3 mt-2">
            {colors.map((color) => (
              <label
                key={color}
                className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  checked={form.selectedColors.includes(color)}
                  onChange={() => handleCheckboxChange("selectedColors", color)}
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Select Sizes
          </label>
          <div className="flex flex-wrap gap-3 mt-2">
            {sizes.map((size) => (
              <label
                key={size}
                className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-lg shadow-sm hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  checked={form.selectedSizes.includes(size)}
                  onChange={() => handleCheckboxChange("selectedSizes", size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            onChange={handleImageUpload}
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Upload Product
          </button>
        </div>
      </div>
    </div>
  );
}
