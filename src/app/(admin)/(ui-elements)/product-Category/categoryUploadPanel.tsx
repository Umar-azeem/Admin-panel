"use client";
import React, { useState, useEffect } from "react";
interface CategoryUploadPanelProps {
  title: string;
  genderOptions: string[];
  categoriesMap: Record<string, Record<string, string[]>>; // gender -> categories
}
export default function CategoryUploadPanel({ title, genderOptions, categoriesMap }: CategoryUploadPanelProps) {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (genderOptions.length > 0) {
      setSelectedGender(genderOptions[0]);
    }
  }, [genderOptions]);

  const categories = categoriesMap[selectedGender] || {};

  const handleChange = (main: string, sub: string, field: string, value: string | File | null) => {
    setData((prev: any) => ({
      ...prev,
      [selectedGender]: {
        ...(prev[selectedGender] || {}),
        [main]: {
          ...(prev[selectedGender]?.[main] || {}),
          [sub]: {
            ...(prev[selectedGender]?.[main]?.[sub] || {}),
            [field]: value,
          },
        },
      },
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    Object.entries(data[selectedGender] || {}).forEach(([main, subcats]: any) => {
      Object.entries(subcats).forEach(([sub, details]: any) => {
        formData.append(`${selectedGender}[${main}][${sub}][name]`, details.name || "");
        formData.append(`${selectedGender}[${main}][${sub}][price]`, details.price || "");
        if (details.image) {
          formData.append(`${selectedGender}[${main}][${sub}][image]`, details.image);
        }
      });
    });

    console.log("Sending:", formData);
    // You can send it using axios or fetch
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Category</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(categories).map(([mainCat, subCats]) => (
        <div key={mainCat} className="border p-4 rounded-md shadow bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">{mainCat}</h2>

          {subCats.map((sub) => (
            <div key={sub} className="mb-6 bg-white p-4 border rounded">
              <h3 className="font-medium mb-2">{sub}</h3>
              <input
                type="text"
                placeholder="Name"
                className="w-full mb-2 p-2 border rounded"
                onChange={(e) => handleChange(mainCat, sub, "name", e.target.value)}
              />
              <input
                type="text"
                placeholder="Price"
                className="w-full mb-2 p-2 border rounded"
                onChange={(e) => handleChange(mainCat, sub, "price", e.target.value)}
              />
              <input
                type="file"
                className="w-full mb-2 p-2 border rounded"
                onChange={(e) => handleChange(mainCat, sub, "image", e.target.files?.[0] || null)}
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit All
      </button>
    </div>
  );
}
