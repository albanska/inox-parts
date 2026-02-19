"use client";

import Image from "next/image";

function VideoPlayer() {
  return (
    <div className="relative w-full h-svh">
      <Image
        src="/vid/inoxpart-bg.jpeg"
        alt="INOX Parts"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export default VideoPlayer;
