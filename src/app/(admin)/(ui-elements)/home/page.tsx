// components/AdminUploadPanel.tsx
"use client";
import React, { useState } from "react";

export default function AdminUploadPanel() {
  const [sliderImages, setSliderImages] = useState<File[]>([]);
  const [categoryData, setCategoryData] = useState([
    { type: "Men", name: "", price: "", image: null },
    { type: "Women", name: "", price: "", image: null },
    { type: "Kids", name: "", price: "", image: null },
  ]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSliderImages(Array.from(e.target.files));
    }
  };

  const handleCategoryChange = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updated = [...categoryData];
    updated[index] = { ...updated[index], [field]: value };
    setCategoryData(updated);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    // Slider images
    sliderImages.forEach((img, i) => {
      formData.append("sliderImages", img);
    });

    // Category data
    categoryData.forEach((item, i) => {
      formData.append(`category[${i}][type]`, item.type);
      formData.append(`category[${i}][name]`, item.name);
      formData.append(`category[${i}][price]`, item.price);
      if (item.image) formData.append(`category[${i}][image]`, item.image);
    });

    // You can send formData via axios or fetch
    console.log("Data ready to send:", formData);
  };

  return (
    <div className="p-6 space-y-10">
      {/* Slider Image Upload */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Slider Images</h2>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="slider-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021 4 4 0 0 0 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (multiple allowed)</p>
            </div>
            <input
              id="slider-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleSliderChange}
            />
          </label>
        </div>
      </div>

      {/* Category Upload */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Add Categories (Men, Women, Kids)</h2>
        {categoryData.map((cat, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg bg-white shadow">
            <h3 className="font-medium mb-2">{cat.type}</h3>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 p-2 border rounded"
              value={cat.name}
              onChange={(e) => handleCategoryChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Price"
              className="w-full mb-2 p-2 border rounded"
              value={cat.price}
              onChange={(e) => handleCategoryChange(index, "price", e.target.value)}
            />
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) =>
                handleCategoryChange(index, "image", e.target.files?.[0] || null)
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit All
      </button>
    </div>
  );
}
