import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import VideoUploadPanel from "./YouTubeEmbed";
import VideoUploader from "./YouTubeEmbed";

export default function VideosExample() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
        <div className="space-y-5 sm:space-y-6">
          <ComponentCard title="Video Ratio 16:9">
      <VideoUploader title="Video Ratio 16:9" aspectRatio="16:9" />

          </ComponentCard>
          <ComponentCard title="Video Ratio 4:3">
      <VideoUploader title="Video Ratio 4:3" aspectRatio="4:3" />

          </ComponentCard>
        </div>
        <div className="space-y-5 sm:space-y-6">
          <ComponentCard title="Video Ratio 21:9">
      <VideoUploader title="Video Ratio 21:9" aspectRatio="21:9" />

          </ComponentCard>
          <ComponentCard title="Video Ratio 9:16">
      <VideoUploader title="Video Ratio 9:16" aspectRatio="9:16" />

          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
