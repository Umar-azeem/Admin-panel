"use client";

import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { useUserMetaStore } from "../header/useUserMetaStore";

const socialPlatforms = [
  { name: "Facebook", icon: <FaFacebookF /> },
  { name: "Instagram", icon: <FaInstagram /> },
  { name: "YouTube", icon: <FaYoutube /> },
  { name: "TikTok", icon: <FaTiktok /> },
  { name: "X", icon: <FaXTwitter /> },
  { name: "Pinterest", icon: <FaPinterestP /> },
];

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    profileImage,
    setProfileImage,
    title,
    setTitle,
    paragraph,
    setParagraph,
    socialLinks,
    setSocialLinks,
  } = useUserMetaStore();

  const [newSocial, setNewSocial] = useState({ platform: "", link: "" });

  const handleSave = () => {
    console.log("✅ Saved Data:", {
      profileImage,
      title,
      paragraph,
      socialLinks,
    });
    closeModal();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfileImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageDelete = () => {
    setProfileImage("");
  };

  const handleAddSocial = () => {
    if (newSocial.platform && newSocial.link) {
      const exists = socialLinks.find(
        (s) => s.platform.toLowerCase() === newSocial.platform.toLowerCase()
      );
      if (!exists) {
        setSocialLinks([...socialLinks, newSocial]);
        setNewSocial({ platform: "", link: "" });
      } else {
        alert("This social platform is already added.");
      }
    }
  };

  const handleDeleteSocial = (platform: string) => {
    setSocialLinks(socialLinks.filter((s) => s.platform !== platform));
  };

  const handleChangeLink = (platform: string, newLink: string) => {
    setSocialLinks(
      socialLinks.map((s) =>
        s.platform === platform ? { ...s, link: newLink } : s
      )
    );
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            {profileImage ? (
              <Image width={80} height={80} src={profileImage} alt="user" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {title || "Admin Title"}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center xl:text-left">
              {paragraph || "Visible frontend paragraph"}
            </p>
          </div>

          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
            <div className="flex row gap-2 lg:inline-flex lg:w-auto">
              <button
                onClick={openModal}
                className="flex w-full items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white text-xs font-medium text-[#FF9900] shadow-theme-xs hover:bg-gray-50 hover:text-[#d67d00] dark:border-gray-700 dark:bg-gray-800 dark:text-[#FF9900] dark:hover:bg-white/[0.03] lg:inline-flex lg:w-auto"
              >
                Edit
              </button>
              <button
                onClick={handleImageDelete}
                className="flex w-full items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white text-xs font-medium text-red-500 shadow-theme-xs hover:bg-gray-50 hover:text-red-700 dark:border-gray-700 dark:bg-gray-800 dark:text-red-600 dark:hover:bg-white/[0.03] lg:inline-flex lg:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your heading, paragraph, profile image, and social media.
            </p>
          </div>

          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3 space-y-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2">
                  <Label>Title (only visible in admin)</Label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Paragraph (visible on frontend)</Label>
                  <Input
                    type="text"
                    value={paragraph}
                    onChange={(e) => setParagraph(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Profile Picture</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="col-span-2 mt-6">
                <Label>Social Media Links</Label>

                {/* Add New Social Link */}
                <div className="flex flex-col md:flex-row gap-3">
                  <select
  value={newSocial.platform}
  onChange={(e) =>
    setNewSocial({ ...newSocial, platform: e.target.value })
  }
  className="w-full md:w-48 px-2 py-1  text-sm rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent"
>
  <option value="">Select Platform</option>
  {socialPlatforms.map((item) => (
    <option key={item.name} value={item.name}>
      {item.name}
    </option>
  ))}
</select>

                  <Input
                    type="url"
                    placeholder="https://your-link.com"
                    value={newSocial.link}
                    onChange={(e) =>
                      setNewSocial({ ...newSocial, link: e.target.value })
                    }
                  />
                  <Button type="button" onClick={handleAddSocial}>
                    Add
                  </Button>
                </div>

                {/* Existing Links */}
                <ul className="mt-4 space-y-3">
                  {socialLinks.map((item) => (
                    <li key={item.platform} className="flex items-center gap-3">
                      <span className="w-24 font-semibold text-sm text-gray-700 dark:text-white">
                        {item.platform}
                      </span>
                      <Input
                        type="url"
                        value={item.link}
                        onChange={(e) =>
                          handleChangeLink(item.platform, e.target.value)
                        }
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleDeleteSocial(item.platform)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
