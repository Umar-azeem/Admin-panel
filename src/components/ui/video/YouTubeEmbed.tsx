"use client";
import React, { useState } from "react";
import ActionButtons from "@/components/videos/ActionButtons"; // Update the path as needed

type AspectRatio = "16:9" | "21:9" | "4:3" | "9:16";

interface Props {
  title: string;
  aspectRatio: AspectRatio;
}

const getAspectClass = (ratio: AspectRatio | "9:16") => {
  switch (ratio) {
    case "16:9":
      return "aspect-video";
    case "21:9":
      return "aspect-[21/9]";
    case "4:3":
      return "aspect-[4/3]";
    case "9:16":
      return "aspect-[9/16]";
    default:
      return "aspect-video";
  }
};

const VideoUploader: React.FC<Props> = ({ title, aspectRatio }) => {
  const [videos, setVideos] = useState<(File | null)[]>([null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);
  const [saved, setSaved] = useState<boolean[]>([false, false, false]);

  const handleUpload = (file: File, index: number) => {
    const newVideos = [...videos];
    const newPreviews = [...previews];
    const newSaved = [...saved];

    newVideos[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    newSaved[index] = false;

    setVideos(newVideos);
    setPreviews(newPreviews);
    setSaved(newSaved);
  };

  const handleDelete = (index: number) => {
    const newVideos = [...videos];
    const newPreviews = [...previews];
    const newSaved = [...saved];

    newVideos[index] = null;
    newPreviews[index] = null;
    newSaved[index] = false;

    setVideos(newVideos);
    setPreviews(newPreviews);
    setSaved(newSaved);
  };

  const handleSave = (index: number) => {
    const newSaved = [...saved];
    newSaved[index] = true;
    setSaved(newSaved);
  };

  const triggerInput = (index: number) => {
    const input = document.getElementById(`${title}-input-${index}`) as HTMLInputElement;
    input?.click();
  };

  const aspectClass = getAspectClass(aspectRatio);

  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-4 w-full max-w-md">
      <h3 className="text-xl font-semibold">{title}</h3>

      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <input
            type="file"
            accept="video/*"
            id={`${title}-input-${index}`}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file, index);
            }}
          />

          {previews[index] ? (
            <div className={`w-full ${aspectClass} relative`}>
              <video
                src={previews[index] as string}
                controls
                className="w-full h-full rounded-lg object-cover"
              />
              <ActionButtons
                onSave={() => handleSave(index)}
                onChange={() => triggerInput(index)}
                onDelete={() => handleDelete(index)}
                isSaved={saved[index]}
              />
            </div>
          ) : (
            <button
              onClick={() => triggerInput(index)}
              className="bg-gray-200 px-4 py-2 rounded text-gray-700 w-full"
            >
              Upload Video {index + 1}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoUploader;
