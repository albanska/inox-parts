"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

function VideoPlayer({ isMuted }: any) {
  const [isOnView, setIsOnView] = useState(false)
  const vidRef = useRef<any>(null)

  function stopVideo() {
    if(isOnView && vidRef.current) {
      vidRef.current.pause()
      setIsOnView(false)
    }
  }

  function playVideo() {
    if(!vidRef) return
    vidRef.current.play()
    setIsOnView(true)
  }


  return (
    <motion.div
      viewport={{ amount: 0.5 }}
      onViewportEnter={playVideo}
      onViewportLeave={stopVideo}
      className="relative w-full h-svh"
    >
      <div className="video-container">
        <video
          ref={vidRef} 
          width="100%"
          height="auto"
          muted={isMuted}
          autoPlay
          loop
          poster="/vid/placeholder.jpg"
          playsInline
          style={{
            objectFit: "cover", // This makes the video cover the container
            width: "100%",
            height: "100dvh", // Set your desired height
          }}
        >
          <source src="/vid/INOX.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
}

export default VideoPlayer;
