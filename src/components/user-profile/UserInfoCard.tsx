"use client";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
const defaultData = {
  whatsNew: { title: "📢 What's New", value: "Latest product launches & updates" },
  storeLocator: { title: "📍 Store Locator", value: "Find our stores globally" },
  ambassador: { title: "🤝 Become a Brand Ambassador", value: "Apply to represent us" },
  mission: { title: "💡 Why we do what we do", value: "Driven by sustainability and impact" },
  reviews: { title: "🗣 Customer Reviews", value: "Hear from our happy customers" },
  news: { title: "📰 Company News", value: "Announcements and events" },
  clothes: { title: "👕 Who Made Your Clothes?", value: "Meet our artisans" },
  address: {
    company: "elo",
    street: "11 KM Satiana Road",
    city: "Faisalabad",
    country: "Pakistan",
    phone: "042-3256-0356",
    hours: "09:00 AM to 6:00 PM (Mon - Sat)",
  },
};

export default function CompanyInfoPanel() {
  const { isOpen, openModal, closeModal } = useModal();
  const [companyInfo, setCompanyInfo] = useState(defaultData);

  const handleChange = (field: string, sub: string, value: string) => {
    setCompanyInfo((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [sub]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Company info saved:", companyInfo);
    closeModal();
  };

  const handleDelete = () => {
    console.log("Company info deleted");
    closeModal();
  };

  return (
    <>
    <div className="p-6 border border-gray-200 rounded-2xl dark:border-gray-800 overflow-hidden">
<h2 className=" text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Footer Menu Manager
          </h2>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
            Company Info
          </h4>

          <div className="grid grid-cols-1 gap-3 text-sm text-gray-800 dark:text-white/90">
            {Object.entries(companyInfo).map(([key, section]) =>
              typeof section === "object" && "title" in section ? (
                <div key={key}>
                  <h5 className="font-medium">{section.title}</h5>
                </div>
              ) : null
            )}

            <div className="mt-4">
              <h5 className="font-semibold">🏢 Mailing Address</h5>
              <p>{companyInfo.address.company}</p>
              <p>{companyInfo.address.street}</p>
              <p>
                {companyInfo.address.city}, {companyInfo.address.country}
              </p>
              <p>📞 {companyInfo.address.phone}</p>
              <p>🕘 {companyInfo.address.hours}</p>
            </div>
          </div>
        </div>

       <div className="flex row gap-2 lg:inline-flex lg:w-auto">
          <button
onClick={openModal}            
className="flex w-full items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white  text-xs font-medium text-[#FF9900] shadow-theme-xs hover:bg-gray-50 hover:text-[#d67d00] dark:border-gray-700 dark:bg-gray-800 dark:text-[#FF9900] dark:hover:bg-white/[0.03] lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              />
            </svg>
            Edit 
          </button>
          <button
 onClick={handleDelete}            className="flex w-full items-center px-4 py-3 justify-center gap-2 rounded-full border border-gray-300 bg-white  text-xs font-medium text-red-500 shadow-theme-xs hover:bg-gray-50 hover:text-red-700 dark:border-gray-700 dark:bg-gray-800 dark:text-red-600 dark:hover:bg-white/[0.03] lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              />
            </svg>
            Delete 
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full h-[550px] overflow-y-scroll rounded-xl bg-white dark:bg-gray-900 p-6 lg:p-10">
          <h4 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
            Edit Company Info
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Update section headings and descriptions.
          </p>

          <form className="flex flex-col space-y-6">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {Object.entries(companyInfo).map(([key, section]) =>
                typeof section === "object" && "title" in section ? (
                  <div key={key}>
                    <Label>Section Heading</Label>
                    <Input
                      type="text"
                      defaultValue={section.title}
                      onChange={(e) =>
                        setCompanyInfo((prev: any) => ({
                          ...prev,
                          [key]: {
                            ...prev[key],
                            title: e.target.value,
                          },
                        }))
                      }
                    />

                    <Label className="mt-2">Description</Label>
                    <textarea
                      defaultValue={section.value}
                      onChange={(e) =>
                        setCompanyInfo((prev: any) => ({
                          ...prev,
                          [key]: {
                            ...prev[key],
                            value: e.target.value,
                          },
                        }))
                      }
                      className="w-full mt-1 p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm"
                    />
                  </div>
                ) : null
              )}
            </div>

            <div>
              <h5 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                Mailing Address
              </h5>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {Object.entries(companyInfo.address).map(([field, value]) => (
                  <div key={field}>
                    <Label className="capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Input
                      type="text"
                      defaultValue={value}
                      onChange={(e) =>
                        setCompanyInfo((prev: any) => ({
                          ...prev,
                          address: { ...prev.address, [field]: e.target.value },
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
   
    </>
  );
}
