"use client";

import ReelItem from "./reel-item";

const videos = [
  {
    id: 1,
    video: "/videos/sample1.mp4",
    artist: "Dorcci",
    title: "Live Session"
  },
  {
    id: 2,
    video: "/videos/sample2.mp4",
    artist: "021Kid",
    title: "Studio Moment"
  },
  {
    id: 3,
    video: "/videos/sample3.mp4",
    artist: "Sepehr Khalse",
    title: "Behind The Beat"
  }
];

const ExploreFeed = () => {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {videos.map((v) => (
        <ReelItem key={v.id} video={v.video} artist={v.artist} title={v.title} />
      ))}
    </div>
  );
};

export default ExploreFeed;
