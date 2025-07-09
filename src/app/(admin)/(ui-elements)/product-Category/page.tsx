"use client";

import CategoryUploadPanel from "./categoryUploadPanel";

const sharedCategories = {
  Tops: ["Tees", "Polos", "Shirts", "Sets", "Outerwear", "Ethnic Wear"],
  "Bottoms & Sleepwear": ["Jeans", "Trousers & Pants", "Shorts", "Thermals", "Sleepwear"],
  Activewear: ["Tops", "Bottoms", "Sets"],
  Footwear: ["Shoes", "Socks"],
  Accessories: [
    "Underwear", "Caps & Hats", "Bags, Belts & Wallets",
    "Eyewear", "Gloves & Scarves", "Health & Grooming", "Fragrances"
  ]
};

const kidsCategories = {
  Clothing: ["T-Shirts", "Shorts", "Dresses", "Sleepwear"],
  Footwear: ["School Shoes", "Sandals", "Boots"],
  Toys: ["Soft Toys", "Learning Toys"]
};

const genderOptions = ["men", "women", "kids"];

const categoriesMap = {
  men: sharedCategories,
  women: sharedCategories,
  kids: kidsCategories,
};

export default function AdminPage() {
  return (
    <div className="space-y-16 p-8">
      <CategoryUploadPanel
        title="Product Upload Panel"
        genderOptions={genderOptions}
        categoriesMap={categoriesMap}
      />
    </div>
  );
}
